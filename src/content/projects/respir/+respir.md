---
published: true
name: respir
description: breathing exercises to help you relax, focus, or sleep
thumbnail: respir.png
images: [respir.png, respir2.png, respir3.png, respir4.png]
github: https://github.com/refact0r/respir
website: https://respir.netlify.app
---

Respir is a web app that provides guided breathing exercises with visual and audio cues. It offers 3 preset breathing exercises and a breath holding test, but users can also create custom breathing exercises using their own timings. Custom exercises are saved locally and can be exported and imported as JSON data.

This project was created for the 2024 IPC Winter Hackathon by [me](https://github.com/refact0r), [shibest](https://github.com/shibest), and [ben-6](https://github.com/ben-6). We won best overall.

Respir is built with SvelteKit and uses browser localstorage for persistence. The most challenging part of this project was creating the breathing exercise controller and animations. Originally I relied on javascript `setInterval` functions, but I eventually switched to using `requestAnimationFrame` to ensure accurate timings and frame-perfect animations. Due to the relatively simple functionality, we were able to focus on making the UI and UX as smooth and intuitive as possible.
