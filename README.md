[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/KaruzG/nacho-almira)

# NACHO ALMIRA PORTFOLIO

The Nacho Almira portfolio is a high-performance web application built with Next.js 16 designed to showcase creative projects through a rich media experience. It features a public-facing gallery and a **secure administrative dashboard for content management.**

## Installation

Install the project with npm

```bash
git clone https://github.com/KaruzG/nacho-almira.git
cd nacho-almira
npm install
```

## Configuration

#### .ENV Configuration
Use the .env.example file as a template for the needed variables

```md
# MONGO DB
MONGODB_URI=""

# AUTH
ADMIN_EMAIL=""
AUTH_SECRET=""
#   Google Auth
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it.  
**No warranty is provided. Use at your own risk.**

## Home and project media

- In **Admin → Settings**, choose random selection per visit (the default) or a fixed published project. Home uses the main YouTube video, not the trailer. An unavailable fixed project falls back to random; no eligible projects produces an empty state.
- Enter the original video's pixel width and height in the project editor. These are manual declarations, not dimensions inferred from YouTube URLs or thumbnails. Changing the URL clears them. Older YouTube projects still play but are excluded from home until dimensions are provided. Existing HTTP/HTTPS main video URLs (including MP4) remain editable unchanged and play with native controls/fullscreen at their intrinsic aspect ratio on project pages, without invented metadata; they are never eligible for home. New or replacement main video URLs must be YouTube.
- Gallery uploads support JPEG, PNG, WebP, original animated GIF, and MP4 with H.264 video and optional AAC audio. Each file must be **at most 4,000,000 bytes**. This also applies to new trailers. Browser/device playback support still varies; an MP4 extension alone is insufficient.
- Cloudinary verifies format, dimensions, size and video codec. New gallery records retain these values; CRUD re-verifies new assets against the configured Cloudinary account. Existing media stays compatible without fabricated metadata or a migration. GIFs bypass Next's optimizer per image; no frame extraction or image transformation is applied.
- Trailers play only on hover-capable fine pointers and stop on exit/hidden tabs. Touch uses a static preview. Gallery MP4s use native controls without autoplay. YouTube uses container fullscreen when available and native controls otherwise. The existing detail autoplay and early-loop timing remain unchanged.

### Targeted validation

```bash
npm exec vitest -- run tests/admin tests/youtube
node cypress/run-media.mjs
npm run build
```

The Cypress command temporarily mounts real components at `/media-test-fixture`, starts Next on port 3219, mocks YouTube/playback, and removes the route and server afterward. It does not connect to production MongoDB or upload to Cloudinary. The GIF fixture has two decoded, distinct frames. Live provider uploads, actual device codecs and native fullscreen still require acceptance testing against the configured services/devices. A build requires `MONGODB_URI` to be defined; dynamic project routes do not query it during prerender.

## Screenshoots
<img width="1896" height="911" alt="image" src="https://github.com/user-attachments/assets/72f1b548-f0ab-461e-8d31-d100ab4c56c2" />
<img width="3098" height="5412" alt="nacho-almira vercel app_project_6a1c4cf3a19848a254c0beab (3)" src="https://github.com/user-attachments/assets/06094117-4db5-4dd5-89da-7c698341fd57" />

<img width="1904" height="907" alt="image" src="https://github.com/user-attachments/assets/b765b736-f293-494d-b96c-4b2e678116ec" />
