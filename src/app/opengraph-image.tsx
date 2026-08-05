import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F0DF",
          color: "#17251D",
          padding: 56,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
          Silicon Zoo
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div
            style={{
              width: 180,
              height: 180,
              border: "4px solid #20362A",
              borderRadius: 28,
              background: "#CBEA77",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 110,
            }}
          >
            🦊
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: -3,
                maxWidth: 800,
              }}
            >
              Is your tech animal already taken?
            </div>
            <div style={{ display: "flex", fontSize: 30, color: "#667068" }}>
              168 animals · 196 tech residents
            </div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#667068" }}>
          Every tech company wants a cute animal. Most good ones are taken.
        </div>
      </div>
    ),
    { ...size },
  );
}
