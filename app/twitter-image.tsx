import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 80%, rgba(0, 219, 220, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 219, 220, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#00DBDC",
              marginRight: "16px",
            }}
          >
            DRIVE
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            FITT
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: "24px",
            lineHeight: "1.2",
          }}
        >
          Premium Fitness & Sports Club
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "#8A8A8A",
            textAlign: "center",
            marginBottom: "40px",
            maxWidth: "800px",
            lineHeight: "1.4",
          }}
        >
          Cricket • Fitness • Recovery • Running
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: "24px",
            color: "#00DBDC",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Gurugram, Haryana
        </div>

        {/* Bottom Accent */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "8px",
            background: "linear-gradient(90deg, #00DBDC 0%, #00B4B5 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
