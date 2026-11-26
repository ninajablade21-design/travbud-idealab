import { createClient } from '@supabase/supabase-js';
import './style.css';

const env = import.meta.env;
const IDEALAB_URL = 'https://ninajablade21-design.github.io/travbud-idealab/';
const supabase = env.VITE_SUPABASE_URL && env.VITE_SUPABASE_PUBLISHABLE_KEY
  ? createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } })
  : null;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categories = [
  ['booking','Booking & planning'],['mobility','Mobility & connections'],
  ['accessibility','Accessibility & inclusion'],['group-travel','Group travel'],
  ['payments','Payments & pricing'],['safety','Safety & trust'],['other','Something else']
];

const audiences = ['Everyday commuters','Tourists','Students','Families','Older travellers','People with disabilities','Business travellers','Group travellers','Everyone'];
const impacts = ['Nice to have','Useful','Very important','Essential'];
const transports = ['Bus','Train','Flight','Taxi / cab','Private vehicle','Walk / cycle','Ferry'];
const problemList = ['Finding reliable routes','Unclear schedules / delays','Booking across platforms','High / hidden costs','Last-mile connectivity','Safety concerns','Accessibility / mobility','Language barriers','Luggage management','Poor internet / no signal','Crowding / availability','Travel with children / elders','Group coordination','Weather / disruptions'];
const improvementList = ['One place for all transport','Live tracking and alerts','Accurate journey planner','Transparent price comparison','Accessibility-first planning','Group trip planning','Offline travel assistant','Safer travel tools','AI travel assistant','First / last-mile rides','Easy booking and tickets','Cargo / luggage support'];
const opts = (list, ph) => `<option value="">${ph}</option>` + list.map(v => `<option>${v}</option>`).join('');
const chips = (name, list) => `<div class="chips">${list.map(v => `<label class="chip"><input type="checkbox" name="${name}" value="${v}"><span>${v}</span></label>`).join('')}</div>`;

$('#app').innerHTML = `
<header class="site-header">
  <a class="brand" href="#top" aria-label="TravBud IdeaLab home"><span class="brand-mark">✳</span><span>travbud <i>idealab</i></span></a>
  <button class="mobile-menu-toggle" id="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation">☰</button>
  <nav class="site-nav" id="site-nav" aria-label="Main navigation">
    <a href="#home" data-page="home">Home</a><a href="#explore" data-page="explore">Explore</a><a href="#videos" data-page="videos">Videos</a><a href="#survey" data-page="survey">Survey</a><a href="#idea" data-page="idea">Share an idea</a><a href="#privacy" data-page="privacy">Privacy</a>
    <button class="team-link mobile-team-link" id="mobile-admin-open" type="button">Team sign in ↗</button>
  </nav>
  <button class="team-link desktop-team-link" id="admin-open" type="button">Team sign in <span>↗</span></button>
</header>
<main id="top">
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow"><span class="eyebrow-dot"></span> THE TRAVBUD INNOVATION LAB</p>
      <h1>Travel has a<br>better <em>way.</em></h1>
      <p class="hero-lead">We're shaping TravBud before launch. Tell us what makes travelling difficult, what you wish existed, and what would make your next journey feel easier.</p>
      <a class="primary share-idea-cta" href="#submit"><span class="share-idea-icon" aria-hidden="true">💡</span><span class="share-idea-label">Share your idea</span><span class="share-idea-arrow" aria-hidden="true">↗</span></a>
      <div class="privacy-inline"><span class="lock">✳</span><span><b>Private IdeaLab submissions</b><br>Your ideas and survey answers are visible only to authorised TravBud admins.</span></div>
    </div>
    <div class="hero-art" aria-label="Abstract illustration of connected travel routes">
      <div class="art-orbit orbit-a"></div><div class="art-orbit orbit-b"></div><div class="art-route"></div>
      <div class="art-node node-a"></div><div class="art-node node-b"></div><div class="art-node node-c"></div>
      <div class="art-panel"><span>IDEAS IN MOTION</span><strong>Listen.<br><em>Imagine.</em><br>Build better.</strong><small>Every better journey starts with a question.</small></div>
      <div class="art-stamp">✳ &nbsp; BUILT TOGETHER</div>
    </div>
  </section>
  <div class="ticker"><span>REAL TRAVEL PROBLEMS</span><b>✳</b><span>USEFUL IDEAS</span><b>✳</b><span>ACCESS FOR EVERYONE</span><b>✳</b><span>BETTER JOURNEYS</span><b>✳</b><span>REAL TRAVEL PROBLEMS</span></div>
  <section id="community" class="community-section section-shell"><div class="community-heading"><div><p class="eyebrow">🔒 PRIVATE IDEA LAB</p><h2>Your voice stays <em>private.</em></h2></div><p>Ideas and traveller survey responses are stored securely and can only be accessed by authorised TravBud team administrators. Nothing is published to a public community feed.</p></div><div id="community-feed" class="community-feed"><article class="community-card"><span class="category-tag">PRIVATE BY DEFAULT</span><h3>Only the TravBud team can view submissions</h3><p>Share your ideas and travel experiences with confidence. Your name and contact details are handled privately.</p></article></div></section>
  <section id="why" class="intro section-shell">
    <div><p class="eyebrow">💫 01 / WHY IDEALAB EXISTS</p><h2>A private place to<br><em>shape what's next.</em></h2></div>
    <div class="intro-copy"><p>TravBud is still being shaped. Before we build more, we want to understand the real-world challenges people face when planning, booking and taking trips.</p><p>IdeaLab is a private channel between travellers and the people building TravBud. Share the small frustrations, big barriers and ambitious ideas. Our team will read every submission and use the patterns to guide what we build.</p><div class="principle"><span>01</span> Listen before we build <span>02</span> Design for real people</div></div>
  </section>
  <section id="focus" class="focus-section">
    <div class="section-shell"><p class="eyebrow">🧭 02 / WHAT WE WANT TO UNDERSTAND</p><div class="focus-heading"><h2>Where could travel<br>work <em>better?</em></h2><p>You don't need a perfect solution. Tell us what gets in your way — we'll explore the possibilities together.</p></div>
      <div class="focus-grid">
        <article class="focus-card"><span class="focus-num">01</span><div class="focus-icon">↗</div><h3>Planning without friction</h3><p>What's confusing, time-consuming or missing when comparing routes and planning a trip?</p><span class="focus-tag">BOOKING & PLANNING</span></article>
        <article class="focus-card"><span class="focus-num">02</span><div class="focus-icon">⇄</div><h3>Connected journeys</h3><p>Where do transfers, first-mile and last-mile connections make a journey harder?</p><span class="focus-tag">MOBILITY & CONNECTIONS</span></article>
        <article class="focus-card"><span class="focus-num">03</span><div class="focus-icon">◎</div><h3>Travel for everyone</h3><p>What accessibility barriers or support needs are overlooked in today's travel tools?</p><span class="focus-tag">ACCESSIBILITY & INCLUSION</span></article>
        <article class="focus-card"><span class="focus-num">04</span><div class="focus-icon">⌘</div><h3>Better group travel</h3><p>How could coordinating people, preferences, budgets and plans become simpler?</p><span class="focus-tag">GROUP TRAVEL</span></article>
        <article class="focus-card"><span class="focus-num">05</span><div class="focus-icon">₹</div><h3>Clear costs & confidence</h3><p>What would make prices, payments, safety and travel decisions more transparent?</p><span class="focus-tag">PRICING & TRUST</span></article>
        <article class="focus-card idea-card"><span class="focus-num">06</span><div class="focus-icon">✳</div><h3>Your idea, your angle</h3><p>Something else entirely? Tell us what TravBud should consider that we haven't thought of yet.</p><span class="focus-tag">OPEN INNOVATION</span></article>
      </div>
    </div>
  </section>
  <section id="films" class="films-section">
    <div class="section-shell">
      <p class="eyebrow">🎬 02 / SEE THE VISION</p>
      <div class="films-heading"><h2>Ideas become<br><em>real journeys.</em></h2><p>Watch the TravBud journey concept and the campaign film. Both videos are served from the site's own assets.</p></div>
      <div class="films-grid">
        <article class="film-card film-feature">
          <div class="film-frame"><video controls playsinline preload="metadata" aria-label="TravBud door-to-door planning video" data-video-src="${import.meta.env.BASE_URL}videos/viraldub-travbud-plan-door-to-door.mp4">Your browser does not support HTML video.</video></div>
          <div class="film-meta"><span>01 / DOOR-TO-DOOR PLANNING</span><h3>Plan the whole journey</h3><p>Explore the TravBud idea for connected door-to-door travel planning.</p></div>
        </article>
        <article class="film-card">
          <div class="film-frame"><video controls playsinline preload="metadata" aria-label="TravBud campaign film with music" data-video-src="${import.meta.env.BASE_URL}videos/travbud-ad-with-music.mp4">Your browser does not support HTML video.</video></div>
          <div class="film-meta"><span>02 / CAMPAIGN FILM</span><h3>TravBud in motion</h3><p>The TravBud campaign film, with its original music.</p></div>
        </article>
      </div>
    </div>
  </section>
  <section class="process section-shell">
    <div><p class="eyebrow">🚀 03 / WHAT HAPPENS NEXT</p><h2>Your idea goes<br>somewhere <em>useful.</em></h2></div>
    <div class="process-steps"><div class="step"><span>01</span><div><h3>You share</h3><p>Describe the problem, idea or experience in your own words.</p></div></div><div class="step"><span>02</span><div><h3>Our team listens</h3><p>Your submission goes into a private team inbox for review and discussion.</p></div></div><div class="step"><span>03</span><div><h3>We look for patterns</h3><p>We group related needs and consider what could make the biggest difference.</p></div></div><div class="step"><span>04</span><div><h3>TravBud gets better</h3><p>Insights help shape priorities and future product decisions. Not every idea can be promised, but every idea can inform the conversation.</p></div></div></div>
  </section>
  <section id="survey" class="submit-section">
    <div class="submit-shell">
      <div class="submit-intro"><p class="eyebrow">📋 03 / TRAVELLER SURVEY</p><h2>Tell us about<br>your <em>journeys.</em></h2><p>⏱️ Takes 3 to 5 minutes. Your answers are private and can only be viewed by authorised TravBud team administrators.</p></div>
      <form id="survey-form" class="idea-form">
        <div class="form-heading"><span>🧭 TRAVELLER SURVEY</span><span>🔒 PRIVATE TEAM INBOX</span></div>
        <label for="sv-freq">How often do you travel?</label><select id="sv-freq">${opts(['Daily / commuting','Weekly','Monthly','Few times a year','Rarely'],'Choose one')}</select>
        <label for="sv-purpose">Main reason for travel</label><select id="sv-purpose">${opts(['Work / business','Education','Tourism / holidays','Family / personal','Medical','Other'],'Choose one')}</select>
        <label>Transport you use most <span class="optional">SELECT ALL THAT APPLY</span></label>${chips('transport', transports)}
        <label>What makes travelling difficult? <span class="optional">SELECT ALL THAT APPLY</span></label>${chips('problems', problemList)}
        <label for="sv-pfreq">How often do these problems happen?</label><select id="sv-pfreq">${opts(['Almost every trip','Often','Sometimes','Rarely'],'Choose one')}</select>
        <label for="sv-sev">How much do they affect you?</label><select id="sv-sev">${opts(['1 — Slight inconvenience','2 — Minor','3 — Moderate','4 — Serious','5 — Journey becomes difficult'],'Choose one')}</select>
        <label for="sv-story">Tell us about a specific difficult journey</label><textarea id="sv-story" maxlength="3000" rows="4" placeholder="What happened? What did you wish was available?"></textarea>
        <label>Which improvements matter most? <span class="optional">UP TO 5</span></label>${chips('improvements', improvementList)}
        <label for="sv-missing">What is missing from travel apps today?</label><textarea id="sv-missing" maxlength="3000" rows="3" placeholder="A feature or service you wish existed…"></textarea>
        <label for="sv-age">Age range <span class="optional">OPTIONAL</span></label><select id="sv-age">${opts(['Under 18','18–24','25–34','35–44','45–59','60+'],'Prefer not to say')}</select>
        <label for="sv-region">Country / region <span class="optional">OPTIONAL</span></label><input id="sv-region" maxlength="80" placeholder="e.g. India, Kerala">
        <label for="sv-email">Email <span class="optional">OPTIONAL · FOR FOLLOW-UP</span></label><input id="sv-email" type="email" maxlength="254" placeholder="you@example.com">
        <label class="consent-row required-consent"><input type="checkbox" id="sv-consent" required><span><b>🔒 I understand my answers are private and available only to authorised TravBud admins. <sup>*</sup></b><small>Your responses will not be published publicly. Do not include passwords, payment details or other highly sensitive information.</small></span></label>
        <button class="primary submit-button" type="submit">Send survey <span>↗</span></button><p class="form-feedback" id="sv-feedback" role="status" aria-live="polite"></p>
      </form>
    </div>
  </section>
  <section id="submit" class="submit-section">
    <div class="submit-shell">
      <div class="submit-intro"><p class="eyebrow">💡 SHARE AN IDEA</p><h2>Help shape<br><em>better journeys.</em></h2><p>Share a challenge you've faced or an idea that could make travelling simpler, more connected or more inclusive.</p><div class="private-card"><span>✳</span><div><b>Private submission</b><small>Your name, idea title, category and idea text are visible only to authorised TravBud admins. Your email and device details stay private too.</small></div></div></div>
      <form id="idea-form" class="idea-form">
        <div class="form-heading"><span>💡 IDEA SUBMISSION</span><span>PRIVATE TEAM INBOX · 01</span></div>
        <label for="submitter-name">Your name <sup>*</sup></label><input id="submitter-name" name="submitter_name" required minlength="2" maxlength="80" autocomplete="name" placeholder="How should we address you?">
        <label for="idea-category">Which area does this relate to? <sup>*</sup></label><select id="idea-category" name="category" required><option value="">Choose a topic</option>${categories.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>
        <label for="idea-audience">Who benefits most? <span class="optional">OPTIONAL</span></label><select id="idea-audience">${opts(audiences,'Choose audience')}</select>
        <label for="idea-impact">How important is it? <span class="optional">OPTIONAL</span></label><select id="idea-impact">${opts(impacts,'Choose one')}</select>
        <label for="idea-title">Give your idea a title <sup>*</sup></label><input id="idea-title" name="title" required minlength="4" maxlength="120" placeholder="e.g. Make multi-stop planning easier">
        <label for="idea-details">Tell us more <sup>*</sup></label><textarea id="idea-details" name="details" required minlength="10" maxlength="5000" rows="6" placeholder="What happened? What would you change? Who would this help? Add as much context as you like."></textarea><div class="char-count" id="char-count">0 / 5000</div>
        <label for="idea-email">Email <span class="optional">OPTIONAL · FOR FOLLOW-UP</span></label><input id="idea-email" name="email" type="email" maxlength="254" autocomplete="email" placeholder="you@example.com">
        <label class="consent-row"><input type="checkbox" id="consent-device" name="consent_device_data"><span><b>Allow basic device context (optional)</b><small>If selected, we'll include browser and screen-size details to help diagnose technical issues. No precise location or device fingerprint is collected.</small></span></label>
        <label class="consent-row required-consent"><input type="checkbox" id="privacy-consent" required><span><b>I understand this idea will be shared privately with authorised TravBud admins. <sup>*</sup></b><small>My submission will not be published publicly. I will not include passwords, payment details or other highly sensitive information.</small></span></label>
        <button class="primary submit-button" type="submit">Send my idea <span>↗</span></button><p class="form-feedback" id="form-feedback" role="status" aria-live="polite"></p><p class="form-footnote">Required fields are marked *. Please don't include passwords, payment details or other sensitive personal information.</p>
      </form>
    </div>
  </section>
  <section class="closing section-shell"><p class="eyebrow">🌍 TRAVBUD IDEALAB</p><h2>Better journeys don't<br>happen by <em>accident.</em></h2><p>They happen when we listen to the people taking them.</p><a href="#submit" class="text-link">Add your voice <span>↗</span></a></section>
</main>
<footer><a class="brand" href="#top"><span class="brand-mark">✳</span><span>travbud <i>idealab</i></span></a><span>LISTEN FIRST. BUILD BETTER.</span><button id="footer-team" class="footer-team">Private team access ↗</button></footer>
<div class="modal" id="admin-modal" aria-hidden="true" inert><div class="dialog"><button id="admin-close" class="close" aria-label="Close">×</button><p class="eyebrow">PRIVATE TEAM WORKSPACE</p><h2>IdeaLab inbox</h2><p class="dialog-copy">Private administrator access. Sign in with an authorised team account.</p><div class="team-auth-tabs" role="tablist" aria-label="Team sign-in method"><button type="button" class="team-auth-tab active" id="tab-password" role="tab" aria-selected="true" aria-controls="password-login">Password</button><button type="button" class="team-auth-tab" id="tab-link" role="tab" aria-selected="false" aria-controls="link-login">Email link</button></div><form id="password-login" class="team-auth-form"><label for="password-email">Work email address</label><input id="password-email" type="email" required autocomplete="username" placeholder="name@company.com"><label for="team-password">Password</label><input id="team-password" type="password" required autocomplete="current-password" placeholder="Your team password"><button class="primary" type="submit">Sign in to private inbox <span aria-hidden="true">↗</span></button></form><form id="link-login" class="team-auth-form" hidden><label for="admin-email">Work email address</label><input id="admin-email" type="email" required autocomplete="email" placeholder="name@company.com"><button class="primary" type="submit">Email me a secure sign-in link <span aria-hidden="true">↗</span></button></form><p id="admin-message" class="admin-message" role="status" aria-live="polite"></p><div id="admin-dashboard" hidden>
<nav class="admin-tabs" aria-label="Admin dashboard sections">
<button class="admin-tab active" data-admin-tab="overview">Overview</button>
<button class="admin-tab" data-admin-tab="ideas">Community ideas</button>
<button class="admin-tab" data-admin-tab="surveys">Survey responses</button>
<button class="admin-tab" data-admin-tab="insights">Reports & insights</button>
<button class="admin-tab" data-admin-tab="settings">Admin settings</button>
</nav>
<section class="admin-panel active" data-admin-panel="overview"><div class="admin-summary" id="admin-summary"></div><h3>Latest activity</h3><div id="admin-overview-rows" class="admin-rows"></div></section>
<section class="admin-panel" data-admin-panel="ideas"><div class="admin-panel-heading"><div><h3>Community ideas</h3><p>Review, update, export or permanently remove private submissions.</p></div><div class="admin-export"><button class="outline-btn" data-export="csv">Export CSV</button><button class="outline-btn" data-export="json">Export JSON</button></div></div><div id="admin-rows" class="admin-rows"></div></section>
<section class="admin-panel" data-admin-panel="surveys"><div class="admin-panel-heading"><div><h3>Survey responses</h3><p>Private answers and moderation controls for authorised administrators.</p></div></div><div id="admin-survey-rows" class="admin-rows"></div></section>
<section class="admin-panel" data-admin-panel="insights"><div id="admin-insights" class="admin-insights"></div></section>
<section class="admin-panel" data-admin-panel="settings"><h3>Admin settings</h3><p>Only authorised administrator accounts can access this workspace. Never share credentials or access keys.</p><p>Moderation actions are recorded in the private audit log.</p><button id="admin-logout" class="outline-btn">Sign out</button></section>
</div></div></div>
<div class="community-detail" id="community-detail" aria-hidden="true"><div class="community-detail-panel" role="dialog" aria-modal="true" aria-labelledby="community-detail-title"><button type="button" class="community-detail-close" id="community-detail-close" aria-label="Close full response">×</button><p class="eyebrow" id="community-detail-kind">COMMUNITY VOICE</p><h2 id="community-detail-title">Full response</h2><div id="community-detail-content" class="community-detail-content"></div></div></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`;

// Convert the long landing page into in-site views. Only the selected view is shown.
const mainView = $('#top');
const viewDefinitions = [
  ['home', 'Home', ['.hero', '.ticker', '.closing']],
  ['explore', 'Explore', ['#why', '#focus', '.process']],
  ['videos', 'Videos', ['#films']],
  ['survey', 'Traveller survey', ['#survey']],
  ['idea', 'Share an idea', ['#submit']],
  ['privacy', 'Privacy', ['#community']]
];
for (const [key, title, selectors] of viewDefinitions) {
  const view = document.createElement('div');
  view.className = 'app-view';
  view.dataset.view = key;
  view.setAttribute('aria-label', title);
  selectors.forEach(selector => {
    const section = mainView.querySelector(selector);
    if (section) view.appendChild(section);
  });
  mainView.appendChild(view);
}
function pageFromHash(hash) {
  const value = (hash || '#home').replace(/^#/, '');
  const aliases = { top: 'home', why: 'explore', focus: 'explore', films: 'videos', survey: 'survey', submit: 'idea', community: 'privacy' };
  const page = aliases[value] || value;
  return viewDefinitions.some(([key]) => key === page) ? page : 'home';
}
function showPage(page, updateHistory = false) {
  const next = viewDefinitions.some(([key]) => key === page) ? page : 'home';
  document.querySelectorAll('.app-view').forEach(view => {
    const active = view.dataset.view === next;
    view.hidden = !active;
    view.setAttribute('aria-hidden', String(!active));
  });
  document.querySelectorAll('.site-nav [data-page]').forEach(link => {
    const active = link.dataset.page === next;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  $('#site-nav').classList.remove('mobile-open');
  $('#mobile-menu-toggle').setAttribute('aria-expanded', 'false');
  $('#mobile-menu-toggle').textContent = '☰';
  if (updateHistory && location.hash !== '#' + next) history.pushState({ page: next }, '', '#' + next);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  event.preventDefault();
  showPage(pageFromHash(hash), true);
});
window.addEventListener('popstate', () => showPage(pageFromHash(location.hash)));
window.addEventListener('hashchange', () => showPage(pageFromHash(location.hash)));
$('#mobile-menu-toggle').addEventListener('click', () => {
  const nav = $('#site-nav');
  const open = !nav.classList.contains('mobile-open');
  nav.classList.toggle('mobile-open', open);
  $('#mobile-menu-toggle').setAttribute('aria-expanded', String(open));
  $('#mobile-menu-toggle').textContent = open ? '×' : '☰';
});
$('#mobile-admin-open').addEventListener('click', openAdmin);
showPage(pageFromHash(location.hash));

const form = $('#idea-form');
$('#idea-details').addEventListener('input', e => $('#char-count').textContent = e.target.value.length + ' / 5000');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const feedback = $('#form-feedback');
  if (!supabase) { feedback.textContent = 'The secure submission service is not connected yet. Please try again later.'; return; }
  const data = new FormData(form);
  const name = String(data.get('submitter_name') || '').trim();
  const title = String(data.get('title') || '').trim();
  const details = String(data.get('details') || '').trim();
  if (name.length < 2 || title.length < 4 || details.length < 10) { feedback.textContent = 'Please complete the required fields before sending.'; return; }
  const consent = $('#consent-device').checked;
  const deviceContext = consent ? { user_agent: navigator.userAgent.slice(0, 300), language: navigator.language || null, screen: { width: screen.width, height: screen.height }, viewport: { width: innerWidth, height: innerHeight } } : {};
  const payload = { submitter_name: name, category: data.get('category'), audience: $('#idea-audience').value || null, impact: $('#idea-impact').value || null, title, details, email: String(data.get('email') || '').trim() || null, consent_device_data: consent, device_context: deviceContext, community_visible: false, status: 'new' };
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true; button.textContent = 'Saving securely…'; feedback.textContent = '';
  let submitError = null;
  try {
    const result = await supabase.from('idea_submissions').insert(payload);
    submitError = result.error;
  } catch (error) {
    submitError = error;
  }
  button.disabled = false; button.innerHTML = 'Send my idea <span>↗</span>';
  if (submitError) {
    console.error('IdeaLab submission failed:', submitError);
    feedback.textContent = 'Your idea was NOT confirmed as saved. Please check your connection and try again. (' + (submitError.code || 'network error') + ')';
    return;
  }
  form.reset(); $('#char-count').textContent = '0 / 5000';
  await loadCommunityIdeas();
  feedback.textContent = 'Thank you. Your idea has been saved privately for the authorised TravBud team.';
  $('#toast').textContent = 'Your private idea submission has been saved.'; $('#toast').classList.add('show');
  window.setTimeout(() => $('#toast').classList.remove('show'), 4500);
});

document.querySelectorAll('[data-access]').forEach(control => control.addEventListener('change', () => document.documentElement.classList.toggle('access-' + control.dataset.access, control.checked)));

const modal = $('#admin-modal');
let adminReturnFocus = null;
function openAdmin(event) {
  if (event?.currentTarget instanceof HTMLElement) adminReturnFocus = event.currentTarget;
  modal.inert = false;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  $('#admin-close').focus();
  if (supabase) checkAdmin();
  else $('#admin-message').textContent = 'Admin service is not connected.';
}
function closeAdmin() {
  if (!modal.classList.contains('open')) return;
  const returnTarget = adminReturnFocus?.isConnected ? adminReturnFocus : $('#admin-open');
  if (modal.contains(document.activeElement)) returnTarget?.focus();
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modal.inert = true;
}
$('#admin-open').onclick = openAdmin;
$('#footer-team').onclick = openAdmin;
$('#admin-close').onclick = closeAdmin;
modal.addEventListener('click', e => { if (e.target === modal) closeAdmin(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeAdmin();
});
function showTeamAuthTab(tab) {
  const password = tab === 'password';
  $('#password-login').hidden = !password;
  $('#link-login').hidden = password;
  $('#tab-password').classList.toggle('active', password);
  $('#tab-link').classList.toggle('active', !password);
  $('#tab-password').setAttribute('aria-selected', String(password));
  $('#tab-link').setAttribute('aria-selected', String(!password));
  $('#admin-message').textContent = '';
}
$('#tab-password').addEventListener('click', () => showTeamAuthTab('password'));
$('#tab-link').addEventListener('click', () => showTeamAuthTab('link'));

$('#password-login').addEventListener('submit', async e => {
  e.preventDefault();
  if (!supabase) return;
  const email = $('#password-email').value.trim().toLowerCase();
  const password = $('#team-password').value;
  const button = $('#password-login button[type="submit"]');
  button.disabled = true; button.textContent = 'Signing in securely…';
  $('#admin-message').textContent = 'Checking your team account…';
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    button.disabled = false; button.textContent = 'Sign in to private inbox ↗';
    if (error) {
      $('#admin-message').textContent = /invalid login credentials/i.test(error.message || '')
        ? 'Email or password is incorrect. Check your details, or use the Email link tab if you need passwordless access.'
        : (error.message || 'Sign-in failed. Please try again.');
      return;
    }
    $('#team-password').value = '';
    $('#admin-message').textContent = 'Signed in. Checking private team access…';
    await checkAdmin();
  } catch (error) {
    button.disabled = false; button.textContent = 'Sign in to private inbox ↗';
    $('#admin-message').textContent = 'Connection issue. Check your internet and try again.';
  }
});

const OTP_COOLDOWN_STORAGE = 'travbud-idealab-otp-next-request';
let otpCooldownInterval = null;
function setOtpCooldown(seconds, message) {
  const until = Date.now() + seconds * 1000;
  try { localStorage.setItem(OTP_COOLDOWN_STORAGE, String(until)); } catch {}
  const button = $('#link-login button[type="submit"]');
  clearInterval(otpCooldownInterval);
  const update = () => {
    const remaining = Math.max(0, Math.ceil((until - Date.now()) / 1000));
    button.disabled = remaining > 0;
    button.textContent = remaining ? 'Try again in ' + remaining + 's' : 'Email me a secure sign-in link ↗';
    if (!remaining) clearInterval(otpCooldownInterval);
  };
  $('#admin-message').textContent = message;
  update();
}
try {
  const until = Number(localStorage.getItem(OTP_COOLDOWN_STORAGE) || 0);
  const remaining = Math.ceil((until - Date.now()) / 1000);
  if (remaining > 0) setOtpCooldown(remaining, 'A sign-in email was recently requested. Please wait before requesting another.');
} catch {}
$('#link-login').addEventListener('submit', async e => {
  e.preventDefault();
  if (!supabase) return;
  const email = $('#admin-email').value.trim().toLowerCase();
  const button = $('#link-login button[type="submit"]');
  if (!email || button.disabled) return;
  button.disabled = true; button.textContent = 'Sending secure link…';
  $('#admin-message').textContent = 'Preparing your private IdeaLab sign-in email…';
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: IDEALAB_URL }
    });
    if (error) {
      if (error.status === 429 || /rate.?limit|too many requests/i.test(error.message || '')) {
        setOtpCooldown(600, 'Email sending is temporarily limited by Supabase. Use Password sign-in instead, or wait before requesting another link. Custom SMTP is needed for reliable email delivery.');
      } else {
        button.disabled = false; button.textContent = 'Email me a secure sign-in link ↗';
        $('#admin-message').textContent = /signups not allowed/i.test(error.message || '')
          ? 'This address is not registered as a team account. An administrator must create it first.'
          : (error.message || 'We could not send your sign-in link.');
      }
      return;
    }
    setOtpCooldown(60, 'Check your inbox for your secure TravBud IdeaLab link. Open the newest email on this device.');
  } catch (error) {
    button.disabled = false; button.textContent = 'Email me a secure sign-in link ↗';
    $('#admin-message').textContent = 'Connection issue. Check your internet and try again.';
  }
});
async function checkAdmin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: allow, error } = await supabase.from('idealab_admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (error || !allow) { $('#admin-message').textContent = 'This account is not authorised for the private IdeaLab inbox.'; return; }
  $('#admin-dashboard').hidden = false; $('#admin-message').textContent = 'Signed in as ' + user.email;
  await loadAdminIdeas();
}
async function auditModeration(action, type, id, details = {}) {
  const { data: { user } } = await supabase.auth.getUser();
  const { error } = await supabase.from('idealab_moderation_audit').insert({ actor_id: user.id, action, record_type: type, record_id: id, details });
  if (error) console.warn('Moderation audit entry could not be saved:', error.message);
}
function bindAdminTabs() {
  document.querySelectorAll('[data-admin-tab]').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-admin-tab]').forEach(x => x.classList.toggle('active', x === tab));
    document.querySelectorAll('[data-admin-panel]').forEach(x => x.classList.toggle('active', x.dataset.adminPanel === tab.dataset.adminTab));
  }));
}
bindAdminTabs();
function renderModerationCard(r, type) {
  const idea = type === 'idea';
  const id = r.id;
  const heading = idea ? r.title : ('Traveller survey · ' + (r.travel_purpose || 'Response'));
  const body = idea ? r.details : [r.travel_frequency, ...(r.problems || []), r.story, ...(r.improvements || []), r.missing].filter(Boolean).join(' · ');
  const who = idea ? (r.submitter_name || 'Name not recorded') : 'Survey respondent';
  const status = idea ? (r.status || 'new') : (r.moderation_status || 'new');
  return `<article class="admin-idea moderation-card" data-record-id="${esc(id)}">
    <div class="admin-idea-top"><span class="category-tag">${esc(idea ? (categories.find(c=>c[0]===r.category)?.[1] || r.category) : 'TRAVELLER SURVEY')}</span><time>${esc(new Date(r.created_at).toLocaleString())}</time></div>
    <h3>${esc(heading)}</h3><p class="moderation-body">${esc(body || 'No written details provided.')}</p>
    <div class="admin-byline"><b>${esc(who)}</b><span>${esc(idea ? (r.email || 'No follow-up email') : (r.email || 'Email private / not provided'))}</span></div>
    <div class="moderation-controls">
      <label>Moderation <select data-moderation-status><option value="new">New</option><option value="reviewing">Reviewing</option><option value="planned">Planned</option><option value="resolved">Resolved</option><option value="declined">Declined</option></select></label>
      <label class="moderation-note-label">Private note <input data-moderation-note maxlength="1000" placeholder="Internal note (never public)" value="${esc(r.moderator_note || '')}"></label>
      <span class="moderation-private-note">🔒 Private to authorised admins</span>
      ${idea ? '<button type="button" class="outline-btn" data-edit-record>Edit text</button>' : ''}
      <button type="button" class="outline-btn" data-save-moderation>Save moderation</button>
      <button type="button" class="danger-btn" data-delete-record>Delete permanently</button>
    </div></article>`;
}
async function bindModeration(container, records, type) {
  container.querySelectorAll('.moderation-card').forEach(card => {
    const r = records.find(x => x.id === card.dataset.recordId);
    const id = r.id, idea = type === 'idea';
    const status = card.querySelector('[data-moderation-status]');
    status.value = idea ? (r.status || 'new') : (r.moderation_status || 'new');
    card.querySelector('[data-save-moderation]').addEventListener('click', async () => {
      const patch = idea
        ? { status: status.value, moderator_note: card.querySelector('[data-moderation-note]').value.trim(), community_visible: false }
        : { moderation_status: status.value, moderator_note: card.querySelector('[data-moderation-note]').value.trim(), community_visible: false };
      const { error } = await supabase.from(idea ? 'idea_submissions' : 'survey_responses').update(patch).eq('id', id);
      if (error) { $('#admin-message').textContent = 'Could not save moderation: ' + error.message; return; }
      await auditModeration('moderation_updated', type, id, { status: status.value, community_visible: patch.community_visible });
      Object.assign(r, patch); $('#admin-message').textContent = 'Moderation saved.'; await loadCommunityIdeas();
    });
    const edit = card.querySelector('[data-edit-record]');
    if (edit) edit.addEventListener('click', async () => {
      const title = prompt('Edit the private idea title:', r.title);
      if (title === null) return;
      const details = prompt('Edit the private idea text:', r.details);
      if (details === null) return;
      if (title.trim().length < 4 || details.trim().length < 10) { alert('Title must be at least 4 characters and details at least 10 characters.'); return; }
      const { error } = await supabase.from('idea_submissions').update({ title: title.trim(), details: details.trim() }).eq('id', id);
      if (error) { $('#admin-message').textContent = 'Edit failed: ' + error.message; return; }
      await auditModeration('idea_edited', type, id, { previous_title: r.title, title: title.trim() });
      $('#admin-message').textContent = 'Idea updated.'; await loadAdminIdeas(); await loadCommunityIdeas();
    });
    card.querySelector('[data-delete-record]').addEventListener('click', async () => {
      if (!confirm('Permanently delete this ' + type + '? This cannot be undone.')) return;
      const { error } = await supabase.from(idea ? 'idea_submissions' : 'survey_responses').delete().eq('id', id);
      if (error) { $('#admin-message').textContent = 'Delete failed: ' + error.message; return; }
      await auditModeration('record_deleted', type, id, { title: idea ? r.title : 'Survey response' });
      $('#admin-message').textContent = 'Record permanently deleted.'; await loadAdminIdeas(); await loadCommunityIdeas();
    });
  });
}
async function loadAdminIdeas() {
  const rows = $('#admin-rows'), surveyRows = $('#admin-survey-rows'), overview = $('#admin-overview-rows');
  rows.innerHTML = surveyRows.innerHTML = overview.innerHTML = '<p class="loading">Loading private submissions…</p>';
  const [ideaResult, surveyResult] = await Promise.all([
    supabase.from('idea_submissions').select('*').order('created_at', { ascending: false }).limit(300),
    supabase.from('survey_responses').select('*').order('created_at', { ascending: false }).limit(500)
  ]);
  if (ideaResult.error || surveyResult.error) {
    rows.textContent = 'Unable to load submissions: ' + (ideaResult.error || surveyResult.error).message; return;
  }
  const ideas = ideaResult.data || [], surveys = surveyResult.data || [];
  adminExport.ideas = ideas; adminExport.surveys = surveys;
  const counts = ideas.reduce((a, x) => (a[x.status] = (a[x.status] || 0) + 1, a), {});
  $('#admin-summary').innerHTML = [['Ideas', ideas.length],['Surveys', surveys.length],['New ideas', counts.new || 0],['Hidden', ideas.filter(x=>!x.community_visible).length + surveys.filter(x=>!x.community_visible).length]].map(([k,v]) => `<div><small>${k}</small><strong>${v}</strong></div>`).join('');
  rows.innerHTML = ideas.length ? ideas.map(r => renderModerationCard(r,'idea')).join('') : '<div class="empty-inbox">No ideas have been submitted yet.</div>';
  surveyRows.innerHTML = surveys.length ? surveys.map(r => renderModerationCard(r,'survey')).join('') : '<div class="empty-inbox">No survey responses yet.</div>';
  const latest = [...ideas.map(r=>({...r,_kind:'idea'})),...surveys.map(r=>({...r,_kind:'survey'}))].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).slice(0,8);
  overview.innerHTML = latest.length ? latest.map(r => `<article class="admin-idea"><span class="category-tag">${r._kind === 'idea' ? 'COMMUNITY IDEA' : 'SURVEY RESPONSE'}</span><h3>${esc(r._kind === 'idea' ? r.title : (r.travel_purpose || 'Traveller survey'))}</h3><time>${esc(new Date(r.created_at).toLocaleString())}</time><p>${esc(r._kind === 'idea' ? r.details : (r.story || (r.problems || []).join(' · ') || 'Survey response'))}</p></article>`).join('') : '<p class="loading">No activity yet.</p>';
  await bindModeration(rows, ideas, 'idea'); await bindModeration(surveyRows, surveys, 'survey');
  await loadInsights();
}
$('#admin-logout').onclick = async () => { await supabase.auth.signOut(); $('#admin-dashboard').hidden = true; $('#admin-message').textContent = 'You have signed out.'; };
if (supabase) {
  // Keep authorised admins signed in across visits; only request a new link after sign-out or session expiry.
  // Supabase JS defaults to persistent local sessions; PKCE makes the email callback safer.
  // Supabase consumes valid OTP links from the URL. Explain expired links clearly
  // and remove their one-time error parameters so refreshes do not keep showing them.
  const authParams = new URLSearchParams(location.hash.replace(/^#/, ''));
  const queryParams = new URLSearchParams(location.search);
  const authError = authParams.get('error_description') || queryParams.get('error_description');
  const authErrorCode = authParams.get('error_code') || queryParams.get('error_code');
  if (authErrorCode === 'otp_expired' || authError) {
    $('#admin-modal').classList.add('open');
    $('#admin-modal').setAttribute('aria-hidden', 'false');
    $('#admin-message').textContent = authErrorCode === 'otp_expired'
      ? 'That sign-in link has expired or was already used. Enter your admin email and request a fresh link.'
      : 'Sign-in could not be completed. Please request a fresh secure link.';
    history.replaceState({}, document.title, IDEALAB_URL);
  }
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) setTimeout(checkAdmin, 0);
  });
  supabase.auth.getSession().then(({ data }) => { if (data.session) checkAdmin(); });
}




const communityRecords = new Map();
const surveyLabels = {travel_frequency:'🗓️ Travel frequency',travel_purpose:'🎯 Main travel purpose',transport:'🚆 Transport used',problems:'⚠️ Travel difficulties',problem_frequency:'🔁 Problem frequency',severity:'📍 Impact level',story:'📝 Difficult journey story',improvements:'✨ Improvements wanted',missing:'💭 What travel apps are missing',age_range:'👥 Age range',region:'📍 Country / region'};
function openCommunityDetail(kind,id){
 const item=communityRecords.get(kind+':'+id);if(!item)return;
 const idea=kind==='idea';
 $('#community-detail-kind').textContent=idea?'💡 COMMUNITY IDEA':'🧭 TRAVELLER SURVEY';
 $('#community-detail-title').textContent=idea?item.title:'Traveller survey response';
 const rows=idea?[['🗂️ Category',categories.find(c=>c[0]===item.category)?.[1]||item.category],['👥 Who benefits',item.audience],['⭐ Importance',item.impact],['📝 Full idea',item.details],['👤 Shared by',item.display_name||'Traveller']]:Object.entries(surveyLabels).map(([k,l])=>[l,item[k]]);
 $('#community-detail-content').innerHTML=rows.filter(([,v])=>v!=null&&v!==''&&(!Array.isArray(v)||v.length)).map(([l,v])=>'<section class="community-detail-row"><h3>'+esc(l)+'</h3><p>'+esc(Array.isArray(v)?v.join(' · '):String(v))+'</p></section>').join('')+'<p class="community-detail-date">📅 Shared '+esc(new Date(item.created_at).toLocaleString())+'</p>';
 const modal=$('#community-detail');modal.classList.add('open');modal.setAttribute('aria-hidden','false');$('#community-detail-close').focus();
}
function closeCommunityDetail(){const modal=$('#community-detail');modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
$('#community-detail-close').addEventListener('click',closeCommunityDetail);
$('#community-detail').addEventListener('click',e=>{if(e.target.id==='community-detail')closeCommunityDetail();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCommunityDetail();});
$('#community-feed').addEventListener('click',e=>{const t=e.target.closest('[data-community-kind][data-community-id]');if(t)openCommunityDetail(t.dataset.communityKind,t.dataset.communityId);});
async function loadCommunityIdeas(){ return; }
// Traveller survey submit (max 5 improvements enforced here and in the database).
const checked = (name) => [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(x => x.value);
$('#survey-form').addEventListener('change', e => {
  if (e.target.name === 'improvements' && checked('improvements').length > 5) { e.target.checked = false; $('#sv-feedback').textContent = 'Choose up to 5 improvements.'; }
});
$('#survey-form').addEventListener('submit', async e => {
  e.preventDefault();
  const fb = $('#sv-feedback'), btn = e.target.querySelector('button[type="submit"]');
  if (!supabase) { fb.textContent = 'The secure submission service is not connected yet. Please try again later.'; return; }
  const v = (id) => $(id).value.trim() || null;
  btn.disabled = true; fb.textContent = '';
  let error = null;
  try {
    const result = await supabase.from('survey_responses').insert({
      travel_frequency: v('#sv-freq'), travel_purpose: v('#sv-purpose'), transport: checked('transport'), problems: checked('problems'),
      problem_frequency: v('#sv-pfreq'), severity: v('#sv-sev'), story: v('#sv-story'), improvements: checked('improvements'),
      missing: v('#sv-missing'), age_range: v('#sv-age'), region: v('#sv-region'), email: v('#sv-email'), consent: $('#sv-consent').checked, community_visible: false
    });
    error = result.error;
  } catch (requestError) {
    error = requestError;
  }
  btn.disabled = false;
  if (error) {
    console.error('Survey failed:', error);
    fb.textContent = 'Your survey was NOT confirmed as saved. Please check your connection and try again. (' + (error.code || 'network error') + ')';
    return;
  }
  e.target.reset(); await loadCommunityIdeas(); fb.textContent = 'Your survey has been saved privately for the authorised TravBud team.';
});

// Admin insights + export (reads are blocked by RLS for non-admins).
let adminExport = { ideas: [], surveys: [] };
const barsHtml = (title, rows) => { const top = Object.entries(rows).sort((a, b) => b[1] - a[1]).slice(0, 8), max = top[0]?.[1] || 1;
  return `<div class="insight"><h4>${title}</h4>${top.length ? top.map(([k, n]) => `<div class="barrow"><span>${esc(k)}</span><div class="bar"><i style="transform:scaleX(${n / max})"></i></div><b>${n}</b></div>`).join('') : '<p class="loading">No survey data yet.</p>'}</div>`; };
async function loadInsights() {
  const { data, error } = await supabase.from('survey_responses').select('*').order('created_at', { ascending: false }).limit(1000);
  if (error) {
    $('#admin-insights').textContent = /not found|schema cache|PGRST205|does not exist/i.test(`${error.code || ''} ${error.message || ''}`)
      ? 'Survey insights will appear after the survey_responses database migration is applied.'
      : 'Unable to load survey insights: ' + error.message;
    return;
  }
  adminExport.surveys = data || [];
  const tally = (f) => adminExport.surveys.reduce((a, r) => ((r[f] || []).forEach(x => a[x] = (a[x] || 0) + 1), a), {});
  $('#admin-insights').innerHTML = `<p class="insight-count">${adminExport.surveys.length} survey responses</p>` + barsHtml('Most reported travel difficulties', tally('problems')) + barsHtml('Most requested improvements', tally('improvements'));
}
document.querySelectorAll('[data-export]').forEach(b => b.addEventListener('click', () => {
  const rows = [...adminExport.ideas.map(r => ({ kind: 'idea', ...r })), ...adminExport.surveys.map(r => ({ kind: 'survey', ...r }))];
  if (!rows.length) return;
  const json = b.dataset.export === 'json';
  const keys = [...new Set(rows.flatMap(Object.keys))];
  const cell = (v) => '"' + String(Array.isArray(v) ? v.join('; ') : typeof v === 'object' && v ? JSON.stringify(v) : v ?? '').replace(/"/g, '""') + '"';
  const body = json ? JSON.stringify(rows, null, 2) : [keys.map(cell).join(','), ...rows.map(r => keys.map(k => cell(r[k])).join(','))].join('\n');
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([body], { type: json ? 'application/json' : 'text/csv' })), download: 'travbud-idealab.' + (json ? 'json' : 'csv') });
  a.click(); URL.revokeObjectURL(a.href);
}));

// Subtle scroll reveals and section navigation motion.
const revealTargets = document.querySelectorAll('.hero-copy,.hero-art,.ticker,.intro,.focus-card,.films-heading,.film-card,.process,.step,.submit-intro,.idea-form,.closing');
revealTargets.forEach((el, index) => { el.classList.add('reveal'); el.style.setProperty('--reveal-delay', (index % 4) * 75 + 'ms'); });
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));
} else revealTargets.forEach(el => el.classList.add('is-visible'));
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  document.body.classList.add('is-navigating');
  window.setTimeout(() => document.body.classList.remove('is-navigating'), 650);
}));

document.querySelectorAll('video[data-video-src]').forEach(async video => {
  const url = video.dataset.videoSrc;
  const frame = video.closest('.film-frame');
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    if (!response.ok) {
      frame.classList.add('video-unavailable');
      frame.innerHTML = '<div class="video-placeholder"><span class="video-status"><i></i> FILM READY FOR UPLOAD</span><div class="video-orbit"><span class="video-play-mark">▶</span></div><strong>Almost ready for the big screen.</strong><small>Add this MP4 to the <b>videos</b> folder in the TravBud GitHub repository.</small><a class="video-upload-link" href="https://github.com/ninajablade21-design/travbud-idealab/tree/main/videos" target="_blank" rel="noopener">OPEN VIDEO UPLOAD FOLDER <span>↗</span></a><code>' + url.split('/').pop().replace(/%20/g, ' ') + '</code></div>';
      return;
    }
    const source = document.createElement('source');
    source.src = url; source.type = 'video/mp4';
    video.appendChild(source); video.load();
  } catch {
    frame.classList.add('video-unavailable');
    frame.innerHTML = '<div class="video-placeholder"><span>VIDEO TEMPORARILY UNAVAILABLE</span><strong>We could not verify this film right now.</strong><small>Please refresh the page in a moment.</small></div>';
  }
});
