# Perkakas - Just In Case Utilites

A collection of useful utilities.

##  Available Tools

- **Password Generator** - Generate secure, random passwords with customizable options
- **Days Counter** - Calculate days between dates with presets
- **JSON Prettify** - Format and beautify JSON data
- **Random Key Generator** - Generate WPA and WEP encryption keys
- **Text Diff** - Compare two texts and highlight differences
- **And more...**

## Setup

Install dependencies:

```bash
npm install
```

##  Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

##  Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

##  Deployment 

Generate static files:

```bash
npm run generate
```

Copy `.output/public` to your server, then configure Caddy:

```
yourdomain.com {
    root * /var/www/perkakas
    file_server
    try_files {path} /index.html
}
```

The `try_files` directive ensures client-side routing works correctly.

## Tech Stack

- **Framework**: Nuxt 4
- **Styling**: Tailwind CSS
- **Language**: JavaScript with JSDoc

## 📄 License

MIT
