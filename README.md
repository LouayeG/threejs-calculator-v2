# Three.js Calculator

An interactive 3D calculator built with React, TypeScript, Vite, and Three.js.

![Three.js Calculator demo](public/demo.gif)

## Overview

Three.js Calculator is a browser-based calculator rendered as a 3D object. The calculator can be rotated, zoomed, and used directly by clicking the 3D buttons.

The project focuses on combining a simple calculator experience with a polished WebGL interface using React Three Fiber.

## Features

- Interactive 3D calculator model
- Clickable calculator buttons
- Animated hover and press feedback
- Green LCD-style display
- Basic arithmetic operations
- Responsive full-screen canvas
- Custom lighting and material styling

## Tech Stack

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Drei
- Tailwind CSS
- shadcn/ui

## Getting Started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Project Structure

```txt
src/
  components/
    Calculator3D.tsx
    Footer.tsx
    calculator/
      CalculatorBody.tsx
      CalculatorButton.tsx
      CalculatorDisplay.tsx
  hooks/
    useCalculator.ts
  pages/
    Index.tsx

public/
  demo.gif
```

## Roadmap

- Keyboard input support
- Backspace and percentage operations
- Improved mobile controls
- More calculator functions
- Unit tests for calculator logic
- Optional 2D fallback for accessibility

## License

MIT
