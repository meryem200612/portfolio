# Personal Portfolio Website

React + Vite + Tailwind CSS portfolio website.

## Development

- `npm run dev` starts the development server with hot reload.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.
- `npm run format` formats the project with oxfmt.

## Project Structure

- `src/App.tsx` contains the portfolio sections and interactive components.
- `src/index.css` contains global styles, animations, and the Tailwind CSS v4 theme.
- `src/main.tsx` is the React entry point.
- `index.html` contains the HTML shell and page metadata.
- `vite.config.ts` configures Vite, React, Tailwind CSS, and the `@` source alias.

## Styling

Use Tailwind CSS v4 utility classes in JSX. Global styles and theme customization belong in `src/index.css`, which imports Tailwind with `@import 'tailwindcss';`. Keep CSS `@import` statements first.
