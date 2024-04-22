---
published: true
name: 'optimizing my sveltekit blog'
icon: 'ph:code'
description: improving performance on a static sveltekit site
date: 2024-04-15
ogImage: 'og-image.png' 
---

<script>
    import Image from '$lib/components/Image.svelte';
</script>

<style lang="scss">
    figure {
        margin: 1.5rem 0;
    }
    figure .comparison {
        display: flex;
        margin: 0;
        overflow: hidden;
    }
    figure figcaption {
        font-size: 1rem;
        text-align: center;
        margin-top: 1.5rem;
    }
    .details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        width: 10rem;
        background: var(--bg-2);
    }
    .details p {
        margin: 0;
    }
    :global(figure picture) {
        margin: 0;
    }
    @media (max-width: 700px) {
        figure .comparison {
            flex-direction: column;
        }
        .details {
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .details div {
            text-align: center;
        }
    }

    .sidebyside {
        gap: 1rem;
        display: flex;
        margin: 1.5rem 0;
    }
    .sidebyside.vertical {
        flex-direction: column;
    }
    :global(.sidebyside picture) {
        margin: 0;
    }
</style>

After building this site, I've started down the rabbit hole of making it as smooth and fast as possible. To be fair, SvelteKit is already really fast out of the box, so there wasn't a ton to do. But there were still some ways to improve performance.

## prerendering

Since this site doesn't have any dynamic content, I can use prerendering. This essentially turns SvelteKit into a static site generator (SSG) like Eleventy or Hugo. SvelteKit (through Vite) will render all the pages at build time to generate static HTML files. This is good for performance because the pages don't require any extra server-side or client-side Javascript to load. However, unlike other SSGs, prerendered SvelteKit still allows for client-side hydration, so I can still use smooth client-side routing and transitions.

To enable prerendering on all pages, I added this to the root `+layout.js`:

```js
export const prerender = true;
```

The great thing about prerendering is that you don't have to change the structure of your site. You can still load data in `load` functions. The only difference is that it will just run once.

## static adapter

I also switched to `@sveltejs/adapter-static` from the auto adapter. Since the entire site is already prerendered, it shouldn't make much of a performance difference. But it does eliminate usage of serverless functions, and gives me the flexibility to host the site on other static hosting services.

`svelte.config.js`:

```js
import adapter from '@sveltejs/adapter-static';
...
const config = {
    ...
    kit: {
        adapter: adapter(),
        ...
    }
};
export default config;
```

## images

Images are essential to site performance because they are usually the largest files.

Traditional image formats like JPEG and PNG are not very efficient. Modern formats like AVIF and WebP have better compression, so they take up less space and load faster. These should be used whenever possible.

<figure>
    <div class="comparison">
        <Image image="beach.png" alt="a dark, stormy beach" sizes="40rem" />
        <div class="details">
            <div>
                <p>beach.png</p>
                <code>834KB</code>
            </div>
            <div>
                <p>beach.jpg</p>
                <code>58KB</code>
            </div>
            <div>
                <p>beach.webp</p>
                <code>44KB</code>
            </div>
            <div>
                <p>beach.avif</p>
                <code>24KB</code>
            </div>
        </div>
    </div>
    <figcaption>file size comparison of different image formats</figcaption>
</figure>

Loading a high resolution image on a low resolution or small screen is also a waste of resources. Images should be sized appropriately for users' screens.

These optimizations can be achieved using an html `<picture>` element with multiple `<source>` elements, which allows the browser to automatically choose the best format and size for the user. The final `<img>` element serves as a fallback for older browsers.

```html
<picture>
    <source srcset="photo.avif, photo2x.avif 2x" type="image/avif" />
    <source srcset="photo.webp, photo2x.webp 2x" type="image/webp" />
    <img src="photo.jpg" alt="photo" />
</picture>
```

Generating all the different formats and sizes for each image manually is tedious, so I'd like to automate this process.

SvelteKit actually has a built-in image component that can accomplish this, called `<enhanced:img>`. Back when I started building the site it was still quite buggy and did not fully support the type of dynamic importing I use for project/blog page images. The `svelte-image` library seemed to be a good solution, but I decided to write my own image component for simplicity and more fine-grained control.

Even though I am not using the `<enhanced:img>` component itself, I can still take advantage of its `enhanced` query to generate the different sizes and formats for each image. This relies on the amazing `vite-imagetools` plugin, which provides a ton of different directives for image processing.

To do this, `enhancedImages` needs to be added to `vite.fconfig.js`:

```js
import { enhancedImages } from '@sveltejs/enhanced-img';
...
export default defineConfig({
    plugins: [
        enhancedImages(),
        ...
    ],
    ...
});
```

And this is the actual image component `Image.svelte`:

```svelte
<script>
    export let image,
        alt,
        sizes = '',
        loading = 'eager';

    async function importImage(image) {
        const pictures = import.meta.glob(`/src/content/*/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`, {
            import: 'default',
            query: {
                enhanced: true,
                w: '2400;2000;1600;1200;800;400'
            }
        });

        for (const [path, src] of Object.entries(pictures)) {
            if (path.includes(image)) {
                return await src();
            }
        }
    }
</script>

<picture>
    {#await importImage(image) then src}
        <source srcset={src.sources.avif} type="image/avif" {sizes} />
        <source srcset={src.sources.webp} type="image/webp" {sizes} />
        <img
            src={src.img.src}
            {alt}
            {loading}
            onload="this.style.opacity=1"
            width={src.img.w}
            height={src.img.h}
        />
    {/await}
</picture>

<style>
    picture {
        aspect-ratio: var(--aspect-ratio, auto);
    }

    img {
        width: var(--width, 100%);
        height: var(--height, auto);
        aspect-ratio: var(--aspect-ratio, auto);
        object-fit: cover;
        transition: opacity 0.2s;
        opacity: 0;
        margin: auto;
    }
</style>

```

Since images in my project live in subdirectories of `src/content`, I use Vite's `import.meta.glob` to get all images in these directories, and then loop through them to find and import the right image. This might seem inefficient, but everything will be prerendered and bundled at build time, so it doesn't matter.

Notice the `query` option in the `import.meta.glob`. Setting `enhanced: true` enables the enhanced behavior and allows me to pass in options like `w:'2400;2000;1600;1200;800;400'`, which tells `vite-imagetools` to generate multiple sizes of each image at build time. The generated source sets can then be passed into the `<source>` elements.

One benefit of this approach is that it allows me to set image `width` and `height` properties dynamically, which is useful for preventing content layout shift (CLS) when the image loads. However, other image properties like `sizes`, `alt` and `loading` must be passed into the component as props. CSS variables can also be passed in as props to control the image's aspect ratio, width, and height.

Using the component like this:

```svelte
<Image 
    image="midnight-v1.png" 
    alt="the first version of midnight discord" 
    sizes="50rem" 
    loading="lazy"
/>
```

will generate the following HTML:

```html
<picture class="s-wHckl4XSACcy">
    <source 
        srcset="/@imagetools/96f598a3997db083bb980220332563939ad2af87 2400w, /@imagetools/3721f5c8ad64319e1caf708047983b695ca7cd9c 2000w, /@imagetools/c632f76e9f05cce9734ea7535e5ad14005b03ebe 1600w, /@imagetools/ca1280947df6e073f98d88310a4d8d812506b1fe 1200w, /@imagetools/313d81b7490cb9d75120ffa6db820dccb5e4edf9 800w" 
        type="image/avif" 
        sizes="50rem" 
        class="s-wHckl4XSACcy"
    />
    <source 
        srcset="/@imagetools/409d509e52dff92a06fce5fd818c590d8fe99a57 2400w, /@imagetools/8eb3809cde82244f11df59d43b7734affea18154 2000w, /@imagetools/432ab6b89a1a4a3fa4e996d0f492697f6f118e25 1600w, /@imagetools/a4c6b9e6fe20b891b5af00eecf8eea4dcce899eb 1200w, /@imagetools/fb0883bc11fbc55ebe49fcdab73417ebf6d524b1 800w" 
        type="image/webp" 
        sizes="50rem" 
        class="s-wHckl4XSACcy"
    />
    <img 
        src="/@imagetools/fd74dd053b2780680a1011c3316a12f93316e8de" 
        alt="the first version of midnight discord" 
        loading="lazy" 
        onload="this.style.opacity=1" 
        width="2400" 
        height="1347" 
        class="s-wHckl4XSACcy" 
        style="opacity: 1;"
    />
</picture>
```

This image component is not the most elegant method, but it succeeds at automating image optimization.

## fonts

Fonts are another important aspect of site performance. They can also be quite large files, especially if they are not optimized.

Google Fonts is a popular choice for web fonts, but it can be slow to load and will block rendering until the fonts are downloaded. I don't like relying on external services, so I self-host the fonts using Fontsource. Fontsource allows open-source fonts to be easily imported into a project as npm packages.

In order to reduce the number of font files that are downloaded, I only import the necessary weights and subsets for each font. For example, I only need the `400` weight and the Latin subset for the `Space Mono` font. I don't need other subsets such as Vietnamese characters. In addition, I only want to use woff2 files, which are more efficient than other formats.

Unfortunately, Fontsource doesn't provide a method for such specific subsetting, so I have to manually create font declaration css files for each font by copying the necessary declarations from the Fontsource package. This is a bit tedious and undermines Fontsource's convenience as an updatable npm package, but it's still the easiest method I'm aware of. Fonts are not updated very often, so I'm willing to accept the tradeoff.

For example, this is the `space-mono.css` file:

```css
/* space-mono-latin-400-italic */
@font-face {
    font-family: 'Space Mono';
    font-style: italic;
    font-display: swap;
    font-weight: 400;
    src: url(@fontsource/space-mono/files/space-mono-latin-400-italic.woff2) format('woff2');
}

/* space-mono-latin-400-normal */
@font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url(@fontsource/space-mono/files/space-mono-latin-400-normal.woff2) format('woff2');
}
```

This file is then imported in the root `+layout.svelte`:

```svelte
<script>
    import '$lib/assets/fonts/space-mono.css';
    ...
</script>
```

Fonts are crucial for rendering the site correctly, so it's important to load them as quickly as possible. This can be achieved by preloading the fonts with the `preload` link tag. In Sveltekit, the font file links are generated dynamically based on the fonts you import, so you cannot directly add the `preload` tag. Instead, a special `preload` filter in the `handle` hook exists to configure preloading. By default, Sveltekit preloads only css and js, so the `font` type must be added to the filter.

In `hooks.server.js`:

```js
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    return resolve(event, {
        preload: ({ type }) => {
            return type === 'font' || type === 'js' || type === 'css';
        }
    });
}
```

Now, in the build output HTML, the font files will be preloaded:

```html
<link 
    rel="preload" 
    as="font" 
    type="font/woff2" 
    href="/_app/immutable/assets/space-mono-latin-400-italic.DaE23bd9.woff2" 
    crossorigin
/>
<link 
    rel="preload"
    as="font"
    type="font/woff2"
    href="/_app/immutable/assets/space-mono-latin-400-normal.Co7bH5Hm.woff2"
    crossorigin
/>
```

## inline css

Another way to improve performance is to inline CSS. Usually, this refers to adding inline style tags directly to HTML elements. SvelteKit is not capable of this, but it can inline CSS as a giant style tag in the head of the document, instead of linking to an external CSS file.

Inlining CSS can improve performance because it eliminates the need for an extra request to fetch an external CSS file. However, it prevents the browser from caching the CSS file, so while the initial load time can be faster, subsequent navigations may be slower. For a static blog site like this one, where users are arriving from external sources and probably only visiting a few pages, this tradeoff is worth it.

Additionally, according to this [Hacker News comment](https://news.ycombinator.com/item?id=39855863), inlining css may be especially effective on sites with hydration and client-side navigation (like this one), because the inlined layout CSS does not need to be re-requested on subsequent navigations.

To inline CSS in SvelteKit, the `inlineStyleThreshold` option can be set to determine the maximum size of inlined files. By setting it to `Infinity`, all CSS files will be inlined. However, this introduces [a bug](https://github.com/sveltejs/kit/issues/6720) with relative paths in CSS files that prevents fonts from loading correctly. The `paths.relative` option can be set to `false` to work around this.

In `svelte.config.js`:

```js
const config = {
    ...
    kit: {
        ...
        paths: {
            relative: false
        },
        inlineStyleThreshold: Infinity
    }
};
export default config;
```

## results

I'm not going to individually test the performance improvement of each change, but I can show that they combine to make my site much faster. I've gone back and disabled each optimization to measure the impact. I ran [WebPageTest](https://www.webpagetest.org/) on the page <https://www.refact0r.dev/blog/bus>, which is my largest blog post. It is hosted on Vercel's free tier. Here are the results:

mobile (unoptimized vs optimized):

<div class="sidebyside vertical">
    <Image image="webpagetest-mobile-unoptimized.png" alt="unoptimized webpagetest mobile score" />
    <Image image="webpagetest-mobile-optimized.png" alt="optimized webpagetest mobile score" />
</div>

desktop (unoptimized vs optimized):

<div class="sidebyside vertical">
    <Image image="webpagetest-desktop-unoptimized.png" alt="unoptimized webpagetest desktop score" />
    <Image image="webpagetest-desktop-optimized.png" alt="optimized webpagetest desktop score" />
</div>

You can see from the page weight on right that the optimized site is much smaller, primarily due to the image optimizations. Speed index has improved from 1.8s to 1.2s on mobile and 0.9s to 0.5s on desktop. Improvements of this scale are definitely noticeable by users. On desktop there is no difference, but total blocking time has decreased to basically zero on mobile, likely due to the inlined CSS and preloaded fonts. The site is now much faster and more efficient.

## conclusion

There are still a few things I'd like to do, such as setting more detailed `sizes` attributes on all images and eventually using the `<enhanced:img>` component. But for now, I'm happy with the performance of my site.

All the source code is available on [GitHub](https://github.com/refact0r/personal).

I hope this post has been helpful or at least interesting. If you have any feedback, feel free to [contact me](/contact).
