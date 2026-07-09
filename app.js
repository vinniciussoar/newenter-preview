// ---------- NAVBAR ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll',()=>{ nav.classList.toggle('scrolled', window.scrollY>40); }, {passive:true});
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click',()=>{
  const open = nav.classList.toggle('mobile-open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('#navLinks a').forEach(a=> a.addEventListener('click',()=> nav.classList.remove('mobile-open')));

// ---------- REVEAL ----------
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// stagger automático em grids
document.querySelectorAll('.dor-grid,.result-grid').forEach(grid=>{
  [...grid.children].forEach((c,i)=>{ if(!c.classList.contains('reveal')){ c.classList.add('reveal'); } c.style.transitionDelay=(i*0.06)+'s'; io.observe(c); });
});

// ---------- KPI bars + count-up (console) ----------
const consoleObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    e.target.querySelectorAll('.kpi-bar i').forEach(bar=>{ bar.style.width = bar.dataset.fill; });
    e.target.querySelectorAll('.kpi-val[data-count]').forEach(el=> countUp(el, parseInt(el.dataset.count)));
    consoleObs.unobserve(e.target);
  });
},{threshold:0.4});
document.querySelectorAll('.console').forEach(c=> consoleObs.observe(c));

// ---------- count-up genérico ----------
function countUp(el, target, suffix){
  const span = el.querySelector('span');
  const dur = 1300, t0 = performance.now();
  function tick(now){
    const p = Math.min((now-t0)/dur, 1);
    const val = Math.round((1-Math.pow(1-p,3)) * target);
    el.childNodes[0].nodeValue = val;
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// autoridade stats count-up
const statObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    e.target.querySelectorAll('.n[data-count]').forEach(el=>{
      const target = parseInt(el.dataset.count), dur=1200, t0=performance.now();
      function tick(now){ const p=Math.min((now-t0)/dur,1); el.textContent = Math.round((1-Math.pow(1-p,3))*target); if(p<1) requestAnimationFrame(tick); }
      requestAnimationFrame(tick);
    });
    statObs.unobserve(e.target);
  });
},{threshold:0.5});
document.querySelectorAll('.aut-stats').forEach(s=> statObs.observe(s));

// ---------- ONE BUSINESS BOARD connectors ----------
function drawBoardLines(){
  const svg = document.getElementById('boardLinks');
  const stage = document.querySelector('.board-stage');
  const core = document.querySelector('.board-core');
  if(!svg || !stage || !core) return;
  if(window.innerWidth <= 960){ return; }
  const sb = stage.getBoundingClientRect();
  const cb = core.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${sb.width} ${sb.height}`);
  // limpa linhas antigas (mantém defs)
  [...svg.querySelectorAll('line,circle')].forEach(n=> n.remove());
  const coreLeftX = cb.left - sb.left;
  const coreRightX = cb.right - sb.left;
  const ns='http://www.w3.org/2000/svg';
  document.querySelectorAll('.pillar').forEach(p=>{
    const pb = p.getBoundingClientRect();
    const side = p.dataset.port;
    const py = pb.top - sb.top + pb.height/2;
    const px = side==='left' ? (pb.right - sb.left) : (pb.left - sb.left);
    const cx = side==='left' ? coreLeftX : coreRightX;
    const cy = Math.max(cb.top - sb.top + 24, Math.min(py, cb.bottom - sb.top - 24));
    const line = document.createElementNS(ns,'line');
    line.setAttribute('x1', px); line.setAttribute('y1', py);
    line.setAttribute('x2', cx); line.setAttribute('y2', cy);
    svg.appendChild(line);
    const dot = document.createElementNS(ns,'circle');
    dot.setAttribute('cx', px); dot.setAttribute('cy', py); dot.setAttribute('r', 3);
    svg.appendChild(dot);
    requestAnimationFrame(()=> line.classList.add('on'));
  });
}
const boardObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ drawBoardLines(); } });
},{threshold:0.3});
const boardStage = document.querySelector('.board-stage');
if(boardStage) boardObs.observe(boardStage);
let rt; window.addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(drawBoardLines,160); });
window.addEventListener('load', drawBoardLines);

// ---------- FAQ ----------
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item = btn.parentElement;
    const willOpen = !item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{
      i.classList.remove('open');
      const q = i.querySelector('.faq-q'); if(q) q.setAttribute('aria-expanded','false');
    });
    if(willOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  });
});

// ---------- DIAGNÓSTICO TRIBUTÁRIO (vende inteligência, não economia) ----------
// Máscara de moeda: mantém apenas dígitos (sanitização da entrada)
function mascaraReais(el){
  let v = el.value.replace(/\D/g,'');
  if(!v){ el.value=''; return; }
  v = (parseInt(v)/100).toFixed(2).replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  el.value = v;
}
const _diagFat = document.getElementById('diagFat');
if(_diagFat) _diagFat.addEventListener('input', e=> mascaraReais(e.target));

// Submit do formulário: validação nativa do HTML5 primeiro, depois gera o diagnóstico
const diagForm = document.getElementById('diagForm');
if(diagForm){
  diagForm.addEventListener('submit', e=>{
    e.preventDefault();
    if(!diagForm.checkValidity()){ diagForm.reportValidity(); return; }
    gerarDiagnostico();
  });
}

function gerarDiagnostico(){
  const fatStr = document.getElementById('diagFat').value;
  const regime = document.getElementById('diagRegime').value;
  const setor  = document.getElementById('diagSetor').value;
  const estagio= document.getElementById('diagEstagio').value;
  if(!fatStr || !regime || !setor || !estagio) return; // guarda defensiva

  // Índice de eficiência: parte de uma base e penaliza fatores de risco/oportunidade.
  let indice = 78;
  const pontos = [];

  if(regime==='real'){ indice += 4; }
  else if(regime==='presumido'){ indice -= 8; pontos.push('Lucro Presumido frequentemente deixa créditos e enquadramentos não aproveitados — há margem para revisão.'); }
  else if(regime==='simples'){ indice -= 6; pontos.push('Empresas em crescimento no Simples Nacional costumam atingir o limite de eficiência do regime — convém reavaliar o enquadramento.'); }
  else { indice -= 14; pontos.push('A indefinição sobre o regime atual é, por si só, um indicador de baixa governança tributária.'); }

  if(setor==='exterior'){ indice -= 9; pontos.push('Operações de comércio exterior concentram oportunidades em regimes aduaneiros e benefícios fiscais raramente capturados na totalidade.'); }
  else if(setor==='hotelaria'){ indice -= 7; pontos.push('Empreendimentos hoteleiros exigem controladoria setorial específica (pool, A&B, Lucro Real) para revelar a eficiência real.'); }
  else if(setor==='holding'){ indice -= 8; pontos.push('Holdings e family offices demandam estruturação societária e sucessória para proteger patrimônio e eficiência fiscal.'); }
  else if(setor==='grupo'){ indice -= 10; pontos.push('Grupos empresariais tendem a acumular ineficiências entre as empresas por falta de visão consolidada.'); }

  if(estagio==='expansao'){ indice -= 6; pontos.push('Em fase de expansão, a estrutura tributária e de governança raramente acompanha o ritmo do crescimento.'); }
  else if(estagio==='grupo'){ indice -= 8; pontos.push('Múltiplas empresas sem leitura única ampliam o risco de exposição e de decisões descoordenadas.'); }
  else if(estagio==='estrut'){ indice -= 4; pontos.push('A estruturação inicial é o momento de maior retorno para desenhar a base tributária e de compliance corretamente.'); }

  indice = Math.max(46, Math.min(94, indice));

  // headline + sub + reforço por faixa (todas conduzem ao Diagnóstico Executivo)
  let headline, sub, reforco;
  if(indice >= 82){
    headline = 'Operação madura — pronta para governança de alto nível';
    sub = 'Estruturas sólidas são as que mais ganham com uma leitura independente: validação de riscos, blindagem patrimonial e preparação para crescimento, captação ou sucessão.';
    reforco = [
      'Eficiência aparente não elimina contingências ocultas — uma validação independente confirma onde há exposição.',
      'Operações consolidadas devem revisar a estrutura societária com foco em sucessão, M&A ou captação.',
      'Empresas lucrativas e bem estruturadas são alvo prioritário de fiscalização — a blindagem preventiva é estratégica.'
    ];
  } else if(indice >= 68){
    headline = 'Eficiência parcial — oportunidades relevantes não capturadas';
    sub = 'Há margem consistente de otimização fiscal e de controle a ser destravada com estrutura e governança.';
    reforco = [
      'Existe otimização fiscal ainda não capturada na estrutura atual.',
      'A integração de controladoria e compliance reduz exposição e amplia a previsibilidade.',
      'Recomenda-se revisão de exposição trabalhista e de obrigações acessórias.'
    ];
  } else {
    headline = 'Indicadores de exposição — estruturação prioritária';
    sub = 'O cenário sugere risco e ineficiência que merecem um diagnóstico aprofundado com prioridade.';
    reforco = [
      'O enquadramento atual tende a gerar custo tributário e risco acima do necessário.',
      'A ausência de visão integrada amplia a exposição a passivos fiscais e trabalhistas.',
      'A prioridade é estruturar base tributária, controles e governança antes de crescer.'
    ];
  }

  document.getElementById('diagHeadline').textContent = headline;
  document.getElementById('diagSub').textContent = sub;

  // pontos: contexto específico + reforço da faixa (sempre 3–4, nunca vazio)
  let listaPontos = (indice >= 82) ? reforco : pontos.concat(reforco);
  listaPontos = [...new Set(listaPontos)].slice(0, 4);

  const ul = document.getElementById('diagPoints');
  ul.innerHTML = '';
  listaPontos.forEach(p=>{
    const li = document.createElement('li');
    li.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2L3 6v6c0 5 9 10 9 10s9-5 9-10V6z"/></svg>' + p;
    ul.appendChild(li);
  });

  // CTA whatsapp executivo
  const msg = encodeURIComponent('Olá. Realizei a análise preliminar de eficiência tributária no site (índice estimado: '+indice+'/100) e gostaria de solicitar um Diagnóstico Executivo completo.');
  document.getElementById('diagCta').href = 'https://wa.me/55XXXXXXXXXXX?text=' + msg;

  // mostra + anima gauge e número
  const result = document.getElementById('diagResult');
  result.classList.add('show');
  const circ = 2 * Math.PI * 54; // 339.292
  const fill = document.getElementById('gaugeFill');
  fill.setAttribute('stroke-dasharray', circ.toFixed(3));
  requestAnimationFrame(()=>{ fill.setAttribute('stroke-dashoffset', (circ*(1 - indice/100)).toFixed(3)); });
  // número
  const numEl = document.getElementById('gaugeNum');
  const dur=1200, t0=performance.now();
  (function tick(now){ const p=Math.min((now-t0)/dur,1); numEl.textContent = Math.round((1-Math.pow(1-p,3))*indice); if(p<1) requestAnimationFrame(tick); })(performance.now());

  setTimeout(()=> result.scrollIntoView({behavior:'smooth', block:'center'}), 120);
}

// ---------- COOKIES / MODAL ----------
function aceitarCookies(){ localStorage.setItem('ne_cookies','all'); document.getElementById('cookie').classList.remove('show'); }
function recusarCookies(){ localStorage.setItem('ne_cookies','essential'); document.getElementById('cookie').classList.remove('show'); }
function abrirPrivacidade(){ const m=document.getElementById('modalPriv'); m.classList.add('open'); m.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; const c=m.querySelector('.modal-close'); if(c) c.focus(); }
function fecharPrivacidade(){ const m=document.getElementById('modalPriv'); m.classList.remove('open'); m.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

// Delegação de ações — substitui os onclick inline (CSP-friendly)
document.addEventListener('click', e=>{
  const t = e.target.closest('[data-action]');
  if(!t) return;
  switch(t.dataset.action){
    case 'open-privacy':   e.preventDefault(); abrirPrivacidade(); break;
    case 'close-privacy':  fecharPrivacidade(); break;
    case 'accept-cookies': aceitarCookies(); break;
    case 'reject-cookies': recusarCookies(); break;
  }
});
// Teclado para gatilhos com role="button" (Enter / Espaço)
document.addEventListener('keydown', e=>{
  if((e.key==='Enter' || e.key===' ') && e.target.matches && e.target.matches('[data-action][role="button"]')){ e.preventDefault(); e.target.click(); }
});

document.getElementById('modalPriv').addEventListener('click',function(e){ if(e.target===this) fecharPrivacidade(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape') fecharPrivacidade(); });
window.addEventListener('load',()=>{ if(!localStorage.getItem('ne_cookies')){ setTimeout(()=> document.getElementById('cookie').classList.add('show'), 1400); } });

// ---------- FORMULÁRIO DE CONTATO (Formspree) ----------
const contactForm = document.getElementById('contactForm');
if(contactForm){
  const cfStatus = document.getElementById('cfStatus');
  const cfBtn = contactForm.querySelector('.cf-submit');

  // Telefone: filtra letras/símbolos em tempo real (só dígitos, espaço, parênteses, + e -)
  const cfTelefone = document.getElementById('cfTelefone');
  if(cfTelefone) cfTelefone.addEventListener('input', e=>{
    e.target.value = e.target.value.replace(/[^0-9()+\-\s]/g, '');
  });

  function cfShowStatus(kind, msg){
    cfStatus.textContent = msg;
    cfStatus.className = 'cf-status show ' + kind;
  }

  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(!contactForm.checkValidity()){ contactForm.reportValidity(); return; }

    const endpoint = contactForm.getAttribute('action');
    if(!endpoint || endpoint.includes('SEU_FORM_ID')){
      cfShowStatus('err', 'Formulário ainda não configurado. Fale conosco pelo WhatsApp acima.');
      return;
    }

    cfBtn.disabled = true;
    const textoOriginal = cfBtn.innerHTML;
    cfBtn.innerHTML = 'Enviando…';

    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if(res.ok){
        cfShowStatus('ok', 'Mensagem enviada. Em breve entraremos em contato.');
        contactForm.reset();
      } else {
        cfShowStatus('err', 'Não foi possível enviar agora. Tente novamente ou use o WhatsApp acima.');
      }
    } catch(err){
      cfShowStatus('err', 'Falha de conexão. Tente novamente ou use o WhatsApp acima.');
    } finally {
      cfBtn.disabled = false;
      cfBtn.innerHTML = textoOriginal;
    }
  });
}

