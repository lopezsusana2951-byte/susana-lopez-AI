/* ============================================================
   Susana López — Concierge chat widget
   Self-contained. Include on any page with:
   <script src="/chat-widget.js" defer></script>
   ============================================================ */
(function () {
  if (window.__slcLoaded) return;            // guard against double-load
  window.__slcLoaded = true;

  var ENDPOINT = "https://yxngxwnnxxkuejqsgaqe.supabase.co/functions/v1/web";
  var GREETING = "¡Hola! 👋 Soy el asistente de Susana. ¿En qué propiedad estás pensando — o qué te gustaría crear? (English is welcome too.)";

  /* ---- inject fonts (only if not already present) ---- */
  if (!document.querySelector('link[href*="Cormorant+Garamond"]')) {
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(f);
  }

  /* ---- inject styles ---- */
  var css = `
  .slc-root{--ink:#211B15;--ivory:#FBF7F1;--paper:#FCFAF6;--brass:#B0894F;
    --brass-2:#caa86f;--line:#EAE2D6;--muted:#8d8478;--agent:#F2ECE1;
    position:fixed;right:24px;bottom:24px;z-index:2147483000;
    font-family:'Inter',system-ui,sans-serif;}
  .slc-launch{display:flex;align-items:center;gap:.55rem;cursor:pointer;border:none;
    background:var(--ink);color:var(--ivory);padding:.85rem 1.3rem;border-radius:999px;
    box-shadow:0 10px 30px -8px rgba(33,27,21,.45);transition:transform .25s ease,box-shadow .25s ease;}
  .slc-launch:hover{transform:translateY(-2px);box-shadow:0 16px 36px -10px rgba(33,27,21,.55);}
  .slc-launch .slc-dot{width:8px;height:8px;border-radius:50%;background:#7BC47F;box-shadow:0 0 0 3px rgba(123,196,127,.25);}
  .slc-launch span{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.18rem;letter-spacing:.01em;}
  .slc-panel{position:absolute;right:0;bottom:0;width:370px;max-width:calc(100vw - 32px);
    height:560px;max-height:calc(100vh - 48px);background:var(--paper);border-radius:20px;overflow:hidden;
    display:flex;flex-direction:column;opacity:0;transform:translateY(14px) scale(.97);pointer-events:none;
    box-shadow:0 24px 70px -18px rgba(33,27,21,.5);border:1px solid var(--line);
    transition:opacity .22s ease,transform .22s ease;}
  .slc-root.slc-open .slc-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}
  .slc-root.slc-open .slc-launch{opacity:0;pointer-events:none;}
  .slc-head{background:var(--ink);color:var(--ivory);padding:1rem 1.1rem;display:flex;align-items:center;gap:.75rem;}
  .slc-ava{width:40px;height:40px;border-radius:50%;flex:none;display:grid;place-items:center;
    background:linear-gradient(150deg,var(--brass),#8c6c3d);color:#fff;font-family:'Cormorant Garamond',serif;
    font-size:1.15rem;font-weight:600;letter-spacing:.02em;}
  .slc-id{flex:1;min-width:0;}
  .slc-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:600;line-height:1;}
  .slc-sub{font-size:.72rem;color:#c9bfb0;margin-top:.25rem;display:flex;align-items:center;gap:.4rem;}
  .slc-sub i{width:6px;height:6px;border-radius:50%;background:#7BC47F;display:inline-block;}
  .slc-x{background:none;border:none;color:#c9bfb0;font-size:1.5rem;line-height:1;cursor:pointer;padding:.2rem;border-radius:8px;}
  .slc-x:hover{color:#fff;}
  .slc-body{flex:1;overflow-y:auto;padding:1.1rem;display:flex;flex-direction:column;gap:.7rem;background:var(--paper);}
  .slc-msg{max-width:80%;padding:.7rem .9rem;border-radius:16px;font-size:.92rem;line-height:1.45;white-space:pre-wrap;word-wrap:break-word;}
  .slc-agent{align-self:flex-start;background:var(--agent);color:var(--ink);border-bottom-left-radius:5px;}
  .slc-user{align-self:flex-end;background:var(--ink);color:var(--ivory);border-bottom-right-radius:5px;}
  .slc-typing{align-self:flex-start;background:var(--agent);border-radius:16px;border-bottom-left-radius:5px;padding:.8rem 1rem;display:flex;gap:5px;}
  .slc-typing i{width:7px;height:7px;border-radius:50%;background:var(--muted);opacity:.5;animation:slc-b 1s infinite;}
  .slc-typing i:nth-child(2){animation-delay:.18s;} .slc-typing i:nth-child(3){animation-delay:.36s;}
  @keyframes slc-b{0%,60%,100%{transform:translateY(0);opacity:.4;}30%{transform:translateY(-5px);opacity:.9;}}
  .slc-foot{border-top:1px solid var(--line);padding:.7rem;display:flex;gap:.5rem;align-items:flex-end;background:var(--paper);}
  .slc-in{flex:1;border:1px solid var(--line);border-radius:14px;padding:.65rem .8rem;font-family:inherit;font-size:.92rem;
    resize:none;max-height:110px;outline:none;color:var(--ink);background:#fff;}
  .slc-in:focus{border-color:var(--brass);box-shadow:0 0 0 3px rgba(176,137,79,.15);}
  .slc-send{flex:none;border:none;background:var(--brass);color:#fff;width:42px;height:42px;border-radius:12px;cursor:pointer;
    display:grid;place-items:center;transition:background .2s;}
  .slc-send:hover{background:#8c6c3d;} .slc-send:disabled{opacity:.45;cursor:default;}
  @media(max-width:480px){
    .slc-root{right:16px;bottom:16px;}
    .slc-panel{width:calc(100vw - 24px);height:calc(100vh - 90px);}
  }
  @media(prefers-reduced-motion:reduce){
    .slc-panel,.slc-launch{transition:none;} .slc-typing i{animation:none;}
  }`;
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ---- inject markup ---- */
  var root = document.createElement('div');
  root.className = 'slc-root';
  root.id = 'slcRoot';
  root.innerHTML = `
    <button class="slc-launch" id="slcLaunch" aria-label="Abrir chat">
      <span class="slc-dot"></span><span>Hablemos</span>
    </button>
    <div class="slc-panel" role="dialog" aria-label="Chat con Susana López">
      <div class="slc-head">
        <div class="slc-ava">SL</div>
        <div class="slc-id">
          <div class="slc-name">Susana López</div>
          <div class="slc-sub"><i></i> Asistente · responde al instante</div>
        </div>
        <button class="slc-x" id="slcClose" aria-label="Cerrar">&times;</button>
      </div>
      <div class="slc-body" id="slcBody"></div>
      <div class="slc-foot">
        <textarea class="slc-in" id="slcIn" rows="1" placeholder="Escribe un mensaje…"></textarea>
        <button class="slc-send" id="slcSend" aria-label="Enviar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>`;
  document.body.appendChild(root);

  /* ---- behavior ---- */
  var body = document.getElementById('slcBody'),
      input = document.getElementById('slcIn'),
      send = document.getElementById('slcSend');
  var greeted = false;

  function session() {
    try {
      var s = localStorage.getItem('slc_sess');
      if (!s) { s = crypto.randomUUID(); localStorage.setItem('slc_sess', s); }
      return s;
    } catch (e) {
      if (!window.__slc) window.__slc = crypto.randomUUID();
      return window.__slc;
    }
  }
  function bubble(text, who) {
    var d = document.createElement('div');
    d.className = 'slc-msg ' + (who === 'user' ? 'slc-user' : 'slc-agent');
    d.textContent = text; body.appendChild(d); body.scrollTop = body.scrollHeight; return d;
  }
  function typing(on) {
    var t = document.getElementById('slcTyping');
    if (on) {
      if (!t) { t = document.createElement('div'); t.id = 'slcTyping'; t.className = 'slc-typing'; t.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(t); body.scrollTop = body.scrollHeight; }
    } else if (t) { t.remove(); }
  }
  function open() { root.classList.add('slc-open'); if (!greeted) { greeted = true; bubble(GREETING, 'agent'); } input.focus(); }
  function close() { root.classList.remove('slc-open'); }

  async function ask(text) {
    bubble(text, 'user'); input.value = ''; input.style.height = 'auto'; send.disabled = true; typing(true);
    try {
      var r = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widget_key: "wk-457cdd3e945010", session_id: session(), body: text })
      });
      var data = await r.json(); typing(false);
      bubble(data.reply || "Lo siento, ¿me lo repites?", 'agent');
    } catch (e) {
      typing(false);
      bubble("Se me cayó la conexión un momento — intenta enviarlo de nuevo.", 'agent');
    } finally {
      send.disabled = false; input.focus();
    }
  }

  document.getElementById('slcLaunch').onclick = open;
  document.getElementById('slcClose').onclick = close;
  send.onclick = function () { var v = input.value.trim(); if (v) ask(v); };
  input.addEventListener('input', function () { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); var v = input.value.trim(); if (v) ask(v); }
  });
})();
