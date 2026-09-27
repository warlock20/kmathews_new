---
title: About
nav: about
summary: "About Kiran Mathews: senior research engineer at Bosch Corporate Research, working on networking, systems software and functional safety."
---
<div class="page about">
<div class="wrap">

<section class="row" aria-labelledby="about-h">
<div class="rail">
<div class="name">{{ site.author.full_name }}</div>
<div>{{ site.author.role }}</div>
<div>{{ site.author.org }}</div>
<div>{{ site.author.location }}</div>
</div>
<div class="bio">
<h1 id="about-h" class="page-title">About</h1>
<p>I’m a senior research engineer at Bosch Corporate Research. I work where networking, systems software and functional safety meet, and for more than a decade I have designed, implemented and evaluated communication protocols: first for industrial WiFi, now for in-vehicle networks and the path from vehicle to edge to cloud.</p>
<p>Day to day that means fault injection for automated software safety analysis, vehicle diagnostics, eBPF performance work, and in-vehicle networking with 10BASE-T1S and IEEE 1722.</p>
<p>I did my doctorate at TU Kaiserslautern on reliability-constrained QoS routing in WiFi networks, was a postdoc at Fraunhofer IESE, and co-founded Qurience, a small biomedical knowledge-curation startup that is now part of Causality BioModels.</p>
<p>Outside my day job I contribute to open-source projects, among them <a href="https://github.com/COVESA/Open1722">Open1722</a>, COVESA’s implementation of IEEE 1722, and I build side projects such as <a href="https://startwitha.xyz/">Start with A</a>, an open-source investment research platform.</p>
<p>This site is my notebook. I’m writing again after a long break, mostly about the work above, and sometimes about moving between academia, a startup and industrial research. Write-ups about companies go on my <a href="https://warlock20.substack.com/">Substack</a>.</p>
<p class="off"><strong>Off the clock</strong> — hiking, and Arsenal, patiently.</p>
</div>
</section>

<section class="section" aria-labelledby="exp-h">
<div class="row section-head"><h2 id="exp-h" class="label">Experience</h2><div></div></div>
<ol class="timeline">
{%- for job in site.data.experience %}
{%- assign start = job.startDate | split: " " | last -%}
{%- if job.endDate == "Present" -%}{%- assign finish = "now" -%}{%- else -%}{%- assign finish = job.endDate | split: " " | last -%}{%- endif %}
<li class="row">
<div class="rail years">{{ start }} — {{ finish }}</div>
<div class="stop">
<span class="dot" aria-hidden="true"></span>
<h3 class="stop-title">{{ job.role }}</h3>
<div class="stop-org">{{ job.org }}</div>
<p class="stop-desc">{{ job.summary }}</p>
</div>
</li>
{%- endfor %}
</ol>
</section>

<section class="section" aria-labelledby="edu-h">
<div class="row section-head"><h2 id="edu-h" class="label">Education</h2><div></div></div>
<ol class="plain-list">
{%- for e in site.data.education %}
<li class="row">
<div class="rail">{{ e.year }}</div>
<div>
<div class="pl-title">{{ e.title }}</div>
<div class="pl-sub">{{ e.school_short }}</div>
</div>
</li>
{%- endfor %}
</ol>
</section>

<section class="section" aria-labelledby="else-h">
<div class="row section-head"><h2 id="else-h" class="label">Elsewhere</h2><div></div></div>
<div class="row">
<div></div>
<ul class="link-list">
<li><a href="mailto:{{ site.author.email }}"><span>Email</span><span class="detail">{{ site.author.email }}</span><span class="arrow" aria-hidden="true">→</span></a></li>
<li><a href="https://www.linkedin.com/in/{{ site.author.linkedin }}"><span>LinkedIn</span><span class="detail">linkedin.com/in/{{ site.author.linkedin }}</span><span class="arrow" aria-hidden="true">↗</span></a></li>
<li><a href="https://github.com/{{ site.author.github }}"><span>GitHub</span><span class="detail">github.com/{{ site.author.github }}</span><span class="arrow" aria-hidden="true">↗</span></a></li>
{%- if site.author.substack %}
<li><a href="{{ site.author.substack }}"><span>Substack</span><span class="detail">Write-ups about companies</span><span class="arrow" aria-hidden="true">↗</span></a></li>
{%- endif %}
{%- if site.author.scholar %}
<li><a href="{{ site.author.scholar }}"><span>Google Scholar</span><span class="detail">Publications and citations</span><span class="arrow" aria-hidden="true">↗</span></a></li>
{%- endif %}
<li><a href="{{ '/feed.xml' | relative_url }}"><span>RSS</span><span class="detail">k-mathews.com/feed.xml</span><span class="arrow" aria-hidden="true">→</span></a></li>
{%- if site.author.cv %}
<li><a href="{{ site.author.cv | relative_url }}"><span>CV</span><span class="detail">PDF</span><span class="arrow" aria-hidden="true">↓</span></a></li>
{%- endif %}
</ul>
</div>
</section>

</div>
</div>
