(function(){
  const $ = (q, el=document)=>el.querySelector(q);
  const $$ = (q, el=document)=>Array.from(el.querySelectorAll(q));

  const state = {
    lang: (localStorage.getItem("oni_lang") || (location.hash.includes("lang=en") ? "en" : "sq"))
  };

  const content = () => state.lang === "en" ? window.ONI_CONTENT_EN : window.ONI_CONTENT_SQ;

  function setActiveLangButtons(){
    $$(".toggle button").forEach(b => b.classList.toggle("active", b.dataset.lang === state.lang));
  }

  function setLang(lang){
    state.lang = lang;
    localStorage.setItem("oni_lang", lang);
    render();
  }

  function navLink(id, label){
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = label;
    return a;
  }

  function renderNav(){
    const c = content();
    const menu = $("#menu");
    menu.innerHTML = "";
    menu.append(
      navLink("home", c.nav.home),
      navLink("company", c.nav.company),
      navLink("platforms", c.nav.platforms),
      navLink("implementations", c.nav.implementations),
      navLink("technology", c.nav.technology),
      navLink("services", c.nav.services),
      navLink("arkimedo", c.nav.arkimedo),
      navLink("insights", c.nav.insights),
      navLink("contact", c.nav.contact),
    );

    $("#btn-demo").textContent = c.nav.demo;
    $("#btn-sales").textContent = c.nav.sales;
  }

  function renderHero(){
    const c = content();
    $("#hero-kicker").textContent = c.hero.kicker;
    $("#hero-title").textContent = c.hero.title;
    $("#hero-subtitle").textContent = c.hero.subtitle;
    $("#hero-cta1").textContent = c.hero.cta1;
    $("#hero-cta2").textContent = c.hero.cta2;
  }

  function renderWhy(){
    const c = content();
    $("#why-title").textContent = c.why.title;
    $("#why-text").textContent = c.why.text;
    const ul = $("#why-bullets");
    ul.innerHTML = "";
    c.why.bullets.forEach(x=>{
      const row = document.createElement("div");
      row.className="li";
      row.innerHTML = `<div class="dot"></div><div>${x}</div>`;
      ul.appendChild(row);
    });
  }

  function renderStats(){
    const c = content();
    const grid = $("#stat-grid");
    grid.innerHTML = "";
    c.stats.forEach(s=>{
      const card = document.createElement("div");
      card.className="card";
      card.innerHTML = `<b>${s.k}</b><span>${s.v}</span>`;
      grid.appendChild(card);
    });
  }

  function renderPlatforms(){
    const c = content();
    $("#platforms-title").textContent = c.platforms.title;
    const grid = $("#platforms-grid");
    grid.innerHTML = "";
    c.platforms.cards.forEach(p=>{
      const card = document.createElement("div");
      card.className="card";
      card.innerHTML = `
        <div class="kv"><span class="badge"><i></i>${p.tag}</span></div>
        <h3 style="margin:10px 0 8px; font-size:18px">${p.name}</h3>
        <div style="color:var(--muted); line-height:1.6">${p.desc}</div>
        <hr class="sep" />
        <div class="list">
          ${p.points.map(x=>`<div class="li"><div class="dot"></div><div>${x}</div></div>`).join("")}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderImplementations(){
    const c = content();
    $("#impl-title").textContent = c.implementations.title;
    $("#impl-text").textContent = c.implementations.text;

    const th = $("#impl-head");
    const tb = $("#impl-body");
    th.innerHTML = "";
    tb.innerHTML = "";

    c.implementations.table.head.forEach(h=>{
      const el = document.createElement("th");
      el.textContent = h;
      th.appendChild(el);
    });

    c.implementations.table.rows.forEach(r=>{
      const tr = document.createElement("tr");
      r.forEach(cell=>{
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
  }

  function renderTechnology(){
    const c = content();
    $("#tech-title").textContent = c.technology.title;
    $("#tech-text").textContent = c.technology.text;
    const kv = $("#tech-badges");
    kv.innerHTML = "";
    c.technology.badges.forEach(b=>{
      const span = document.createElement("span");
      span.className = "badge";
      span.innerHTML = `<i></i>${b}`;
      kv.appendChild(span);
    });
  }

  function renderServices(){
    const c = content();
    $("#svc-title").textContent = c.services.title;
    $("#svc-text").textContent = c.services.text;
    const grid = $("#svc-grid");
    grid.innerHTML = "";
    c.services.cards.forEach(s=>{
      const card = document.createElement("div");
      card.className="card";
      card.innerHTML = `<h3 style="margin:0 0 8px; font-size:18px">${s.t}</h3>
        <div style="color:var(--muted); line-height:1.6">${s.d}</div>`;
      grid.appendChild(card);
    });
  }

  function renderInsights(){
    const c = content();
    $("#ins-title").textContent = c.insights.title;
    $("#ins-text").textContent = c.insights.text;
    const grid = $("#ins-grid");
    grid.innerHTML = "";
    c.insights.topics.forEach(t=>{
      const card = document.createElement("div");
      card.className="card";
      card.innerHTML = `<div class="li"><div class="dot"></div><div>${t}</div></div>`;
      grid.appendChild(card);
    });
  }

  function renderContact(){
    const c = content();
    $("#ct-title").textContent = c.contact.title;
    $("#ct-text").textContent = c.contact.text;
    $("#ct-note").textContent = c.contact.note;

    $("#f-name").placeholder = c.contact.form.name;
    $("#f-org").placeholder = c.contact.form.org;
    $("#f-email").placeholder = c.contact.form.email;
    $("#f-phone").placeholder = c.contact.form.phone;
    $("#f-msg").placeholder = c.contact.form.msg;
    $("#f-send").textContent = c.contact.form.send;

    $("#footer-line1").textContent = c.footer.line1;
    $("#footer-line2").textContent = c.footer.line2;
  }

  function render(){
    renderNav();
    renderHero();
    renderWhy();
    renderStats();
    renderPlatforms();
    renderImplementations();
    renderTechnology();
    renderServices();
    renderInsights();
    renderContact();
    setActiveLangButtons();

    // Update tiny labels
    $("#brand-sub").textContent = state.lang === "en"
      ? "Health Information Systems"
      : "Sisteme Informative Shëndetësore";
  }

  // Wire toggle
  document.addEventListener("click", (e)=>{
    const b = e.target.closest("button[data-lang]");
    if(b) setLang(b.dataset.lang);
  });

  // Demo CTA actions (placeholders)
  function toast(msg){
    const n = $("#toast");
    n.textContent = msg;
    n.style.display="block";
    clearTimeout(window.__t);
    window.__t=setTimeout(()=>{n.style.display="none"}, 2400);
  }

  document.addEventListener("click",(e)=>{
    const a = e.target.closest("a[data-action]");
    if(!a) return;
    e.preventDefault();
    const c = content();
    if(a.dataset.action==="demo") toast(state.lang==="en" ? "Demo request (placeholder)." : "Kërkesë demo (placeholder).");
    if(a.dataset.action==="sales") toast(state.lang==="en" ? "Sales contact (placeholder)." : "Kontakt shitjesh (placeholder).");
  });

  // Fake form submit
  $("#contact-form")?.addEventListener("submit",(e)=>{
    e.preventDefault();
    toast(state.lang==="en" ? "Message sent (demo)." : "Mesazhi u dërgua (demo).");
    e.target.reset();
  });

  // Initial render
  render();
})();