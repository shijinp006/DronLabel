import { useState, useEffect } from "react";

const SLIDES = [
    { img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=85", label: "The OG Collection" },
    { img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1600&q=85", label: "Street Essentials" },
    { img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1600&q=85", label: "Wear Your Story" },
    { img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=1600&q=85", label: "Kerala Originals" },
];

export const HeroPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((c: any) => { setPrev(c); return (c + 1) % SLIDES.length; });
            setTimeout(() => setPrev(null), 1000);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@500;600;700&display=swap');

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          line-height: 0.88;
          color: #FFB800;
          letter-spacing: 0.02em;
          -webkit-text-stroke: 2.5px #C44B00;
          text-shadow: 0 0 40px rgba(255,184,0,0.2), 5px 5px 0px #C44B00, 10px 10px 0px rgba(0,0,0,0.35);
        }

        .slide-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center top;
          transition: opacity 0.9s ease;
        }
        .slide-bg.active  { opacity: 1; z-index: 1; }
        .slide-bg.leaving { opacity: 0; z-index: 2; }
        .slide-bg.hidden  { opacity: 0; z-index: 0; }

        .gradient-overlay {
          position: absolute; inset: 0; z-index: 3;
          background: linear-gradient(105deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.80) 55%, rgba(0,0,0,0.95) 100%);
        }
        @media (max-width: 767px) {
          .gradient-overlay {
            background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.88) 100%);
          }
        }

        .gradient-bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 140px; z-index: 3;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }

        .badge-pill {
          font-family: 'Barlow', sans-serif; font-weight: 700;
          background: #FFB800; border-radius: 999px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35); transition: transform 0.2s;
        }
        .badge-pill:hover { transform: scale(1.04); }

        .cta-btn {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          letter-spacing: 0.15em; text-transform: uppercase;
          background: #FFB800; color: #000; border-radius: 999px;
          position: relative; overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none; display: inline-block;
        }
        .cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%);
          border-radius: inherit;
        }
        .cta-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 8px 32px rgba(255,184,0,0.45); }

        .tag-pill {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          letter-spacing: 0.18em; font-size: 11px;
          background: rgba(255,184,0,0.12); border: 1px solid rgba(255,184,0,0.35);
          color: #FFB800; border-radius: 999px; padding: 5px 14px;
          text-transform: uppercase; backdrop-filter: blur(4px); display: inline-block;
        }

        .glow-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
          animation: orb-pulse 4s ease-in-out infinite;
        }
        @keyframes orb-pulse {
          0%,100% { opacity: 0.16; transform: scale(1); }
          50%      { opacity: 0.26; transform: scale(1.1); }
        }

        .fade-up   { opacity:0; transform:translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .slide-r   { opacity:0; transform:translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.show, .slide-r.show { opacity:1; transform:none; }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .hero-section { height: 100svh !important; }

          .tag-pill-wrap { display: none !important; }

          .glow-orb-main { width: 260px !important; height: 260px !important; right: -10% !important; top: 0 !important; }
          .glow-orb-sub  { display: none; }

          .hero-content-block {
            width: 100% !important;
            align-items: center !important;
            text-align: center !important;
            padding-top: 0 !important;
            padding-bottom: 80px !important;
            gap: 14px !important;
          }
          .hero-cta-row {
            justify-content: center !important;
            flex-wrap: wrap !important;
            gap: 10px !important;
          }
          .cta-btn { padding: 11px 28px !important; font-size: 14px !important; }
          .hero-title {
            -webkit-text-stroke: 1.8px #C44B00;
            text-shadow: 3px 3px 0px #C44B00, 6px 6px 0px rgba(0,0,0,0.3);
          }
          .badge-pill {
            left: 50% !important;
            transform: translateX(-50%) !important;
            bottom: 20px !important;
            white-space: nowrap !important;
          }
          .badge-pill:hover { transform: translateX(-50%) scale(1.04) !important; }
        }
      `}</style>

            <section className="hero-section relative w-full overflow-hidden bg-black" style={{ height: "clamp(480px, 58vw, 640px)" }}>

                <div className="glow-orb glow-orb-main" style={{ width: 480, height: 480, background: "radial-gradient(circle,rgba(255,184,0,1),transparent)", right: "4%", top: "5%", zIndex: 4 }} />
                <div className="glow-orb glow-orb-sub" style={{ width: 280, height: 280, background: "radial-gradient(circle,rgba(196,75,0,0.8),transparent)", right: "28%", bottom: "-8%", zIndex: 4, animationDelay: "2s" }} />

                {SLIDES.map((slide, i) => (
                    <div key={i}
                        className={`slide-bg ${i === current ? "active" : i === prev ? "leaving" : "hidden"}`}
                        style={{ backgroundImage: `url('${slide.img}')`, filter: "brightness(0.45) saturate(0.8)" }}
                    />
                ))}

                <div className="gradient-overlay" />
                <div className="gradient-bottom" />

                <div className="relative h-full w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-14 flex items-center" style={{ zIndex: 5 }}>
                    <div className="flex w-full items-center justify-center md:justify-end">
                        <div className="hero-content-block flex flex-col items-start w-full md:w-[54%] lg:w-[50%] py-10 gap-4">

                            {/* Tag — hidden on mobile via .tag-pill-wrap */}
                            <div className={`tag-pill-wrap fade-up ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.05s" }}>
                                <span className="tag-pill">✦ Limited Drop · Season 2025</span>
                            </div>

                            {/* Headline */}
                            <div className={`slide-r ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.18s" }}>
                                <h1 className="hero-title" style={{ fontSize: "clamp(56px, 16vw, 118px)" }}>
                                    OG TEES<br />
                                    <span style={{ color: "#FFD000" }}>ARE BACK!</span>
                                </h1>
                            </div>

                            {/* CTA */}
                            <div className={`hero-cta-row flex items-center gap-4 fade-up ${loaded ? "show" : ""}`} style={{ transitionDelay: "0.52s" }}>
                                <a href="#" className="cta-btn px-8 py-3" style={{ fontSize: "clamp(13px,1.2vw,16px)" }}>
                                    Shop the Drop &nbsp;→
                                </a>
                                <a href="#" style={{
                                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
                                    fontSize: "clamp(12px,1.1vw,14px)", color: "rgba(255,255,255,0.45)",
                                    letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                                    borderBottom: "1px solid rgba(255,255,255,0.18)", paddingBottom: "2px",
                                }}>
                                    View Lookbook
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Badge */}
                <div className={`badge-pill absolute bottom-5 left-4 md:left-8 lg:left-14 flex items-center gap-2 px-4 py-2 fade-up ${loaded ? "show" : ""}`}
                    style={{ zIndex: 6, transitionDelay: "0.72s" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="8" width="18" height="13" rx="2" />
                        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
                    </svg>
                    <span style={{ fontSize: "12px", letterSpacing: "0.06em", color: "#000" }}>Mydesignation</span>
                </div>

            </section>
        </>
    );
};