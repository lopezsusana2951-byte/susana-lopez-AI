/* global React */
const { useState: useStateExt, useEffect: useEffectExt, useRef: useRefExt, useContext: useContextExt } = React;

/* ── image/asset constants (never translated) ─────────────────────────────── */
const FORMAT_IMGS = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=85",
  "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=1600&q=85",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=85",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85",
];

/* ── video paths — served directly from Netlify ──────────────────────────── */
const FORMAT_VIDEOS = [
  "videos/lifestyle-agent.mp4",   // LifeStyle Agent
  "videos/interior-3d.mp4",       // Interior 3D Tour
  "videos/space-remodel.mp4",     // Space Remodel
  "videos/land-vision.mp4",       // Land Vision
  "videos/full-vision.mp4",       // Full Vision Composite
];

/* ── Social media photos — auto-mapped from filenames ────────────────────────
   Detection rule: filename contains "Story" → 9:16  |  "Carrusel/Carruel" → 3:4
   Exact native dimensions used for pixel-perfect aspect-ratio CSS.
   Ordered: carousels first (row 1), stories second (row 2).
─────────────────────────────────────────────────────────────────────────── */
function detectPhotoType(filename) {
  const lc = filename.toLowerCase();
  if (lc.includes('story'))                          return 'story';
  if (lc.includes('carrusel') || lc.includes('carruel')) return 'carousel';
  return 'post';
}

const RAW_SOCIAL_FILES = [
  /* carousels (1792×2400 · 3:4) */
  'Social_Media_Photos/Instagram_Carrusel_Page_1.jpeg',
  'Social_Media_Photos/Instagram_Carrusel_Page_2.jpeg',
  'Social_Media_Photos/Instagram_Carrusel_Page_3.jpeg',
  /* stories (1536×2752 · 9:16) */
  'Social_Media_Photos/Instagram_Story_1.jpeg',
  'Social_Media_Photos/Instagram_Story_2.jpeg',
  'Social_Media_Photos/Instagram_Story_3.jpeg',
];

/* Auto-build the photo data array from filenames */
const SOCIAL_MEDIA_PHOTOS = RAW_SOCIAL_FILES.map((src) => ({
  src,
  type: detectPhotoType(src),
  ratio: detectPhotoType(src) === 'story' ? '9:16' : '3:4',
}));

const PAIR_ASSETS = [
  { before: "assets/bath-before.jpeg",                 after: "assets/bath-after.jpeg" },
  { before: "assets/comedor-before.jpeg",              after: "assets/comedor-after.jpeg" },
  { before: "assets/kitchen-before.jpeg",              after: "assets/kitchen-after.jpeg" },
  { before: "assets/render-before.jpeg",               after: "assets/After%20render%20.png" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   VIDEO PHONE — vertical 9:16 player inside a phone-frame mockup
   Autoplays (muted) when isActive, pauses otherwise. Sound + fullscreen controls.
───────────────────────────────────────────────────────────────────────────── */
function VideoPhone({ src, formatIndex, isActive, badge, deliverable, formatNum }) {
  const videoRef  = useRefExt(null);
  const [muted, setMuted]       = useStateExt(true);
  const [loaded, setLoaded]     = useStateExt(false);
  const [playing, setPlaying]   = useStateExt(false);

  /* Play / pause based on active state */
  useEffectExt(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [isActive, src]);

  /* Reset mute indicator when format switches */
  useEffectExt(() => { setMuted(true); }, [src]);

  function toggleMute(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function goFullscreen(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen)        v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  }

  return (
    <div className="vphone">

      {/* Device shell */}
      <div className="vphone__device">

        {/* Top pill / notch */}
        <div className="vphone__notch">
          <div className="vphone__notch-pill"></div>
        </div>

        {/* Screen */}
        <div className="vphone__screen">

          {/* Loading shimmer */}
          {!loaded && <div className="vphone__shimmer" />}

          {/* The video — keyed by index so React remounts on format switch → autoPlay fires */}
          <video
            key={`fmt-video-${formatIndex}`}
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            autoPlay={isActive}
            preload={isActive ? "auto" : "metadata"}
            className="vphone__vid"
            onCanPlay={() => setLoaded(true)}
          />

          {/* Top overlay: format badge */}
          <div className="vphone__top-bar">
            <span className="vphone__badge">{badge}</span>
          </div>

          {/* Bottom overlay: deliverable spec */}
          <div className="vphone__bottom-bar">
            <span className="vphone__num">{formatNum}</span>
            <span className="vphone__spec">{deliverable}</span>
          </div>

          {/* Mute-only control — fullscreen removed */}
          <div className="vphone__controls">
            <button className="vphone__ctrl" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-3.01-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bottom home bar */}
        <div className="vphone__home">
          <div className="vphone__home-bar"></div>
        </div>
      </div>

      {/* Format spec label below device */}
      <div className="vphone__label">
        <span className="vphone__label-dot" aria-hidden="true"></span>
        VERTICAL · 9:16 · SOCIAL
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────────────────────────────────────── */
function StatCard({ s, index }) {
  return (
    <div className="stat reveal fade">
      <div className="stat__num display">{s.num}</div>
      <div className="stat__label">{s.label}</div>
      <p className="stat__body">{s.body}</p>
      <div className="stat__src">— {s.src}</div>
    </div>
  );
}

function StatsSection() {
  const { tr } = useContextExt(window.LangContext);
  const items  = tr('stats.items');

  return (
    <section className="stats" data-screen-label="Stats">
      <div className="stats__head">
        <div className="eyebrow reveal fade">{tr('stats.eyebrow')}</div>
        <h2 className="display reveal fade">
          {tr('stats.h2')}<br/>
          <em>{tr('stats.h2em')}</em>
        </h2>
        <p className="body-txt body-txt--natural reveal fade">{tr('stats.body')}</p>
      </div>
      <div className="stats__grid">
        {items.map((s, i) => <StatCard key={i} s={s} index={i} />)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE FORMAT CARD — individual scroll card, one per format on mobile
───────────────────────────────────────────────────────────────────────────── */
function MobileFormatCard({ fmt, videoSrc, index }) {
  const videoRef  = useRefExt(null);
  const cardRef   = useRefExt(null);
  const [muted, setMuted] = useStateExt(true);

  /* Autoplay when card scrolls into view, pause when out */
  useEffectExt(() => {
    const v  = videoRef.current;
    const el = cardRef.current;
    if (!v || !el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggleMute(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <div className="fmt-mobile-card reveal fade" ref={cardRef}>
      {/* Header: number + title */}
      <div className="fmt-mobile-card__top">
        <span className="fmt-mobile-card__num">{fmt.n}</span>
        <h3 className="fmt-mobile-card__title display">{fmt.title}</h3>
      </div>

      {/* Phone mockup centered */}
      <div className="fmt-mobile-card__phone-wrap">
        <div className="fmt-mobile-card__device">
          <div className="vphone__notch">
            <div className="vphone__notch-pill"></div>
          </div>
          <div className="vphone__screen">
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className="vphone__vid"
            />
            <div className="vphone__top-bar">
              <span className="vphone__badge">{fmt.badge}</span>
            </div>
            <div className="vphone__bottom-bar">
              <span className="vphone__num">{fmt.n}</span>
              <span className="vphone__spec">{fmt.deliverable}</span>
            </div>
            <div className="vphone__controls">
              <button className="vphone__ctrl" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                {muted ? (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-3.01-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="vphone__home">
            <div className="vphone__home-bar"></div>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="fmt-mobile-card__copy">
        <p className="fmt-mobile-card__pitch">"{fmt.pitch}"</p>
        <p className="fmt-mobile-card__body">{fmt.body}</p>
        <div className="fmt-show__deliverable">
          <span className="fmt-show__deliverable-dot"></span>
          {fmt.deliverable}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PORTFOLIO — 5 video formats with phone-frame player
   Desktop: tab selector + single showcase
   Mobile:  all 5 formats stacked individually, scroll-to-play
───────────────────────────────────────────────────────────────────────────── */
function PortfolioSection({ onPlayVideo }) {
  const { tr }  = useContextExt(window.LangContext);
  const [active, setActive] = useStateExt(0);

  const formats = tr('portfolio.formats');
  const f       = formats[active];

  /* Expose setter so GSAP ScrollTrigger can drive format switching via scroll */
  useEffectExt(() => {
    window.__fmtSetActive = setActive;
    return () => { delete window.__fmtSetActive; };
  }, []);

  return (
    <section className="formats formats--case" data-screen-label="Formats">
      <div className="formats__head reveal fade">
        <div className="eyebrow">{tr('portfolio.eyebrow')}</div>
        <h2 className="display">
          {tr('portfolio.h2')}<br/>
          <em>{tr('portfolio.h2em')}</em>
        </h2>
        <p className="formats__sub">{tr('portfolio.sub')}</p>
      </div>

      {/* ── DESKTOP UI: tab selector + single showcase (hidden on mobile) ── */}
      <div className="fmt-desktop-ui">
        <div className="fmt-tabs reveal fade" role="tablist">
          {formats.map((ff, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              className={`fmt-tab ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="fmt-tab__n">{ff.n}</span>
              <span className="fmt-tab__lbl">{ff.title}</span>
            </button>
          ))}
        </div>

        <div className="fmt-show fmt-show--video reveal fade">
          <VideoPhone
            key={active}
            src={FORMAT_VIDEOS[active]}
            formatIndex={active}
            isActive={true}
            badge={f.badge}
            deliverable={f.deliverable}
            formatNum={f.n}
          />
          <div key={`copy-${active}`} className="fmt-show__copy">
            <div className="fmt-show__num-mini">{f.n} · {tr('portfolio.formatLabel')}</div>
            <h3 className="display">{f.title}</h3>
            <p className="fmt-show__pitch">"{f.pitch}"</p>
            <p className="fmt-show__body">{f.body}</p>
            <div className="fmt-show__deliverable">
              <span className="fmt-show__deliverable-dot"></span>
              {f.deliverable}
            </div>
            <div className="fmt-show__nav">
              <button
                className="fmt-arrow"
                onClick={() => setActive((active - 1 + formats.length) % formats.length)}
                aria-label="Previous format"
              >←</button>
              <span className="fmt-show__count">
                {String(active + 1).padStart(2,'0')} / {String(formats.length).padStart(2,'0')}
              </span>
              <button
                className="fmt-arrow"
                onClick={() => setActive((active + 1) % formats.length)}
                aria-label="Next format"
              >→</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE UI: all 5 formats stacked, scroll-to-play (hidden on desktop) ── */}
      <div className="fmt-mobile-list">
        {formats.map((ff, i) => (
          <MobileFormatCard key={i} fmt={ff} videoSrc={FORMAT_VIDEOS[i]} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SOCIAL PHOTO GRID — renders real local photos with native aspect ratios.
   Layout: Row 1 = carousels (3:4), Row 2 = stories (9:16).
   Auto-maps type from filename; hover reveals format badge + ratio.
───────────────────────────────────────────────────────────────────────────── */
function SocialPhotoGrid({ photos, lang }) {
  const carousels = photos.filter(p => p.type === 'carousel');
  const stories   = photos.filter(p => p.type === 'story');

  const typeLabel = {
    carousel: lang === 'es' ? 'CARRUSEL' : 'CAROUSEL',
    story:    lang === 'es' ? 'HISTORIA' : 'STORY',
  };
  const rowLabel = {
    carousel: lang === 'es' ? 'Carruseles · 3:4' : 'Carousels · 3:4',
    story:    lang === 'es' ? 'Historias · 9:16'  : 'Stories · 9:16',
  };

  function PhotoCell({ photo }) {
    return (
      <div className={`ig-photo-cell ig-photo-cell--${photo.type}`}>
        <img
          src={photo.src}
          alt={typeLabel[photo.type]}
          loading="lazy"
          decoding="async"
          className="ig-photo-img"
        />
        <div className="ig-photo-overlay" aria-hidden="true">
          <span className="ig-photo-type">
            <span className="ig-photo-type-dot" />
            {typeLabel[photo.type]}
          </span>
          <span className="ig-photo-ratio">{photo.ratio}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ig-gallery" role="list" aria-label="Instagram feed">
      {/* ── Row 1: Carousels ── */}
      {carousels.length > 0 && (
        <div className="ig-row-label" aria-hidden="true">
          <span className="ig-row-label-dot" />
          {rowLabel.carousel}
        </div>
      )}
      {carousels.map((p, i) => <PhotoCell key={`car-${i}`} photo={p} />)}

      {/* ── Row 2: Stories ── */}
      {stories.length > 0 && (
        <div className="ig-row-label" aria-hidden="true">
          <span className="ig-row-label-dot" />
          {rowLabel.story}
        </div>
      )}
      {stories.map((p, i) => <PhotoCell key={`st-${i}`} photo={p} />)}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SOCIAL SECTION
───────────────────────────────────────────────────────────────────────────── */
function SocialSection() {
  const { tr, lang } = useContextExt(window.LangContext);

  return (
    <section className="social" data-screen-label="Social">
      <div className="social__head">
        <div className="eyebrow reveal fade">{tr('social.eyebrow')}</div>
        <h2 className="display reveal fade">
          {tr('social.h2')}<br/>
          <em>{tr('social.h2em')}</em>
        </h2>
        <p className="body-txt body-txt--natural reveal fade">{tr('social.body')}</p>
      </div>

      <div className="social__phone reveal fade">
        <div className="social__phoneFrame">
          <div className="social__phoneTop">
            <div className="ig-handle">{tr('social.handle')}</div>
            <SocialPhotoGrid photos={SOCIAL_MEDIA_PHOTOS} lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BEFORE / AFTER — drag sliders with GSAP intro animation
───────────────────────────────────────────────────────────────────────────── */
function BeforeAfter({ pair, assets }) {
  const posRef       = useRefExt({ val: 0 });
  const afterRef     = useRefExt(null);
  const handleRef    = useRefExt(null);
  const containerRef = useRefExt(null);
  const animatingRef = useRefExt(true);
  const gsapCtxRef   = useRefExt(null);

  function applyPos(p) {
    posRef.current.val = p;
    if (afterRef.current)  afterRef.current.style.clipPath  = `inset(0 0 0 ${p}%)`;
    if (handleRef.current) handleRef.current.style.left     = `${p}%`;
  }

  useEffectExt(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const proxy = { p: 0 };
        gsapCtxRef.current = window.gsap.timeline()
          .to(proxy, { p: 100, duration: 1.6, ease: "power2.inOut", onUpdate() { applyPos(proxy.p); } })
          .to(proxy, { p: 50,  duration: 0.9, ease: "power3.out",   onUpdate() { applyPos(proxy.p); },
                       onComplete() { animatingRef.current = false; } });
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); if (gsapCtxRef.current) gsapCtxRef.current.kill(); };
  }, []);

  function move(clientX) {
    if (animatingRef.current) {
      if (gsapCtxRef.current) gsapCtxRef.current.kill();
      animatingRef.current = false;
    }
    const r = containerRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    applyPos(p);
  }

  const dragging = useRefExt(false);

  return (
    <div className="ba reveal fade" ref={containerRef}
         onMouseDown={(e)  => { dragging.current = true;  move(e.clientX); }}
         onMouseMove={(e)  => { if (dragging.current) move(e.clientX); }}
         onMouseUp={()     => { dragging.current = false; }}
         onMouseLeave={()  => { dragging.current = false; }}
         onTouchStart={(e) => { dragging.current = true;  move(e.touches[0].clientX); }}
         onTouchMove={(e)  => { if (dragging.current) move(e.touches[0].clientX); }}
         onTouchEnd={()    => { dragging.current = false; }}>
      <div className="ba__before" style={{ backgroundImage: `url(${assets.before})` }}>
        <div className="ba__cornerTag">{pair.before}</div>
      </div>
      <div className="ba__after" ref={afterRef}
           style={{ backgroundImage: `url(${assets.after})`, clipPath: "inset(0 0 0 0%)" }}>
        <div className="ba__cornerTag ba__cornerTag--r">{pair.after}</div>
      </div>
      <div className="ba__handle" ref={handleRef} style={{ left: "0%" }}>
        <div className="ba__handleBar"></div>
        <div className="ba__handleKnob">‹ ›</div>
      </div>
      <div className="ba__caption">
        <div className="ba__tag">{pair.tag}</div>
        <div className="ba__label display">{pair.label}</div>
      </div>
    </div>
  );
}

function BeforeAfterSection() {
  const { tr }   = useContextExt(window.LangContext);
  const pairs    = tr('beforeAfter.pairs');
  const services = tr('beforeAfter.services');

  const pairsWithAssets = pairs.map((p, i) => ({
    ...p,
    before: tr('beforeAfter.before'),
    after:  tr('beforeAfter.after'),
    assets: PAIR_ASSETS[i],
  }));

  return (
    <section className="bas" data-screen-label="Before After">
      <div className="bas__head">
        <div className="eyebrow reveal fade">{tr('beforeAfter.eyebrow')}</div>
        <h2 className="display reveal fade">
          {tr('beforeAfter.h2')}<br/>
          <em>{tr('beforeAfter.h2em')}</em>
        </h2>
        <p className="body-txt body-txt--natural reveal fade">{tr('beforeAfter.body')}</p>
      </div>
      <div className="bas__sliders">
        {pairsWithAssets.map((p, i) => (
          <BeforeAfter key={i} pair={p} assets={p.assets} />
        ))}
      </div>
      <div className="bas__services">
        {services.map((svc, i) => (
          <div key={i} className="bas__svc reveal fade">
            <div className="bas__svc-num">{svc.num}</div>
            <div className="bas__svc-name">{svc.name}</div>
            <p>{svc.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// expose
Object.assign(window, { StatsSection, PortfolioSection, SocialSection, BeforeAfterSection });
