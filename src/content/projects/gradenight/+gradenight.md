---
published: true
name: gradenight
description: an improved grade checker web app
thumbnail: gradenight.png
images: [gradenight.png, gradenight1.png, gradenight2.png]
github: https://github.com/refact0r/gradenight
website: https://gradenight.netlify.app
---

Gradenight was born out of frustration with the clunky, slow StudentVUE website that my school uses to track students' grades. I wanted to create a grades web app that would be easy to use and more visually appealing.

Gradenight was my first real experience with SvelteKit apart from todo lists, and it really taught me the intricacies of web development. This was the first project where I really had to consider performance, accessibility, mobile compatibility, privacy, and other factors.

To fetch data from StudentVUE's backend, I took advantage of the [StudentVue.js](https://github.com/StudentVue/StudentVue.js) library. While this library handled the annoying part of converting the XML data into a usable json format, I had to do a lot of work to process the data myself. This includes converting the string values into numbers, formatting names and dates, and generating graphs and dynamic colors.

In a funny twist of fate, one of my school's IT administrators noticed my website after I used it on school computers. He then proceeded to block the website for "taking student logins". This was a fair concern, as login credentials must be provided to access the StudentVue API. To prevent privacy and trust issues, I decided to keep login info locally in the browser as cookies, only using it to fetch data from the API.

The aspect of the app that I'm most proud of is the grades graph. I had to figure out how to wrangle my data to work with [chart.js](https://www.chartjs.org/) library and make it display properly. The hardest part was getting the graph to show color gradients based on the grade at each point. For example, if the grade trended from an A to a C over time, the graph would show a gradient of green to yellow.

In terms of design, the web app takes inspiration from my [midnight](/projects/midnight) discord theme, with rounded corners and a dark blue color scheme. Looking back on it, the web design has some clear issues, but it did look much better than the StudentVUE website.

Probably the most impactful aspect of the project was the "fake assignment" feature.
