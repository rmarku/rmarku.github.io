import { ImageResponse } from 'next/server'
import { SupportedLanguages } from 'reading-time-estimator'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  console.log('🚀🚀🚀🚀  ENTREEE')
  // Font
  const interSemiBold = fetch(new URL('./Inter.ttf', import.meta.url)).then((res) => res.arrayBuffer())
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div style={{ fontFamily: 'Inter' }}>About Acme</div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
