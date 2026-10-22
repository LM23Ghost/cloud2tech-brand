# Cloud2Tech Website

The Cloud2Tech company website, built with Vite and TypeScript and hosted on GitHub Pages.

## Local development

```powershell
npm install
npm run dev
```

Create a production build with `npm run build`; Vite writes the static site to `dist/`.

The contact form opens a prefilled email in the visitor's email application. It does not submit data to a server.

GitHub Actions deploys `dist/` to GitHub Pages when changes are pushed to `main`.