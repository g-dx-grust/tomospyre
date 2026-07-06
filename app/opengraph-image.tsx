import { ImageResponse } from "next/og";

export const alt =
  "TOMOSPYRE — AIとひとの力で、できることを増やしていく。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse 60% 70% at 75% 90%, rgba(255,107,53,0.35), rgba(255,180,84,0.1) 45%, #050607 75%)",
          backgroundColor: "#050607",
          color: "#F4F2ED",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.3em",
            color: "#FFB454",
          }}
        >
          AI CREATIVE COMPANY — NAGOYA / TOKYO / OSAKA
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          TOMOSPYRE
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 34,
            color: "#F4F2ED",
            opacity: 0.9,
          }}
        >
          AIとひとの力で、できることを増やしていく。
        </div>
        <div
          style={{
            marginTop: 60,
            width: 420,
            height: 6,
            background:
              "linear-gradient(90deg, #FF6B35, #FFB454, #FFE8C2)",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
