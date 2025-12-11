# Tenzies Game

A simple and fast React implementation of the classic Tenzies game, optimized to score **100** in all Lighthouse metrics.
This project uses lazy initialization, accessible focus states, and smooth UX with confetti animations on win.

🌐 [Live site on Netlify](https://tenziesbyana.netlify.app/)

## Features

- Tenzies gameplay with interactive, clickable dice
- Lazy state initialization for improved performance
- Confetti animation on win (`react-confetti`)
- Accessible focus management and screen-reader announcements
- Unique die IDs generated with `nanoid`
- Automatic formatting, linting, and import/CSS organization using **Biome**

## Tools Used

- React
- Vite
- [react-confetti](https://www.npmjs.com/package/react-confetti)
- [nanoid](https://github.com/ai/nanoid#readme)
- [Biome](https://biomejs.dev/) for linting and formatting

## How to Play

1. Click **Roll** to roll the dice.
2. Click any die to **hold** its number.
3. Continue rolling until **all dice show the same value**.
4. When you win, a confetti animation appears.
5. Click **New Game** to reset the board.
