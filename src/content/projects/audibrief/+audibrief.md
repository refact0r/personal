---
published: true
name: audibrief
description: quick audio summaries of the daily news
thumbnail: audibrief.png
images: [audibrief.png]
github: https://github.com/refact0r/audibrief
website: https://audibrief.vercel.app
---

Audibrief is a web app that provides quick audio summaries of the daily news. It gets the top 5 news articles of the day from Google News and then uses AI to summarize and narrate them, creating easily digestible 1 minute audio summaries.

This project won 2nd place at EmP SmartHack Spring 2024.

Audibrief consists of a Sveltekit frontend and a Python Quart API server. The server gets the top 5 news articles from Google News' RSS feed and crawls them. The article content is then sent to OpenAI's GPT-3.5 Turbo to generate a summary. The summary is sent to either Elevenlabs' Turbo v2 or OpenAI's TTS-1 to generate the narrated audio. The frontend is very simple due to time constraints, but it does display all of the text and audio summaries and allow the user to play all of them sequentially.

There were quite a few challenges with interacting with APIs and parsing and formatting data properly. I originally used Flask for the server framework, but I later discovered that Quart was a newer alternative that supported async behavior, which was important when dealing with multiple slow APIs. I tried multiple different methods of getting article content, but ultimately settled on the Google News RSS feed. I was able to avoid most of the hassle of formatting crawled article content because of the BeautifulSoup library and GPT-3.5's reading comprehension skills. Dealing with the TTS APIs was a bit of a struggle but I was able to get the audio files working on the frontend by converting them to base64 in JSON.

The biggest issue I encountered was the speed and cost of the AI APIs. Generating multiple long audio files was slow and very expensive. It cost more than a cent for every run of 5 articles with OpenAI TTS-1, and I burned through 3 Elevenlabs free accounts during testing! So, I decided to cache the summaries and audio files. This initially seemed simple because of Python's cachetools, but it caused a ton of hidden issues due to the async nature of Quart. I eventually switched to the async-focused aiocache library. When I finally deployed the app, it turned out that the initial API requests was too slow and was timing out. I was forced to stream the data from the server to the frontend, which was quite a headache.
