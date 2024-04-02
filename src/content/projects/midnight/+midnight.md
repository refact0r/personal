---
published: true
name: midnight
description: a dark, rounded discord theme
thumbnail: midnight.png
images: [midnight2.png, midnight-ctp.png, midnight-vc.png, midnight.png]
github: https://github.com/refact0r/midnight-discord
website: https://betterdiscord.app/theme/midnight
---

<script>
    import CaptionImage from '$lib/components/CaptionImage.svelte';
</script>

Midnight is a dark, rounded, and customizable theme for Discord. It is designed to be visually appealing but simple and performant, with minor improvements such as animations, corner rounding, and the Figtree font. The theme is completely customizable through CSS variables, and present "flavors" are available in the Github repository (including Catppuccin!).

## a brief history

The journey of midnight began with the typing test <https://monkeytype.com>. The website had a customizable theme system, so I made a super dark, bluish theme. Surprisingly, it was well received and was added to the website (my 4th ever pull request!).

<CaptionImage image="midnight-mt.png" alt="the original monkeytype midnight theme" sizes="50rem" loading="lazy"/>

I also began customizing various aspects of the Monkeytype interface using custom CSS. I had a lot of fun messing around and experimenting with CSS. Around the same time I discovered BetterDiscord, and I decided to tackle the challenge of creating a Discord theme myself.

### discord vs themes

The theming situation with Discord is quite interesting. Custom clients/themes/mods are against TOS, but millions of people use them anyway (and Discord doesn't seem to care). Discord's default dark theme is boring and bland. When they finally added new themes after years of requests, the themes were locked behind a paywall. So that's why custom clients and themes are so popular.

### v1

The first version of midnight was essentially a port of the Monkeytype theme colors into Discord, by overwriting Discord's color variables. I did change the colors to be less blue and more readable though.

<CaptionImage image="midnight-v1.png" alt="the first version of midnight discord" sizes="50rem" loading="lazy"/>

Eventually I added some CSS tweaks, such as separating the chat panels into rounded boxes (inspired by the Zelk theme), and adding MacOS-style window control buttons (inspired by the Tokyo Night theme). The more I added, the more I discovered how terrible Discord's CSS is. Almost half the theme was dedicated to fixing Discord's CSS so that their own variables would apply correctly. It was a bit of a mess, but it worked.

### rewrites

The thing with Discord themes is that they are never finished. Discord is constantly changing, and the theme has to be updated to keep up. In late 2022, I decided to rewrite the theme, removing redundant selectors, fixing most of the bugs in the process, and adding a new teal blue accent color. A similar process happened in July 2023, when I rewrote the theme again, this time adding corner rounding.

In late 2023 disaster struck, as Discord updated all of their CSS classes, breaking the theme completely. This prompted another rewrite. Thanks to the help of contributors, I was able to add even more features and improvements. In early 2024 I joined the Catppuccin discord server, and was inspired to create a Catppuccin-themed variant (which in my opinion is better than the offical Catppuccin discord theme). Thanks to a few contributors, a ton of new "flavors" were added as well.

<CaptionImage image="midnight-ctp.png" alt="midnight's catppuccin flavor" sizes="50rem" loading="lazy"/>

### concluding thoughts

And that's basically where the theme is now. I have been surprised with its success, gaining over 165,000 downloads on BetterDiscord and nearly 300 GitHub stars. I'm happy that I've been able to make something that so many people enjoy using. This project has also taught me a ton about CSS. Its been my longest running project so far, and I don't see it ending anytime soon.
