"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * 「火の粉のフィールド」— 数万個のGPU粒子。
 * 6割は暗闇を漂い、4割は中央にスパイア状に収束しながら上昇する。
 * uScroll(0..1) でバースト（着火）する。
 */

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute vec4 aSeed;
  varying float vHeat;
  varying float vAlpha;

  void main() {
    float s1 = aSeed.x;
    float s2 = aSeed.y;
    float s3 = aSeed.z;
    float s4 = aSeed.w;
    float isSpire = step(0.58, s4);

    // --- 漂う火の粉（暗闇のポテンシャル） ---
    vec3 drift;
    drift.x = (s1 - 0.5) * 15.0 + sin(uTime * (0.10 + s2 * 0.15) + s3 * 6.2831) * 0.7;
    drift.y = (s2 - 0.5) * 9.0 + cos(uTime * (0.08 + s1 * 0.12) + s3 * 6.2831) * 0.55;
    drift.z = (s3 - 0.5) * 6.0;
    float driftHeat = 0.06 + 0.14 * s2;

    // --- スパイア（尖塔）状に収束・上昇する粒子 ---
    float h = fract(s2 + uTime * (0.022 + 0.034 * s3) * (1.0 + uScroll * 2.5));
    float radius = mix(3.4, 0.10, pow(h, 1.45)) * (0.7 + 0.6 * s1);
    float ang = s1 * 6.2831 + uTime * 0.22 + h * 3.6;
    vec3 spire;
    spire.x = cos(ang) * radius;
    spire.z = sin(ang) * radius * 0.62;
    spire.y = h * 7.6 - 3.5;

    vec3 pos = mix(drift, spire, isSpire);
    float heat = mix(driftHeat, h, isSpire);

    // --- スクロールで一斉バースト（着火の瞬間） ---
    vec3 dir = normalize(vec3(s1 - 0.5, s2 - 0.32, s3 - 0.5) + vec3(0.001));
    pos += dir * uScroll * uScroll * (3.5 + 8.0 * s3);
    heat = min(heat + uScroll * 0.6, 1.0);

    // --- マウス回避 ---
    vec2 diff = pos.xy - uMouse;
    float d2 = dot(diff, diff);
    pos.xy += normalize(diff + vec2(0.0001)) * exp(-d2 * 0.5) * 0.9;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float tw = 0.65 + 0.35 * sin(uTime * (1.4 + s3 * 2.2) + s1 * 43.0);
    gl_PointSize = uPixelRatio * mix(16.0, 55.0, pow(heat, 1.5))
      * (0.45 + 0.55 * s2) * tw / max(0.001, -mv.z);

    vHeat = heat;
    vAlpha = (0.22 + 0.78 * heat) * tw * (1.0 - uScroll * 0.82);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  varying float vHeat;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float m = smoothstep(0.5, 0.04, d);
    vec3 col = mix(uC1, uC2, smoothstep(0.0, 0.55, vHeat));
    col = mix(col, uC3, smoothstep(0.55, 1.0, vHeat));
    col *= 1.0 + vHeat * 1.6;
    gl_FragColor = vec4(col, m * vAlpha);
  }
`;

function Embers({
  count,
  progressRef,
  frozen,
}: {
  count: number;
  progressRef?: RefObject<number>;
  frozen: boolean;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, gl } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const time = useRef(frozen ? 24 : 0);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4);
    // 粒子ごとの乱数シード生成。意図的な不純関数の使用
    // eslint-disable-next-line react-hooks/purity
    for (let i = 0; i < count * 4; i++) seeds[i] = Math.random();
    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: frozen ? 24 : 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.75) },
      uC1: { value: new THREE.Color("#FF6B35") },
      uC2: { value: new THREE.Color("#FFB454") },
      uC3: { value: new THREE.Color("#FFE8C2") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!matRef.current) return;
    if (!frozen) time.current += Math.min(delta, 0.05);

    smooth.current.x += (pointer.current.x - smooth.current.x) * 0.06;
    smooth.current.y += (pointer.current.y - smooth.current.y) * 0.06;

    const u = matRef.current.uniforms;
    u.uTime.value = time.current;
    u.uScroll.value = progressRef?.current ?? 0;
    u.uMouse.value.set(
      (smooth.current.x * viewport.width) / 2,
      (smooth.current.y * viewport.height) / 2,
    );

    // 視差
    if (groupRef.current) {
      groupRef.current.rotation.y = smooth.current.x * 0.09;
      groupRef.current.rotation.x = -smooth.current.y * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 4]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** WebGL非対応・ロード中のCSSフォールバック */
export function HeatFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 55% 65% at 50% 62%, rgba(255,107,53,0.22), rgba(255,180,84,0.07) 45%, transparent 72%)",
      }}
    />
  );
}

export default function EmberField({
  progressRef,
  className,
}: {
  progressRef?: RefObject<number>;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // WebGL対応・reduced-motion・ビューポートはSSRで判定できないため、
    // マウント後の環境検出としてsetStateする
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOk(supportsWebGL());
    setReduced(prefersReducedMotion());

    // 粒子数はビューポート面積で決定（モバイルは削減）
    const area = window.innerWidth * window.innerHeight;
    const mobile = window.innerWidth < 768;
    const n = Math.round(area / (mobile ? 90 : 42));
    setCount(Math.max(6000, Math.min(mobile ? 12000 : 34000, n)));

    const el = wrapRef.current;
    if (!el) return;

    // 画面外・タブ非表示でrAFループを必ず停止
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (ok === null || count === 0) return <HeatFallback />;
  if (!ok) return <HeatFallback />;

  const frameloop = reduced ? "demand" : inView && !hidden ? "always" : "never";

  return (
    <div ref={wrapRef} className={className ?? "absolute inset-0"}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 8], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Embers count={count} progressRef={progressRef} frozen={reduced} />
      </Canvas>
    </div>
  );
}
