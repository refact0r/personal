---
published: true
name: system24
description: a tui-style discord theme 
thumbnail: s24-preview.png
images: [s24-ss.png]
github: https://github.com/refact0r/system24
website: 
---

System24 is a Discord theme that mimics the aesthetics of old-school text-based user interfaces (TUIs). It was heavily inspired by the [Spicetify "text" theme](https://github.com/spicetify/spicetify-themes/tree/master/text). The theme features a monospaced font, a darkened color scheme, sharp corners. Similar to many TUIs, each "panel" is labelled with a title and a border. The theme is completely customizable through CSS variables.

System24 represents a more ambitious evolution of my other Discord theme, midnight. I wanted to create a theme with a more distinct visual style, while also being "smarter" with how I themed things.

## a better? selector

Instead of using normal class selectors like this:

```css
.childWrapper_f316dd { ... }
```

system24 uses attribute selectors like this:

```css
[class^=childWrapper_] { ... }
```

This allows the theme to select the `childWrapper` class regardless of the hash (the `f316dd` part). This makes the theme more resilient to Discord updates, which often rerolls the hashes.

However, there are downsides to this approach, like requiring more keystrokes to write. More importantly, attribute selectors perform worse than class selectors. According to my benchmarks, attribute class selectors using the `^=` (starts with) operator take around 0.12ms, while class selectors take around 0.04ms. This performance hit is negligible for most users, but it can create some lag for those with slower hardware.

Recently, a few people in the Betterdiscord community developed a [class updater](https://syndishanx.github.io/Website/Update_Classes.html) that automatically updates class selectors. This makes the instability of class selectors less of an issue. Given the downsides of attribute selectors, I'm reconsidering my decision to use them in system24.

## the --white-500 headache

Most UI colors in discord are defined with variables like `--channeltextarea-background`. If I override this variable with my own theme color I know that I'm only changing the background of the channel textarea.

However, every single white icon or bit of white text is colored with a single variable: `--white-500`. Changing this variable is a huge headache because white is often used as a foreground color on top of many different background colors. If I change `--white-500` to black to contrast better with colored backgrounds, it will look terrible on dark backgrounds.

The only solution I've found is to manually override every single icon and text element that looks bad with the altered white color.

## borders and corners

One of the greatest successes and failures of midnight were the rounded corners. They were a defining feature, but they also took a lot of work to manually implement. For system24, I opted for sharp corners, which could largely be achieved with a simple rule:

```css
* {
    border-radius: 0 !important;
}
```

This didn't fully work with user profile images and status indicators, since they used SVG masks. This was took me a while to figure out, but eventually I got it working by removing the masks, hiding the status indicators, and using `::after` pseudo-elements to create a new square status indicator.

A defining feature of system24 are the borders around each "panel". These are simple enough to implement with a simple list of selectors. The new CSS nesting feature makes adding a color on hover much easier as well:

```css
[class^=panels_] /* user panel */,
[class^=sidebar_] > [class^=container_] /* channel list */,
[class^=chatContent_] > [class^=messagesWrapper_] /* chat */,
... {
    border: var(--border-width) solid var(--border-color);
    transition: border-color var(--border-transition);
    &:hover {
        border-color: var(--border-hover-color);
        &::after {
            color: var(--border-hover-color);
        }
    }
}
```

 but require some trickery because the main chat text box is nested inside the chat panel. Some trickery is required to make the chat box appear "outside" the panel while not screwing up dependent elements like the "someone is typing" indicator and "replying to message" bar.
