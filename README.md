# Svelte Matrix

A Svelte implementation of the ["Matrix digital rain"](https://en.wikipedia.org/wiki/Matrix_digital_rain) effect.

![Screenshot](https://github.com/bcairns/svelte-matrix/raw/main/screenshot.png)

---

I'm using this project to help me learn more about Svelte.


### Design Goals

- High-performance
- Simplicity, clarity, and readability

### Installation

`npm install` from project root.

### Usage

`npm run dev` from project root, then view http://localhost:8080/

### Approach

An early experiment employed CSS transitions for colour/opacity fading, but the sheer number of elements made this very non-performant.

The current approach updates colours directly every "tick" (100ms) which is very fast.

The essential algorithm is leading and trailing "cursors", and a loop to update character states in between.  (See components/Column.svelte)

---


### Links
- [Reference video](https://www.youtube.com/watch?v=rpWrtXyEAN0)
- [Half-width kana character set](https://en.wikipedia.org/wiki/Half-width_kana)

