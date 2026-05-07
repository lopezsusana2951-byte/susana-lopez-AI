/* global React, ReactDOM */
const { useState, useEffect, useRef, useContext } = React;

// ─── Image library (Unsplash) ─────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=2400&q=85",
  heroAlt: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2400&q=85",
  heroAlt2: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=2400&q=85",
  portrait: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1400&q=85",
  interior: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85",
  tile1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85",
  tile2_phoneBg: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&q=85",
  tile3: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1000&q=85",
  tile4: "https://images.unsplash.com/photo-1613977257592-4a9a32f9141d?w=1000&q=85",
  tile5: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
  womanSuit: "assets/susana.jpeg",
  susanaPortrait: "assets/susana-portrait.jpeg",
  skyline: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=2000&q=85",
  marble: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=2200&q=85",
  phoneListing: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=85",
};

/* ── Video assets — filenames preserved, spaces encoded ──────────────────── */
const MANIFESTO_VIDEO = "videos/manifesto.mp4";

/* ── Price data — not translated (same in all languages) ─────────────────── */
const PACKAGE_PRICES = [
  { price: "$599",   was: "$799",   featured: false },
  { price: "$999",   was: "$1,299", featured: true  },
  { price: "$1,499", was: "$1,999", featured: false },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c9a96a",
  "headline": "",
  "headlineItalic": "",
  "theme": "dark",
  "displayFont": "Playfair Display",
  "heroImage": "default",
  "videoTile1": "default",
  "videoTile3": "default",
  "videoTile4": "default"
}/*EDITMODE-END*/;

const HERO_OPTIONS = {
  default: IMG.hero,
  villa: IMG.heroAlt,
  pool: IMG.heroAlt2,
};
const TILE_OPTIONS = {
  default: { 1: IMG.tile1, 3: IMG.tile3, 4: IMG.tile4 },
  alt1: {
    1: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=85",
    3: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85",
    4: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=900&q=85",
  },
  alt2: {
    1: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=900&q=85",
    3: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&q=85",
    4: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=85",
  }
};

// ─── Reveal-on-scroll hook ────────────────────
function useReveal() {
  useEffect(() => {
    let io;
    const setup = () => {
      const els = document.querySelectorAll(".reveal:not(.is-in)");
      if (!els.length) return;
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
      els.forEach((el) => io.observe(el));
      setTimeout(() => {
        document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight + 200) el.classList.add("is-in");
        });
      }, 1500);
    };
    const raf = requestAnimationFrame(setup);
    return () => { cancelAnimationFrame(raf); io && io.disconnect(); };
  }, []);
}

// ─── Language Toggle ──────────────────────────
function LangToggle() {
  const { lang, setLang } = useContext(window.LangContext);
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        className={`lang-toggle__btn ${lang === 'en' ? 'is-active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >EN</button>
      <button
        className={`lang-toggle__btn ${lang === 'es' ? 'is-active' : ''}`}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >ES</button>
    </div>
  );
}

// ─── Side rail ────────────────────────────────
function SideRail() {
  const { tr } = useContext(window.LangContext);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal]     = useState(1);

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll('main.page section[data-screen-label]'));

    const update = () => {
      const sections = getSections();
      if (!sections.length) return;
      if (sections.length !== total) setTotal(sections.length);
      const probe = window.scrollY + window.innerHeight * 0.35;
      let active = 0;
      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].getBoundingClientRect().top + window.scrollY;
        if (top <= probe) active = i;
        else break;
      }
      setPageNum(active + 1);
    };

    const mo = new MutationObserver(() => update());
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; update(); });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    const t1 = setTimeout(update, 250);
    const t2 = setTimeout(update, 1200);

    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const logoLines = tr('rail.logoSub').split('\n');

  return (
    <aside className="side-rail">
      <div className="rail-logo">
        miami<br/>
        <small>{logoLines[0]}<br/>{logoLines[1]}</small>
      </div>
      <div className="rail-mid">{tr('rail.mid')}</div>
      <div className="rail-foot" aria-label={`Section ${pageNum} of ${total}`}>
        <span key={pageNum} className="rail-foot__num">{pad(pageNum)}</span>
        <span className="rail-foot__sep">/</span>
        <span className="rail-foot__total">{pad(total)}</span>
      </div>
    </aside>
  );
}

// ─── Hero ─────────────────────────────────────
function Hero({ heroSrc }) {
  const { tr } = useContext(window.LangContext);
  const headline = tr('hero.headline');
  const headlineItalic = tr('hero.headlineItalic');

  const lines = headline.split(/\s+/).reduce((acc, w) => {
    const last = acc[acc.length - 1];
    if (!last || (last + " " + w).length > 18) acc.push(w);
    else acc[acc.length - 1] = last + " " + w;
    return acc;
  }, []);

  const brandLines = tr('hero.brandmark').split('\n');

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero__media" style={{ backgroundImage: `url(${heroSrc})` }} />
      <div className="hero__top">
        <div />
        <div className="hero__brandmark">
          <div className="lbl">{brandLines[0]}<br/><b style={{color:'var(--ink)', fontWeight: 400}}>{brandLines[1]}</b></div>
          <img
            src="logo%20tobon%20group.png"
            alt="Tobon Group"
            className="tobon-logo"
          />
        </div>
      </div>

      <div className="hero__inner">
        <h1 className="display hero__headline reveal">
          {lines.map((l, i) => <div key={i}>{l}</div>)}
          <em>{headlineItalic}</em>
        </h1>
        <p className="body-txt hero__copy reveal">
          {tr('hero.copy')}
        </p>
        <button className="hero__cta reveal" onClick={() => document.getElementById('vision').scrollIntoView({behavior:'smooth'})}>
          {tr('hero.cta')}
        </button>
      </div>

      <div className="hero__corner">
        <b>MIAMI, FL</b>
        {tr('hero.corner')}
      </div>

    </section>
  );
}

// ─── Section: New Standard (Manifesto) ───────────────────────────────────────
function NewStandard({ onPlayVideo }) {
  const { tr, lang } = useContext(window.LangContext);
  const [hovered, setHovered] = useState(false);
  const [vidMuted, setVidMuted] = useState(true);
  const videoRef = useRef(null);
  const beliefs  = tr('manifesto.beliefs');
  const captionLines = tr('manifesto.videoCaption').split('\n');

  function toggleVidMute(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setVidMuted(v.muted);
  }

  function goFullscreen(e) {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  }

  return (
    <section id="vision" className="new-standard ns--manifesto" data-screen-label="02 Manifesto">
      <div className="ns__copy reveal">
        <div className="eyebrow">{tr('manifesto.eyebrow')}</div>
        <h2 key={`ns-h2-${lang}`} className="display ns__h">
          {tr('manifesto.h2line1')}<br/>
          {tr('manifesto.h2line2')}<br/>
          <em>{tr('manifesto.h2em')}</em>
        </h2>
        <p className="body-txt body-txt--natural">
          {tr('manifesto.body')}
        </p>
        <ul className="ns__beliefs">
          {beliefs.map((b, i) => (
            <li key={i}><span>{String(i + 1).padStart(2, '0')}</span>{b}</li>
          ))}
        </ul>
      </div>

      {/* Video panel — real video as background, autoplay muted */}
      <div
        className="ns__video reveal"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`ns__videoframe ${hovered ? 'is-hovered' : ''}`}>

          {/* Actual video element — autoplays muted, loops */}
          <video
            ref={videoRef}
            className="ns__videobg"
            src={MANIFESTO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={IMG.interior}
            webkit-playsinline="true"
          />

          {/* Hover overlay text */}
          <div className="ns__overlay">
            <div className="ns__overlay-line">{tr('manifesto.videoOverlay1')}</div>
            <div className="ns__overlay-line ns__overlay-line--swap">
              <span className="alt">{tr('manifesto.videoOverlay2')}</span>
            </div>
          </div>

          {/* Video controls (mute + fullscreen) */}
          <div className="ns__vid-controls">
            <button className="ns__vid-btn" onClick={toggleVidMute} aria-label={vidMuted ? 'Unmute' : 'Mute'}>
              {vidMuted ? (
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-3.01-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
            <button className="ns__vid-btn" onClick={goFullscreen} aria-label="Fullscreen">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="ns__videocaption">
          {captionLines[0]}<br/>
          {captionLines[1]}
        </div>
      </div>
    </section>
  );
}

// ─── Section: One Property ────────────────────
function OneProperty() { return null; }

// ─── Signature section ────────────────────────
function Signature() {
  const { tr } = useContext(window.LangContext);
  const eyebrowLines = tr('signature.eyebrow').split('\n');

  return (
    <section className="signature" data-screen-label="04 Signature">
      <div className="sig__copy reveal">
        <div className="eyebrow">{eyebrowLines[0]}<br/>{eyebrowLines[1]}</div>
        <h2 className="display">
          {tr('signature.h2')}<br/>
          <em>{tr('signature.h2em')}</em><br/>
          {tr('signature.h2line3')}
        </h2>
      </div>
      <div className="sig__quote reveal" style={{ backgroundImage: `url(${IMG.womanSuit})` }}>
        <p>{tr('signature.quote')}</p>
        <div className="sig__signature">{tr('signature.sigName')}</div>
        <div className="sig__name">
          <b>{tr('signature.title1')}</b>
          {tr('signature.location')}
        </div>
      </div>
      <div className="sig__skyline reveal" style={{ backgroundImage: `url(${IMG.susanaPortrait})` }}>
        <div className="sig__skyline-overlay">
          <div className="sig__skyline-eyebrow">{tr('signature.portraitEyebrow')}</div>
          <div className="sig__skyline-title">{tr('signature.portraitTitle')}</div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────
function Pricing() {
  const { tr, lang } = useContext(window.LangContext);

  const pkgs      = tr('pricing.packages');
  const features  = tr('pricing.features');
  const addons    = tr('pricing.addons');
  const imgPkgs   = tr('pricing.imagePackages');
  const h2Lines   = tr('pricing.h2').split('\n');

  const Check = () => <span className="feat-check">✓</span>;
  const Cross = () => <span className="feat-cross">—</span>;
  const Cell = ({ v }) => {
    if (v === true)  return <Check />;
    if (v === false) return <Cross />;
    return <span className="feat-val">{v}</span>;
  };

  return (
    <section id="packages" className="pricing" data-screen-label="05 Packages">
      <div className="pricing__head">
        <div className="reveal fade">
          <div className="eyebrow" style={{marginBottom:24}}>{tr('pricing.eyebrow')}</div>
          <h2 key={`pricing-h2-${lang}`} className="display">
            {h2Lines[0]}<br/>
            {h2Lines[1]} <em>{tr('pricing.h2em')}</em>
          </h2>
        </div>
        <p className="body-txt body-txt--natural reveal">
          {tr('pricing.body')}
        </p>
      </div>

      <div className="pricing__banner reveal fade">
        <span className="pricing__banner-tag">{tr('pricing.bannerTag')}</span>
        <span className="pricing__banner-text">{tr('pricing.bannerText')}</span>
      </div>

      {/* ── Mobile package cards (≤960px) ── */}
      <div className="pricing-cards reveal fade">
        {pkgs.map((p, i) => (
          <div key={i} className={`pricing-card ${PACKAGE_PRICES[i].featured ? 'pricing-card--featured' : ''}`}>
            <div className="pricing-card__head">
              <div className="pricing-card__badge">{p.badge || `0${i+1} · ${tr('pricing.tierLabel')}`}</div>
              <div className="pricing-card__name display">{p.name}</div>
              <div className="pricing-card__price display">
                {PACKAGE_PRICES[i].price}
                <span className="pkg__was">{PACKAGE_PRICES[i].was}</span>
              </div>
              <div className="pricing-card__note">{p.note}</div>
            </div>
            <ul className="pricing-card__feats">
              {features.map((f, j) => (
                <li key={j} className="pricing-card__feat">
                  <span className="pricing-card__feat-label">{f.label}</span>
                  <span className="pricing-card__feat-val"><Cell v={f.vals[i]} /></span>
                </li>
              ))}
            </ul>
            <button
              className="pricing-card__cta"
              onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
            >{p.cta} →</button>
          </div>
        ))}
      </div>

      {/* ── Desktop comparison table (>960px) ── */}
      <div className="cmp-table reveal fade">
        <div className="cmp-row cmp-row--head">
          <div className="cmp-label" />
          {pkgs.map((p, i) => (
            <div key={i} className={`cmp-col-head ${PACKAGE_PRICES[i].featured ? 'cmp-col--featured' : ''}`}>
              <div className="cmp-badge">{p.badge || `0${i+1} · ${tr('pricing.tierLabel')}`}</div>
              <div className="cmp-name display">{p.name}</div>
              <div className="cmp-price display">
                {PACKAGE_PRICES[i].price}
                <span className="pkg__was">{PACKAGE_PRICES[i].was}</span>
              </div>
              <div className="cmp-note">{p.note}</div>
              <button className="pkg__cta" onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}>
                {p.cta} →
              </button>
            </div>
          ))}
        </div>

        {features.map((f, i) => (
          <div key={i} className={`cmp-row ${i % 2 === 0 ? 'cmp-row--alt' : ''}`}>
            <div className="cmp-label">{f.label}</div>
            {f.vals.map((v, j) => (
              <div key={j} className={`cmp-cell ${PACKAGE_PRICES[j].featured ? 'cmp-col--featured' : ''}`}>
                <Cell v={v} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="pricing__addons reveal fade">
        <div className="addons__col">
          <div className="eyebrow" style={{marginBottom:20}}>{tr('pricing.addonsLabel')}</div>
          <div className="addons__grid">
            {addons.map((a, i) => (
              <div key={i} className="addon">
                <span className="addon__name">{a.name}</span>
                <span className="addon__price">{a.price} <small>{a.note}</small></span>
              </div>
            ))}
          </div>
        </div>
        <div className="addons__col">
          <div className="eyebrow" style={{marginBottom:20}}>{tr('pricing.imageServicesLabel')}</div>
          <div className="addons__grid">
            {imgPkgs.map((a, i) => (
              <div key={i} className="addon">
                <span className="addon__name">{a.name}</span>
                <span className="addon__price">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────
function Faq() {
  const { tr }   = useContext(window.LangContext);
  const [open, setOpen] = useState(0);
  const items = tr('faq.items');

  return (
    <section id="faq" className="faq" data-screen-label="06 FAQ">
      <div className="faq__head reveal">
        <div className="eyebrow">{tr('faq.eyebrow')}</div>
        <h2 className="display">
          {tr('faq.h2')}<br/>
          <em>{tr('faq.h2em')}</em>
        </h2>
        <p className="body-txt body-txt--natural">
          {tr('faq.body')}
        </p>
      </div>
      <div className="faq__list">
        {items.map((f, i) => (
          <div key={i} className={`faq-item reveal fade ${open === i ? 'is-open' : ''}`}>
            <div className="faq-item__head" onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-item__q">{f.q}</div>
              <div className="faq-item__icon" />
            </div>
            <div className="faq-item__a"><p>{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Final CTA / Footer ───────────────────────
function Final() {
  const { tr }       = useContext(window.LangContext);
  const [sent, setSent] = useState(false);
  const [msg, setMsg]   = useState("");

  function submit(e) {
    e.preventDefault();
    const f = e.target;
    if (!f.email.value || !f.name.value) {
      setMsg(tr('contact.msgError'));
      return;
    }
    setMsg(tr('contact.msgSuccess'));
    setSent(true);
    f.reset();
    setTimeout(() => setMsg(""), 6000);
  }

  return (
    <section id="contact" className="final" style={{ backgroundImage: `url(${IMG.marble})` }} data-screen-label="07 Contact">
      <div className="final__inner">
        <div className="final__lead reveal">
          <div className="eyebrow">{tr('contact.eyebrow')}</div>
          <h2 className="display">
            {tr('contact.h2')}<br/>
            <em>{tr('contact.h2em')}</em>
          </h2>
        </div>

        <div className="final__form reveal">
          <div className="eyebrow">{tr('contact.connectEyebrow')}</div>
          <div className="contact-info" style={{marginBottom: 28}}>
            <a href="mailto:hello@susanalopez.ai">{tr('contact.email')}</a>
            <span>{tr('contact.location')}</span>
            <span>{tr('contact.availability')}</span>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <div className="row">
              <input name="name"  placeholder={tr('contact.formName')} />
              <input name="email" type="email" placeholder={tr('contact.formEmail')} />
            </div>
            <input name="property" placeholder={tr('contact.formProperty')} />
            <textarea name="message" rows={3} placeholder={tr('contact.formMessage')} />
            <button type="submit">
              {sent ? tr('contact.formSent') : tr('contact.formSubmit')} <span className="cta-arrow"></span>
            </button>
            <div className="form-msg">{msg}</div>
          </form>
        </div>

        <div className="final__sig reveal">
          <div className="sl-mark">SL</div>
          <div className="sl-name">SUSANA LOPEZ</div>
        </div>
      </div>
    </section>
  );
}

// ─── Video Lightbox ───────────────────────────
function Lightbox({ video, onClose }) {
  useEffect(() => {
    function key(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  return (
    <div className={`lightbox ${video ? 'is-open' : ''}`} onClick={onClose}>
      {video && (
        <div className="lightbox__inner" style={{ backgroundImage: `url(${video.img})` }} onClick={(e) => e.stopPropagation()}>
          <button className="lightbox__close" onClick={onClose}>×</button>
          <button className="lightbox__bigplay" aria-label="Play"></button>
          <div className="lightbox__title">
            {video.title}
            <small>{video.sub}</small>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tweaks ───────────────────────────────────
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Brand" />
      <TweakColor label="Accent (gold)" value={t.accent}
                  onChange={(v) => setTweak('accent', v)} />
      <TweakRadio label="Theme" value={t.theme}
                  options={['dark', 'light']}
                  onChange={(v) => setTweak('theme', v)} />
      <TweakSelect label="Display font" value={t.displayFont}
                   options={['Bodoni Moda', 'Playfair Display', 'Cormorant Garamond', 'DM Serif Display']}
                   onChange={(v) => setTweak('displayFont', v)} />

      <TweakSection label="Hero image" />
      <TweakSelect label="Hero image" value={t.heroImage}
                   options={['default', 'villa', 'pool']}
                   onChange={(v) => setTweak('heroImage', v)} />

      <TweakSection label="Video tile imagery" />
      <TweakRadio label="Tile set" value={t.videoTile1}
                  options={['default', 'alt1', 'alt2']}
                  onChange={(v) => {
                    setTweak({ videoTile1: v, videoTile3: v, videoTile4: v });
                  }} />
    </TweaksPanel>
  );
}

// ─── App ──────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [video, setVideo] = useState(null);
  const [lang, setLang]   = useState('en');
  useReveal();

  // Build tr function from current lang
  const tr = window.makeTr(lang);

  // Apply theme + accent + font
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme);
    document.documentElement.style.setProperty('--gold', t.accent);
    document.documentElement.style.setProperty('--display', `'${t.displayFont}', serif`);
  }, [t.theme, t.accent, t.displayFont]);

  // Update html lang attribute for SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const heroSrc = HERO_OPTIONS[t.heroImage] || HERO_OPTIONS.default;
  const tiles   = TILE_OPTIONS[t.videoTile1] || TILE_OPTIONS.default;

  return (
    <window.LangContext.Provider value={{ tr, lang, setLang }}>
      <LangToggle />
      <SideRail />
      <main className="page">
        <Hero heroSrc={heroSrc} />
        <NewStandard onPlayVideo={setVideo} />
        <StatsSection />
        <PortfolioSection onPlayVideo={setVideo} tiles={tiles} />
        <SocialSection />
        <BeforeAfterSection />
        <Signature />
        <Pricing />
        <Faq />
        <Final />
      </main>
      <Lightbox video={video} onClose={() => setVideo(null)} />
      <Tweaks t={t} setTweak={setTweak} />
    </window.LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
