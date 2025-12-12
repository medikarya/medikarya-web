import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'MediKarya - AI-Powered Medical Education'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Abstract Background Element */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-200px',
                        right: '-100px',
                        width: '600px',
                        height: '600px',
                        background: 'rgba(56, 189, 248, 0.15)', // Light Blue/Cyan
                        borderRadius: '50%',
                        filter: 'blur(100px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-200px',
                        left: '-100px',
                        width: '600px',
                        height: '600px',
                        background: 'rgba(99, 102, 241, 0.15)', // Indigo
                        borderRadius: '50%',
                        filter: 'blur(100px)',
                    }}
                />

                {/* Logo Container */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '40px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Simple SVG Logo approximation for OG Image since we can't easily load local files in Edge */}
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 14C20.49 12.54 22 11.53 22 9.58C22 5.21 15.37 0 10 0C4.63 0 0 5.22 0 9.58C0 12.42 2.25 14.54 5 16V24H7V18H17V24H19V14ZM10 18C7.24 18 5 15.76 5 13H15C15 15.76 12.76 18 10 18Z"
                            fill="url(#paint0_linear)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="0"
                                y1="0"
                                x2="22"
                                y2="24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#4F46E5" /> {/* Brand Blue/Indigo */}
                                <stop offset="1" stopColor="#06B6D4" /> {/* Brand Cyan/Teal */}
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: '80px',
                            fontWeight: 'bold',
                            color: '#1e293b', // Slate 900
                            marginBottom: '20px',
                            letterSpacing: '-2px',
                        }}
                    >
                        MediKarya
                    </div>
                    <div
                        style={{
                            fontSize: '40px',
                            color: '#475569', // Slate 600
                            marginBottom: '40px',
                        }}
                    >
                        AI-Powered Medical Education
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(to right, #4F46E5, #06B6D4)',
                            padding: '16px 48px',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '600',
                        }}
                    >
                        Gain Clinical Confidence
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
