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

$('#app').innerHTML = `
<header class="site-header">
  <a class="brand" href="#top" aria-label="TravBud IdeaLab home"><span class="brand-mark">✳</span><span>travbud <i>idealab</i></span></a>
  <nav aria-label="Main navigation"><a href="#why">Why IdeaLab</a><a href="#focus">What we're exploring</a><a href="#submit">Share an idea</a></nav>
  <button class="team-link" id="admin-open">Team sign in <span>↗</span></button>
</header>
<main id="top">
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow"><span class="eyebrow-dot"></span> THE TRAVBUD INNOVATION LAB</p>
      <h1>Travel has a<br>better <em>way.</em></h1>
      <p class="hero-lead">We're shaping TravBud before launch. Tell us what makes travelling difficult, what you wish existed, and what would make your next journey feel easier.</p>
      <a class="primary" href="#submit">Share your idea <span>↗</span></a>
      <div class="privacy-inline"><span class="lock">⌑</span><span><b>A private feedback space</b><br>Your submission is only visible to the TravBud team.</span></div>
    </div>
    <div class="hero-art" aria-label="Abstract illustration of connected travel routes">
      <div class="art-orbit orbit-a"></div><div class="art-orbit orbit-b"></div><div class="art-route"></div>
      <div class="art-node node-a"></div><div class="art-node node-b"></div><div class="art-node node-c"></div>
      <div class="art-panel"><span>IDEAS IN MOTION</span><strong>Listen.<br><em>Imagine.</em><br>Build better.</strong><small>Every better journey starts with a question.</small></div>
      <div class="art-stamp">✳ &nbsp; BUILT TOGETHER</div>
    </div>
  </section>
  <div class="ticker"><span>REAL TRAVEL PROBLEMS</span><b>✳</b><span>USEFUL IDEAS</span><b>✳</b><span>ACCESS FOR EVERYONE</span><b>✳</b><span>BETTER JOURNEYS</span><b>✳</b><span>REAL TRAVEL PROBLEMS</span></div>
  <section id="why" class="intro section-shell">
    <div><p class="eyebrow">01 / WHY IDEALAB EXISTS</p><h2>A private place to<br><em>shape what's next.</em></h2></div>
    <div class="intro-copy"><p>TravBud is still being shaped. Before we build more, we want to understand the real-world challenges people face when planning, booking and taking trips.</p><p>IdeaLab is a private channel between travellers and the people building TravBud. Share the small frustrations, big barriers and ambitious ideas. Our team will read every submission and use the patterns to guide what we build.</p><div class="principle"><span>01</span> Listen before we build <span>02</span> Design for real people</div></div>
  </section>
  <section id="focus" class="focus-section">
    <div class="section-shell"><p class="eyebrow">02 / WHAT WE WANT TO UNDERSTAND</p><div class="focus-heading"><h2>Where could travel<br>work <em>better?</em></h2><p>You don't need a perfect solution. Tell us what gets in your way — we'll explore the possibilities together.</p></div>
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
      <p class="eyebrow">02 / SEE THE VISION</p>
      <div class="films-heading"><h2>Ideas become<br><em>real journeys.</em></h2><p>Explore the TravBud vision and the door-to-door planning experience we're working towards.</p></div>
      <div class="films-grid">
        <article class="film-card film-feature">
          <div class="film-frame"><video controls playsinline preload="metadata" poster="" aria-label="TravBud product overview"><source src="${import.meta.env.BASE_URL}travbud-ad-silent.mp4" type="video/mp4">Your browser does not support HTML video.</video></div>
          <div class="film-meta"><span>01 / PRODUCT OVERVIEW</span><h3>Meet TravBud</h3><p>A look at the connected travel experience we're imagining.</p></div>
        </article>
        <article class="film-card">
          <div class="film-frame"><video controls playsinline preload="metadata" aria-label="TravBud door-to-door travel planning"><source src="${import.meta.env.BASE_URL}viraldub-travbud-plan-door-to-door.mp4" type="video/mp4">Your browser does not support HTML video.</video></div>
          <div class="film-meta"><span>02 / DOOR-TO-DOOR PLANNING</span><h3>One journey, connected</h3><p>See the idea behind live fares and a more complete travel plan.</p></div>
        </article>
        <article class="film-card">
          <div class="film-frame"><video controls playsinline preload="metadata" aria-label="TravBud campaign video with music"><source src="${import.meta.env.BASE_URL}travbud-ad-with-music%20(5).mp4" type="video/mp4">Your browser does not support HTML video.</video></div>
          <div class="film-meta"><span>03 / CAMPAIGN FILM</span><h3>TravBud in motion</h3><p>Another cut from the TravBud product story.</p></div>
        </article>
        </article>
      </div>
    </div>
  </section>
  <section class="process section-shell">
    <div><p class="eyebrow">03 / WHAT HAPPENS NEXT</p><h2>Your idea goes<br>somewhere <em>useful.</em></h2></div>
    <div class="process-steps"><div class="step"><span>01</span><div><h3>You share</h3><p>Describe the problem, idea or experience in your own words.</p></div></div><div class="step"><span>02</span><div><h3>Our team listens</h3><p>Your submission goes into a private team inbox for review and discussion.</p></div></div><div class="step"><span>03</span><div><h3>We look for patterns</h3><p>We group related needs and consider what could make the biggest difference.</p></div></div><div class="step"><span>04</span><div><h3>TravBud gets better</h3><p>Insights help shape priorities and future product decisions. Not every idea can be promised, but every idea can inform the conversation.</p></div></div></div>
  </section>
  <section id="submit" class="submit-section">
    <div class="submit-shell">
      <div class="submit-intro"><p class="eyebrow">04 / YOUR TURN</p><h2>What should<br>travel <em>feel like?</em></h2><p>Share a challenge you've faced or an idea that could make travelling simpler, more connected or more inclusive.</p><div class="private-card"><span>⌑</span><div><b>Private by design</b><small>Your name and submission are shared only with authorised TravBud IdeaLab admins. Nothing is published publicly.</small></div></div></div>
      <form id="idea-form" class="idea-form">
        <div class="form-heading"><span>IDEA SUBMISSION</span><span>PRIVATE INBOX · 01</span></div>
        <label for="submitter-name">Your name <sup>*</sup></label><input id="submitter-name" name="submitter_name" required minlength="2" maxlength="80" autocomplete="name" placeholder="How should we address you?">
        <label for="idea-category">Which area does this relate to? <sup>*</sup></label><select id="idea-category" name="category" required><option value="">Choose a topic</option>${categories.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>
        <label for="idea-title">Give your idea a title <sup>*</sup></label><input id="idea-title" name="title" required minlength="4" maxlength="120" placeholder="e.g. Make multi-stop planning easier">
        <label for="idea-details">Tell us more <sup>*</sup></label><textarea id="idea-details" name="details" required minlength="10" maxlength="5000" rows="6" placeholder="What happened? What would you change? Who would this help? Add as much context as you like."></textarea><div class="char-count" id="char-count">0 / 5000</div>
        <label for="idea-email">Email <span class="optional">OPTIONAL · FOR FOLLOW-UP</span></label><input id="idea-email" name="email" type="email" maxlength="254" autocomplete="email" placeholder="you@example.com">
        <label class="consent-row"><input type="checkbox" id="consent-device" name="consent_device_data"><span><b>Allow basic device context (optional)</b><small>If selected, we'll include browser and screen-size details to help diagnose technical issues. No precise location or device fingerprint is collected.</small></span></label>
        <label class="consent-row required-consent"><input type="checkbox" id="privacy-consent" required><span><b>I understand this is a private submission. <sup>*</sup></b><small>My name and feedback may be reviewed by authorised TravBud IdeaLab team members to improve the product.</small></span></label>
        <button class="primary submit-button" type="submit">Send my idea <span>↗</span></button><p class="form-feedback" id="form-feedback" role="status" aria-live="polite"></p><p class="form-footnote">Required fields are marked *. Please don't include passwords, payment details or other sensitive personal information.</p>
      </form>
    </div>
  </section>
  <section class="closing section-shell"><p class="eyebrow">TRAVBUD IDEALAB</p><h2>Better journeys don't<br>happen by <em>accident.</em></h2><p>They happen when we listen to the people taking them.</p><a href="#submit" class="text-link">Add your voice <span>↗</span></a></section>
</main>
<footer><a class="brand" href="#top"><span class="brand-mark">✳</span><span>travbud <i>idealab</i></span></a><span>LISTEN FIRST. BUILD BETTER.</span><button id="footer-team" class="footer-team">Private team access ↗</button></footer>
<div class="modal" id="admin-modal" aria-hidden="true"><div class="dialog"><button id="admin-close" class="close" aria-label="Close">×</button><p class="eyebrow">PRIVATE TEAM WORKSPACE</p><h2>IdeaLab inbox</h2><p class="dialog-copy">Sign in with an authorised team email to view and manage private submissions.</p><form id="admin-login"><label for="admin-email">Team email</label><input id="admin-email" type="email" required autocomplete="email" placeholder="team@example.com"><div class="team-login-actions"><button class="primary" type="submit">Email me a sign-in code ↗</button></div><div id="team-code-panel" hidden><label for="admin-code">6-digit email code</label><input id="admin-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="000000"><button class="primary" id="verify-team-code" type="button">Verify code and open inbox</button><button class="text-button" id="resend-team-code" type="button">Send a new code</button></div></form><p id="admin-message" class="admin-message" role="status"></p><div id="admin-dashboard" hidden><div class="admin-summary" id="admin-summary"></div><div id="admin-rows" class="admin-rows"></div><button id="admin-logout" class="outline-btn">Sign out</button></div></div></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

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
  const payload = { submitter_name: name, category: data.get('category'), title, details, email: String(data.get('email') || '').trim() || null, consent_device_data: consent, device_context: deviceContext, status: 'new' };
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true; button.textContent = 'Sending securely…'; feedback.textContent = '';
  const { error } = await supabase.from('idea_submissions').insert(payload);
  button.disabled = false; button.innerHTML = 'Send my idea <span>↗</span>';
  if (error) { console.error('IdeaLab submission failed:', error); feedback.textContent = 'We could not save your idea just now. Please try again in a moment.'; return; }
  form.reset(); $('#char-count').textContent = '0 / 5000';
  feedback.textContent = 'Thank you. Your idea has been sent privately to the TravBud team.';
  $('#toast').textContent = 'Your idea is safely in the IdeaLab inbox.'; $('#toast').classList.add('show');
  window.setTimeout(() => $('#toast').classList.remove('show'), 4500);
});

document.querySelectorAll('[data-access]').forEach(control => control.addEventListener('change', () => document.documentElement.classList.toggle('access-' + control.dataset.access, control.checked)));

const modal = $('#admin-modal');
function openAdmin() { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); if (supabase) checkAdmin(); else $('#admin-message').textContent = 'Admin service is not connected.'; }
function closeAdmin() { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
$('#admin-open').onclick = openAdmin; $('#footer-team').onclick = openAdmin; $('#admin-close').onclick = closeAdmin;
modal.addEventListener('click', e => { if (e.target === modal) closeAdmin(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAdmin(); });
let pendingTeamEmail = '';
async function sendTeamCode() {
  if (!supabase) return;
  const email = $('#admin-email').value.trim().toLowerCase();
  if (!email) { $('#admin-message').textContent = 'Enter your authorised team email first.'; return; }
  const button = $('#admin-login button[type="submit"]');
  button.disabled = true; button.textContent = 'Sending code…';
  $('#admin-message').textContent = 'Sending a secure one-time code to your team email.';
  try {
    const result = await supabase.auth.signInWithOtp({ email: email, options: { shouldCreateUser: false, emailRedirectTo: IDEALAB_URL } });
    if (result.error) {
      const msg = result.error.message || '';
      $('#admin-message').textContent = result.error.status === 429
        ? 'Email sending is temporarily rate-limited. Wait before requesting another code, or use an existing signed-in session.'
        : (/signups not allowed/i.test(msg)
          ? 'This team email has not been added to Supabase Auth yet. An admin must invite/create this account first; public signups remain disabled.'
          : msg);
      button.disabled = false; button.textContent = 'Email me a sign-in code ↗'; return;
    }
    pendingTeamEmail = email;
    $('#team-code-panel').hidden = false;
    $('#admin-message').textContent = 'Code sent if this address is an existing authorised account. Enter the 6-digit code from your email.';
    button.disabled = false; button.textContent = 'Send another code';
    $('#admin-code').focus();
  } catch (err) {
    button.disabled = false; button.textContent = 'Email me a sign-in code ↗';
    $('#admin-message').textContent = 'Network error. Please try again.';
  }
}
$('#admin-login').addEventListener('submit', async e => { e.preventDefault(); await sendTeamCode(); });
$('#resend-team-code').addEventListener('click', sendTeamCode);
$('#verify-team-code').addEventListener('click', async () => {
  const token = $('#admin-code').value.trim();
  if (!pendingTeamEmail || token.length !== 6 || !Array.from(token).every(ch => ch >= '0' && ch <= '9')) {
    $('#admin-message').textContent = 'Enter the 6-digit code from your email.'; return;
  }
  const button = $('#verify-team-code'); button.disabled = true; button.textContent = 'Verifying…';
  const result = await supabase.auth.verifyOtp({ email: pendingTeamEmail, token: token, type: 'email' });
  button.disabled = false; button.textContent = 'Verify code and open inbox';
  if (result.error) { $('#admin-message').textContent = result.error.message || 'That code is invalid or expired. Request a new one.'; return; }
  $('#admin-code').value = '';
  $('#admin-message').textContent = 'Code verified. Checking team access…';
  await checkAdmin();
});
async function checkAdmin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: allow, error } = await supabase.from('idealab_admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (error || !allow) { $('#admin-message').textContent = 'This account is not authorised for the private IdeaLab inbox.'; return; }
  $('#admin-dashboard').hidden = false; $('#admin-message').textContent = 'Signed in as ' + user.email;
  await loadAdminIdeas();
}
async function loadAdminIdeas() {
  const rows = $('#admin-rows'); rows.innerHTML = '<p class="loading">Loading private submissions…</p>';
  const { data, error } = await supabase.from('idea_submissions').select('*').order('created_at', { ascending: false }).limit(300);
  if (error) { rows.textContent = 'Unable to load submissions: ' + error.message; return; }
  const ideas = data || [];
  const counts = ideas.reduce((a, x) => (a[x.status] = (a[x.status] || 0) + 1, a), {});
  $('#admin-summary').innerHTML = [['Total', ideas.length],['New', counts.new || 0],['Reviewing', counts.reviewing || 0],['Planned', counts.planned || 0]].map(([k,v]) => `<div><small>${k}</small><strong>${v}</strong></div>`).join('');
  rows.innerHTML = ideas.length ? ideas.map(r => `
    <article class="admin-idea"><div class="admin-idea-top"><span class="category-tag">${esc(categories.find(c => c[0] === r.category)?.[1] || r.category)}</span><time>${new Date(r.created_at).toLocaleString()}</time></div>
    <h3>${esc(r.title)}</h3><p>${esc(r.details)}</p><div class="admin-byline"><b>${esc(r.submitter_name || 'Name not recorded')}</b><span>${esc(r.email || 'No follow-up email')}</span></div>
    <div class="admin-controls"><label>Status <select data-idea-status="${r.id}"><option value="new">New</option><option value="reviewing">Reviewing</option><option value="planned">Planned</option><option value="resolved">Resolved</option><option value="declined">Declined</option></select></label><button class="copy-idea" data-copy="${r.id}">Copy details</button></div></article>`).join('') : '<div class="empty-inbox">No ideas have been submitted yet.</div>';
  rows.querySelectorAll('[data-idea-status]').forEach(select => {
    const record = ideas.find(x => x.id === select.dataset.ideaStatus); select.value = record.status;
    select.addEventListener('change', async () => {
      select.disabled = true;
      const { error: updateError } = await supabase.from('idea_submissions').update({ status: select.value }).eq('id', record.id);
      select.disabled = false;
      if (updateError) { $('#admin-message').textContent = 'Status update failed: ' + updateError.message; select.value = record.status; }
      else { record.status = select.value; $('#admin-message').textContent = 'Submission status updated.'; }
    });
  });
  rows.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const r = ideas.find(x => x.id === button.dataset.copy);
    await navigator.clipboard.writeText(` ${r.title}\nBy: ${r.submitter_name}\nCategory: ${r.category}\n\n${r.details}`);
    button.textContent = 'Copied';
  }));
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
