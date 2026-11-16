# Margin Notes

A small responsive blog built with React and Vite. Posts, authors, and comments load from JSONPlaceholder. New comments are submitted to its demo API and added to the page; JSONPlaceholder does not persist submitted comments between reloads.

## Run the app

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`. To check the code, run `npm run lint`.

## Project structure

- `src/components/` contains the header, blog post, comment section, and footer.
- `src/api.js` contains the shared JSONPlaceholder request helper.
- `src/components/BlogPostsPage.jsx` loads the post list.
- `src/components/IndividualPostPage.jsx` loads an individual post, its author, and its comments.
- `src/App.jsx` assembles the page sections.
- `src/App.css` and `src/index.css` contain the page styles and design tokens.
