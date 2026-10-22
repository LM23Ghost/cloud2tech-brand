import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<svg class="icon-sprite" aria-hidden="true" focusable="false">
  <symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>
  <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></symbol>
  <symbol id="icon-laptop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M2 20h20"/></symbol>
  <symbol id="icon-headset" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/></symbol>
  <symbol id="icon-cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.5 4.5 0 0 1-1-8.9 5.5 5.5 0 0 1 10.6-2A4.5 4.5 0 0 1 17 18H7z"/></symbol>
  <symbol id="icon-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></symbol>
  <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l8-8h7a2 2 0 0 1 2 2v7l-8 8a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1 0-2.8z"/><circle cx="15" cy="9" r="1.4"/></symbol>
  <symbol id="icon-star" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.4 6-5.5-3.2-5.5 3.2 1.4-6-4.6-4.1 6.1-.6z"/></symbol>
  <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></symbol>
  <symbol id="icon-file" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><path d="M9 13h6M9 17h6"/></symbol>
  <symbol id="icon-rocket" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10z"/><circle cx="12" cy="10" r="2"/><path d="M9 17l-2 4M15 17l2 4"/></symbol>
  <symbol id="icon-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a9 9 0 0 0-15.5-5.5M3 16a9 9 0 0 0 15.5 5.5"/><path d="M3 3v5h5M21 21v-5h-5"/></symbol>
  <symbol id="icon-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="3"/><path d="M15.5 13.5A6 6 0 0 1 21.5 19"/></symbol>
  <symbol id="icon-tool" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6.5l3 3-8 8-3.5.5.5-3.5z"/><path d="M17 4l3 3-1.5 1.5-3-3z"/></symbol>
  <symbol id="icon-graduation" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 5-10 5L2 8z"/><path d="M6 11v4c0 1.5 3 3 6 3s6-1.5 6-3v-4"/></symbol>
</svg>

<header class="site-header">
  <a class="brand" href="#top" aria-label="Cloud2Tech home"><img src="${import.meta.env.BASE_URL}brand/cloud2tech.svg" alt="Cloud2Tech" /></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu <span>+</span></button>
  <nav id="site-nav" class="site-nav" aria-label="Main navigation">
    <a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#education">Education</a><a href="#contact" class="nav-cta">Let's talk <span>&rarr;</span></a>
  </nav>
</header>
<main id="top" tabindex="-1">
  <section class="hero">
    <div class="hero-copy reveal"><p class="eyebrow">Gauteng, South Africa &middot; Managed IT Services</p><h1>Professional IT without<br>the cost of <em>a full-time IT department.</em></h1><p class="hero-intro">Cloud2Tech is a cloud-first, backup-focused managed IT provider for startups, small businesses and individuals &mdash; covering Microsoft 365, device management, backup and websites in plain language.</p><div class="hero-actions"><a class="button button-primary" href="#services">See what we do <span>&darr;</span></a><a class="button button-secondary" href="#contact">Get a quote <span>&rarr;</span></a></div></div>
    <div class="hero-visual reveal reveal-delay"><div class="visual-glow"></div><img src="${import.meta.env.BASE_URL}brand/cloud2tech-professional.svg" alt="Cloud2Tech professional IT consultant" /><span class="visual-note">Clear systems.<br>Confident teams.</span></div>
  </section>
  <section class="trust-bar" aria-label="Core capabilities">
    <span><svg class="icon icon-sm" aria-hidden="true" focusable="false"><use href="#icon-mail"></use></svg>Microsoft 365</span><i></i>
    <span><svg class="icon icon-sm" aria-hidden="true" focusable="false"><use href="#icon-shield"></use></svg>Backup &amp; Data Protection</span><i></i>
    <span><svg class="icon icon-sm" aria-hidden="true" focusable="false"><use href="#icon-laptop"></use></svg>Intune Device Management</span><i></i>
    <span><svg class="icon icon-sm" aria-hidden="true" focusable="false"><use href="#icon-globe"></use></svg>Websites &amp; Hosting</span>
  </section>

  <section class="features" aria-label="Why choose Cloud2Tech">
    <article class="feature-card reveal" style="--i:0"><span class="feature-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-tag"></use></svg></span><h3>Clear, upfront pricing</h3><p>Fixed packages and a written quote before we start. Microsoft and backup costs are never hidden inside the fee.</p></article>
    <article class="feature-card reveal" style="--i:1"><span class="feature-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-headset"></use></svg></span><h3>A human when you need one</h3><p>Real conversations, not ticket queues &mdash; support that explains things in plain English.</p></article>
    <article class="feature-card reveal" style="--i:2"><span class="feature-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-shield"></use></svg></span><h3>Cloud-first &amp; secure</h3><p>Microsoft 365, Intune and backup, configured properly and monitored &mdash; not just installed and left.</p></article>
  </section>

  <section class="services" id="services">
    <div class="section-head reveal"><div><p class="eyebrow">One technology partner</p><h2>Practical services, <em>explained in plain English.</em></h2></div><p>We handle the technology behind your business so you can focus on the business itself.</p></div>
    <div class="service-grid">
      <article class="service-card reveal" style="--i:0"><span class="service-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-mail"></use></svg></span><div class="service-number">01</div><h3>Microsoft 365 Administration</h3><p>Email, accounts, licensing, MFA, Teams and SharePoint &mdash; managed and supported day to day.</p><span class="service-arrow">&rarr;</span></article>
      <article class="service-card reveal" style="--i:1"><span class="service-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-shield"></use></svg></span><div class="service-number">02</div><h3>Backup &amp; Data Protection</h3><p>Microsoft 365 and workstation backup with monitoring, retention and restore assistance.</p><span class="service-arrow">&rarr;</span></article>
      <article class="service-card reveal" style="--i:2"><span class="service-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-laptop"></use></svg></span><div class="service-number">03</div><h3>Device Management (Intune)</h3><p>Windows setup, Autopilot, compliance policies and security baselines for every device.</p><span class="service-arrow">&rarr;</span></article>
      <article class="service-card reveal" style="--i:3"><span class="service-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-headset"></use></svg></span><div class="service-number">04</div><h3>Basic IT Support</h3><p>Practical remote troubleshooting for users, endpoints and everyday business systems.</p><span class="service-arrow">&rarr;</span></article>
      <article class="service-card reveal" style="--i:4"><span class="service-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-cloud"></use></svg></span><div class="service-number">05</div><h3>Cloud &amp; Azure Tenant Administration</h3><p>Microsoft and Azure tenant management, handled properly so licensing stays transparent.</p><span class="service-arrow">&rarr;</span></article>
      <article class="service-card reveal" style="--i:5"><span class="service-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-globe"></use></svg></span><div class="service-number">06</div><h3>Websites, Hosting &amp; Maintenance</h3><p>Affordable business websites with hosting, SSL and ongoing maintenance, from R2,000.</p><span class="service-arrow">&rarr;</span></article>
    </div>
    <div class="translate-panel reveal"><div class="translate-row"><span class="translate-from">"Microsoft Intune Endpoint Management"</span><span class="translate-arrow">&rarr;</span><span class="translate-to">Manage your company's computers, apps and security from one place.</span></div><div class="translate-row"><span class="translate-from">"Microsoft 365 Backup"</span><span class="translate-arrow">&rarr;</span><span class="translate-to">Protect your business email and files from accidental deletion and data loss.</span></div></div>
  </section>

  <section class="pricing" id="pricing">
    <div class="section-head reveal"><div><p class="eyebrow">Managed IT packages</p><h2>Clear pricing.<br><em>No surprise invoices.</em></h2></div><p>Microsoft licensing, backup storage and other third-party costs are kept separate from the service fee.</p></div>
    <div class="pricing-grid">
      <article class="price-card reveal" style="--i:0"><h3>Starter</h3><p class="price">R399<span>/month</span></p><p class="price-target">Individuals &amp; micro-businesses</p><ul><li>Basic remote support</li><li>Microsoft administration</li><li>Basic backup management</li><li>Basic device assistance</li></ul></article>
      <article class="price-card reveal" style="--i:1"><h3>Essential</h3><p class="price">R499<span>/user/month</span></p><p class="price-target">Small businesses</p><ul><li>Unlimited remote support</li><li>Microsoft 365 administration</li><li>Backup management</li><li>Basic security configuration</li></ul></article>
      <article class="price-card price-featured reveal" style="--i:2"><span class="price-badge"><svg class="icon icon-sm" aria-hidden="true" focusable="false"><use href="#icon-star"></use></svg>Most popular</span><h3>Business</h3><p class="price">R699<span>/user/month</span></p><p class="price-target">Businesses needing Intune</p><ul><li>Everything in Essential</li><li>Microsoft Intune &amp; device management</li><li>Application deployment &amp; compliance</li><li>Backup monitoring</li></ul></article>
      <article class="price-card reveal" style="--i:3"><h3>Business Plus</h3><p class="price">R899<span>/user/month</span></p><p class="price-target">Growing businesses</p><ul><li>Everything in Business</li><li>Proactive management &amp; reporting</li><li>Backup oversight</li><li>Priority support</li></ul></article>
      <article class="price-card reveal" style="--i:4"><h3>Education</h3><p class="price">Subsidised</p><p class="price-target">Under-resourced schools</p><ul><li>Custom, subsidised package</li><li>Built around the school programme</li></ul></article>
      <article class="price-card reveal" style="--i:5"><h3>Enterprise</h3><p class="price">Custom</p><p class="price-target">Future market</p><ul><li>Available as Cloud2Tech scales</li></ul></article>
    </div>
    <p class="pricing-note">Preferential pricing is available for qualifying startups and students as Cloud2Tech's own commercial programmes. Monthly, annual and annual pay-as-you-go options are available.</p>
  </section>

  <section class="how-it-works" id="how-it-works"><div class="steps-intro reveal"><p class="eyebrow">How we work with you</p><h2>Less firefighting.<br><em>More forward.</em></h2></div><div class="steps">
    <div class="step reveal" style="--i:0"><span class="step-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-search"></use></svg></span><div><span class="step-number">01</span><h3>Understand</h3><p>We find out how IT, Microsoft 365 and backups are handled today, and what's frustrating right now.</p></div></div>
    <div class="step reveal" style="--i:1"><span class="step-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-file"></use></svg></span><div><span class="step-number">02</span><h3>Recommend &amp; quote</h3><p>We recommend only what's appropriate, with a written quote covering fees, licensing and any third-party costs.</p></div></div>
    <div class="step reveal" style="--i:2"><span class="step-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-rocket"></use></svg></span><div><span class="step-number">03</span><h3>Onboard</h3><p>We set up your environment and document it properly from day one.</p></div></div>
    <div class="step reveal" style="--i:3"><span class="step-icon"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-refresh"></use></svg></span><div><span class="step-number">04</span><h3>Manage &amp; retain</h3><p>We deliver the agreed service, review it regularly, and stay easy to reach.</p></div></div>
  </div></section>

  <section class="education" id="education">
    <div class="education-copy reveal"><p class="eyebrow">Education &amp; social impact</p><h2>Turning donated equipment into <em>working classrooms.</em></h2><p>Alongside our commercial services, Cloud2Tech partners with companies willing to donate usable computers and IT equipment, and puts that equipment to work in under-resourced government schools.</p><a class="text-link" href="#contact">Partner with us <span>&rarr;</span></a></div>
    <div class="education-steps">
      <div class="edu-step reveal" style="--i:0"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-users"></use></svg><p><span>01</span>Corporate partnership &amp; equipment collection</p></div>
      <div class="edu-step reveal" style="--i:1"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-shield"></use></svg><p><span>02</span>Secure data wiping &amp; hardware assessment</p></div>
      <div class="edu-step reveal" style="--i:2"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-tool"></use></svg><p><span>03</span>Refurbishment &amp; software deployment</p></div>
      <div class="edu-step reveal" style="--i:3"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-graduation"></use></svg><p><span>04</span>School deployment, teacher training &amp; ongoing support</p></div>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="contact-copy reveal">
      <p class="eyebrow">No-obligation IT check-up</p>
      <h2>Let's talk about<br><em>your IT.</em></h2>
      <p>Tell us a bit about your business and we'll come back with practical next steps &mdash; no jargon, no pressure.</p>
      <a class="contact-direct" href="mailto:hello@cloud2tech.co.za"><svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-mail"></use></svg>hello@cloud2tech.co.za</a>
    </div>
    <form class="contact-form reveal reveal-delay" id="contact-form" novalidate>
      <div class="form-row"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" required autocomplete="name" /></div>
      <div class="form-row"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" required autocomplete="email" /></div>
      <div class="form-row"><label for="cf-company">Company <span>(optional)</span></label><input id="cf-company" name="company" type="text" autocomplete="organization" /></div>
      <div class="form-row"><label for="cf-service">What do you need help with?</label>
        <select id="cf-service" name="service">
          <option value="General enquiry">General enquiry</option>
          <option value="Microsoft 365">Microsoft 365</option>
          <option value="Backup &amp; Data Protection">Backup &amp; Data Protection</option>
          <option value="Device Management (Intune)">Device Management (Intune)</option>
          <option value="Website">Website</option>
          <option value="Education programme">Education programme</option>
        </select>
      </div>
      <div class="form-row"><label for="cf-message">Message</label><textarea id="cf-message" name="message" rows="4" required></textarea></div>
      <button class="button button-primary" type="submit">Send message <span>&rarr;</span></button>
      <p class="form-status" role="status" aria-live="polite"></p>
    </form>
  </section>
</main>
<footer><div class="footer-brand"><img src="${import.meta.env.BASE_URL}brand/cloud2tech-dark.svg" alt="Cloud2Tech" /><p>Technology that works.<br>Business that grows.</p></div><div class="footer-links"><a href="#services">Services</a><a href="#pricing">Pricing</a><a href="#education">Education</a><a href="mailto:hello@cloud2tech.co.za"><svg class="icon icon-sm" aria-hidden="true" focusable="false"><use href="#icon-mail"></use></svg>hello@cloud2tech.co.za</a></div><div class="footer-bottom"><span>&copy; 2026 Cloud2Tech</span><span>Gauteng, South Africa</span><a href="#top">Back to top &uarr;</a></div></footer>
`

const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
const navigation = document.querySelector<HTMLElement>('.site-nav')
menuToggle?.addEventListener('click', () => { const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', String(!isOpen)); navigation?.classList.toggle('is-open', !isOpen) })
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menuToggle?.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open') }))

const revealEls = document.querySelectorAll<HTMLElement>('.reveal')
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })
  revealEls.forEach((el) => observer.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'))
}

const contactForm = document.querySelector<HTMLFormElement>('#contact-form')
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const status = contactForm.querySelector<HTMLParagraphElement>('.form-status')
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity()
    return
  }
  const data = new FormData(contactForm)
  const name = String(data.get('name') ?? '')
  const email = String(data.get('email') ?? '')
  const company = String(data.get('company') ?? '')
  const service = String(data.get('service') ?? 'General enquiry')
  const message = String(data.get('message') ?? '')
  const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nInterested in: ${service}\n\n${message}`
  const mailto = `mailto:hello@cloud2tech.co.za?subject=${encodeURIComponent('Website enquiry: ' + service)}&body=${encodeURIComponent(body)}`
  window.location.href = mailto
  if (status) status.textContent = 'Opening your email client with your message ready to send…'
})
