---
published: true
name: papercut
description: an AI-powered academic search engine
thumbnail: papercut.png
images: [papercut.png, papercut1.png, papercut2.png]
github: https://github.com/refact0r/papercut
website: https://papercut-nu.netlify.app
---

Finding relevant sources to an investigation is a repetitive and surprisingly difficult task. Titles of research papers are often not truly indicative of the content, leading to missed gold and false prophets. Papercut is a web app designed to help find academic sources in a more streamlined manner. Specifically, it is a search engine for arXiv that provides AI-generated summaries of papers. Relevant sources can be saved to a list for later reference.

This project was created for [HackPNW](https://hackpnw.org/) Spring 2024 by [me](https://github.com/refact0r), [shibest](https://github.com/shibest), and [ben-6](https://github.com/ben-6) and [NicoNekoru](https://github.com/NicoNekoru). We won runner-up for Best Design.

Like many of my projects, Papercut is a SvelteKit web app. The search engine itself uses the arXiv API to get papers. I applied my learnings from the [Audibrief](/projects/audibrief) project, and used the serverless backend of SvelteKit to call the OpenAI API to summarize the papers. I would've liked to actually summarize entire papers, but ultimately, we were only able to summarize the abstracts.

I really enjoyed the design and branding aspect of the project, even though it was rushed. The pun on "papercut" (cutting papers into understandable summaries) was probably one of my best project names. The slash through the logo was a nice touch. Unfortunately I only had the time to really design the front page and part of the search page, with the rest of the site only looking "good enough" to be functional.

If we were to do this hackathon again, I would mainly focus on time and project management. We spent far too long discussing and deciding on the idea, leaving little time for actual development. There were a lot of features that we didn't have the time to implement or flesh out.
