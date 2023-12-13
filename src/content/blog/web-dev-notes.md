---
title: Web Development Notes
pubDate: "2022-06-19"
tags: ["web", "dev", "nextjs", "react", "tips"]
draft: false
description: Because ML and Ops are not always done through the CLI...
---

# Preface

Admittedly, I have a fish brain. My memory is kind of all over the place these days. So, this serves as an easily accessible mental checkpoint for me.

The basic stack I mostly use and would definitely recommend for everyone to use is:

- Front-end: Nextjs

```sh
npx create-next-app --with-tailwind
```

- Style: Tailwindcss
- ORM: Prisma
- Back-end: SQL or Firestore

(Or as I discovered recently, use `npx create-t3-app@latest`)

I will improve the structure of this note page bits by bits as I write down more content.

# Into the Notes

## iOS

### Content overflow hidden underneath browser elements with `100vh`

tl;dr

```
  npm i postcss-100vh-fix
```

```js
// next.config.js
module.exports = {
  // other stuff...
  plugins: ["postcss-100vh-fix"]
};
```

```js
// postcss.config.js
module.exports = {
  plugins: [
    // other stuff
    "postcss-100vh-fix": {}
  ]
}
```

```css
/* globals.css */
@supports (-webkit-touch-callout: none) {
  body {
    height: -webkit-fill-available;
  }
}
```

Web development, by default, has to target most platforms (R.I.P. IE) to bring the best experience to the user. In iOS device case, that unfortunately means that we need to polyfill for the `vh` unit.

The problem statement is as follows:

> You want your root element to span the entire height of the screen, but the height of the screen is being overlaid by the status bar and the address bar on iOS devices. So, your content will overflow the screen, activating the scrollbar and your design specifically does not want it to behave that way.
