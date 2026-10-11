Design a personal website for **Dr.-Ing. Kiran Mathews**: a writing-first personal site with a compact professional record. It replaces an outdated 2016-era Jekyll site at k-mathews.com.

**This is a new design, not a sync of the existing site.** Don't import or copy the layout of the current site or its GitHub repo (warlock20/kmathews_new). Don't reproduce the full-bleed photo home page, the black nav bar, the pill buttons or Font Awesome. Carrying over the monochrome, typographic character is fine if it serves this brief; propose your own type and colour.

## Who he is

Senior Research Engineer at Bosch Corporate Research (Stuttgart area, Germany). Works where networking, systems software and functional safety meet. Over a decade designing, implementing and evaluating communication protocols. Current work: fault injection for automated software safety analysis, vehicle diagnostics, eBPF performance work, in-vehicle networking (10BASE-T1S, IEEE 1722), and vehicle–edge–cloud computing. PhD (Dr.-Ing., TU Kaiserslautern, 2022) on reliability-constrained QoS routing in WiFi networks. Earlier: postdoc at Fraunhofer IESE, co-founder of a biomedical knowledge-curation startup (Qurience GmbH, now part of Causality BioModels).

He is restarting writing after a long break. The site should make that writing the centre of gravity.

## Audience

1. Engineers and researchers in systems, networking, embedded/automotive and safety, who arrive from a search or a shared link to one article.
2. Recruiters, collaborators and peers checking who he is. They need a clear 30-second picture.

## Voice and feel

Technical, calm, precise, a little personal. Think of a well-kept engineer's notebook, not a startup landing page or a portfolio template. The type should carry the design. Avoid hero images, gradients, stock photos, skill bars, logos walls and animated counters. It must read well for long technical articles with code.

## Pages

1. **Home**
   - One or two sentences on who he is and what he writes about.
   - The latest 5–10 articles: title, date, one-line summary, tags.
   - Small links to About, Writing, Research, and contact/socials.
   - No splash screen.
2. **Writing (article index)**
   - Chronological list, filterable by tag.
   - Likely topics: networking protocols, eBPF and Linux internals, fault injection and software safety, automotive E/E architecture and in-vehicle networks, agentic AI / LLM tooling for engineering, and notes from moving between academia, startups and industrial research.
3. **Article page.** This is the most important template; design it carefully.
   - Comfortable measure (about 65–75 characters).
   - Excellent code blocks: syntax highlighting, long lines scroll inside the block, optional filename caption, copy button.
   - Inline code, tables, footnotes, figures with captions, callouts/notes.
   - Optional maths (LaTeX).
   - Heading anchors, and an optional table of contents for long posts.
   - Date and "updated" date, estimated reading time, tags, previous/next links.
   - No comments section.
4. **About**
   - Short bio in first person.
   - Compact experience timeline: Bosch Corporate Research (2023–present), Fraunhofer IESE (2022–23), TU Kaiserslautern (2014–2022), Qurience co-founder (2021–22).
   - Education: Dr.-Ing. 2022, M.Sc. 2017 (TU Kaiserslautern); B.Tech. 2013 (CUSAT, India).
   - A small, non-gimmicky interests line (hiking; Arsenal fan).
   - Links: email, LinkedIn, GitHub (warlock20), Google Scholar, RSS.
   - Optional downloadable CV.
5. **Research**
   - Publications as a clean, date-sorted list: authors with his name emphasised, title, venue, year, links (IEEE, PDF). Four IEEE papers (PIMRC 2017, LCN 2019, IPCCC 2019, WCNC 2021).
   - The dissertation.
   - A few selected projects, e.g. WiPS (C++ WiFi protocol stack integrated into ns-3) and a WiFi topology explorer, each as a short card with tech tags.
   - This is supporting material. Keep it lean, not a resume dump.
6. **404** and a simple **Privacy/Impressum** page. He is based in Germany, so plan a footer link for an Impressum.

## Design requirements

- Light and dark mode, following the system setting, with a manual toggle.
- Mobile first, and fully usable at 360px width.
- Fast and static: no heavy JS frameworks at runtime, self-hosted or system fonts, and minimal third-party scripts. No trackers; privacy-friendly analytics only if any.
- Accessible: WCAG AA contrast, visible focus states, semantic headings, reduced-motion respected.
- Good social/OG cards for articles (title plus site name, generated from text rather than a photo).
- A simple typographic mark or monogram ("KM") instead of a logo image.

## Constraints for implementation

- The design will be implemented as a static site (Jekyll or Astro) with articles written in Markdown. Please define the design as reusable page templates and components (header, footer, article list item, tag, code block, callout, publication entry, project card, timeline entry) with a small token set: colour, type scale, spacing, and radius.
- Existing blog URLs follow `/:category/:slug/` (e.g. `/wireless/packet_sniffer_capture_wlan_ieee802.11/`). The article URL structure should stay compatible or redirectable.

## Deliverables

- Designs for Home, Writing index, Article (with realistic code-heavy sample content), About and Research, each on desktop and mobile, in light and dark.
- Design tokens and component specs as listed above.
