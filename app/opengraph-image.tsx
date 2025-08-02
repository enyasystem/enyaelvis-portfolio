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
  // Load custom font
  const poppins = fetch(
    new URL('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_APP_URL || ''}/myLogo.png`}
        alt={alt}
        width={200}
        height={200}
        style={{
          objectFit: 'contain',
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Poppins',
          data: await poppins,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  )
}
