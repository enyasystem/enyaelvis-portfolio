import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Enya Elvis - Full-Stack Developer & AI Enthusiast"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom right, #1e1b4b, #312e81)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          backgroundImage: "linear-gradient(to right, #8b5cf6, #3b82f6)",
          backgroundClip: "text",
          color: "transparent",
          fontSize: 64,
          fontWeight: "bold",
          marginBottom: 24,
        }}
      >
        @enyasystem
      </div>
      <div
        style={{
          fontSize: 36,
          color: "white",
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        Full-Stack Developer & AI Enthusiast
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 24,
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "8px 16px",
            borderRadius: 8,
            color: "white",
            fontSize: 24,
          }}
        >
          JavaScript
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "8px 16px",
            borderRadius: 8,
            color: "white",
            fontSize: 24,
          }}
        >
          TypeScript
        </div>
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
