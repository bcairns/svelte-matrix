# Svelte Matrix

A Svelte implementation of the ["Matrix digital rain"](https://en.wikipedia.org/wiki/Matrix_digital_rain) effect.

![Screenshot](https://github.com/bcairns/svelte-matrix/raw/main/screenshot.png)

---

I'm using this project to help me learn more about Svelte.


### Design Goals

- High-performance
- Simplicity, clarity, and readability

### Installation

Requires [Node JS](https://nodejs.org/).

`npm install` from project root.

### Usage

`npm run dev` from project root, then view http://localhost:8080/

### Approach

An early experiment employed CSS transitions for colour/opacity fading, but the sheer number of elements made this very non-performant.

The current approach updates colours (as needed) directly every "tick" (100ms) which is very fast.  No DOM elements are created or destroyed after init.

The essential algorithm is leading and trailing "cursors", and a loop to update character states in between.  (See components/Column.svelte)

### Other

`npm run build` for a production build.  Currently compiles to just 7107 bytes of JS! :smiling_face_with_three_hearts:

---


### Links
- [Reference video](https://www.youtube.com/watch?v=rpWrtXyEAN0)
- [Half-width kana character set](https://en.wikipedia.org/wiki/Half-width_kana)

