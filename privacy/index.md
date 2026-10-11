---
title: Privacy
summary: "How k-mathews.com handles visitor data."
---
<div class="page">
<div class="wrap">

{%- if site.impressum.address %}
<section id="impressum" class="row" aria-labelledby="imp-h">
<div class="rail">Angaben gemäß § 5 DDG</div>
<div class="legal">
<h1 id="imp-h" class="page-title">Impressum</h1>
<address>{{ site.author.name }}<br>{{ site.impressum.address | join: "<br>" }}</address>
<p>E-Mail: <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></p>
<p class="muted">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: {{ site.author.name }}, Anschrift wie oben. This is a personal site. Views are my own and not those of my employer.</p>
</div>
</section>
{%- endif %}

<section id="privacy" class="row{% if site.impressum.address %} section{% endif %}" aria-labelledby="priv-h">
<div class="rail">Datenschutz</div>
<div class="legal">
<h1 id="priv-h" class="page-title">Privacy</h1>
<p class="lead">This site sets no cookies, runs no analytics or trackers, and shows no ads. Fonts, scripts and styles are served from this domain.</p>
<dl class="facts">
<div><dt>Hosting</dt><dd>The site is hosted on GitHub Pages and served through Cloudflare. To deliver the site and protect it from abuse, they process technical data such as your IP address, browser type and the pages you request. See the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub privacy statement</a> and the <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>. Legal basis: Art. 6(1)(f) GDPR.</dd></div>
<div><dt>Analytics</dt><dd>None. If that changes, it will be cookieless, aggregate-only and listed here.</dd></div>
<div><dt>Theme setting</dt><dd>If you switch between light and dark, your choice is stored in your browser’s local storage. It never leaves your device.</dd></div>
<div><dt>Maths</dt><dd>Articles that contain equations load MathJax from cdn.jsdelivr.net, which receives your IP address. Other pages do not.</dd></div>
<div><dt>Email</dt><dd>If you write to me, I use your message only to reply.</dd></div>
<div><dt>Your rights</dt><dd>Access, rectification, erasure, restriction, objection, and complaint to a supervisory authority (Art. 15–21 and 77 GDPR).</dd></div>
</dl>
<p class="muted">Controller under the GDPR: {{ site.author.name }}, <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>.</p>
</div>
</section>

</div>
</div>
