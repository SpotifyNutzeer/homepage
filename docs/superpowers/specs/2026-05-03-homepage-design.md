# Personal Homepage `paul.wtf` — Design

**Status:** Brainstorm-Ergebnis, bereit für Implementierungs-Plan
**Datum:** 2026-05-03
**Owner:** Paul Reitmayer

## Ziel

Persönliche Homepage unter `paul.wtf` (Root-Domain). Keine Visitenkarte für Arbeitgeber, sondern bewusst persönliche Online-Präsenz mit offener Identität. Sprache: Deutsch. Theme: nur Dark.

Visuelles System wird aus dem `linkhop`-Projekt (Live unter `linkhop.paul.wtf`) übernommen, aber sparsamer eingesetzt — Glass-Surfaces für Karten und Hero, Fließtext direkt auf Canvas, damit die Lesbarkeit nicht leidet.

## Architektur

| Komponente | Wahl | Begründung |
|---|---|---|
| Framework | **Astro 4+**, Output `static` | Content-orientierte Site, kein SSR nötig, sehr wenig JS. |
| UI-Sprache | **`.astro`-Komponenten only** (kein Svelte/React/Inseln) | Keine relevante Interaktivität. Spart ~25 KB Runtime. |
| TypeScript | für Daten-Files (Projekte, Tools, Hardware, Sidefacts) | Type-Checking verhindert Tippfehler in Stack-Pills. |
| Package-Manager | **pnpm** | Konsistent mit linkhop. |
| Image-Pipeline | **`astro:assets`** (built-in) | Auto-Generierung WebP/AVIF + Responsive-Größen. |
| Styling | reine CSS-Tokens, portiert aus `linkhop/frontend/src/lib/theme/tokens.css` (nur Dark-Variante) | Konsistente Familie, kein Tailwind-Overhead. |

**Bewusst ausgelassen:** SSR, Adapter, Framework-Inseln, CMS, i18n-Layer, Theme-Toggle, Service-Worker.

## Repo-Struktur

```
homepage/
├── src/
│   ├── pages/
│   │   ├── index.astro                # die ganze Seite
│   │   └── 404.astro
│   ├── components/
│   │   ├── Nav.astro                  # sticky top nav, Glass-Background ab Scroll
│   │   ├── Hero.astro                 # asymmetric: Text links, Foto rechts
│   │   ├── About.astro                # 2-3 Absätze in Glass-Card
│   │   ├── Projects.astro             # featured + 2-Spalten-Grid
│   │   ├── ProjectCard.astro          # einzelne Karte
│   │   ├── Tools.astro                # Pills "Label Wert"
│   │   ├── Hardware.astro             # Workstation + Laptop + Server (3 Cards)
│   │   ├── Sidefacts.astro            # BMW + Pax + 4 Katzen
│   │   ├── Contact.astro              # 4 Kontakt-Tiles
│   │   └── Email.astro                # JS-rendered mailto
│   ├── styles/
│   │   └── tokens.css                 # aus linkhop portiert (dark only)
│   ├── data/
│   │   ├── projects.ts
│   │   ├── tools.ts
│   │   ├── hardware.ts
│   │   └── sidefacts.ts
│   └── assets/                        # bewusst commited, von astro:assets verarbeitet
│       ├── profilepicture.png
│       ├── linkhop-preview.webp       # via scripts/capture-linkhop.mjs erzeugt
│       ├── bmw.JPG
│       ├── pax.png
│       ├── eddy.JPG
│       ├── jessy.jpg
│       ├── lily.jpg
│       └── lucky.jpg
├── scripts/
│   └── capture-linkhop.mjs            # Headless-Chromium Screenshot von linkhop.paul.wtf
├── public/
│   ├── favicon.svg
│   ├── og-image.png                   # 1200x630, generisch
│   └── robots.txt
├── k8s/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── cert.yaml
│   └── ingress.yaml
├── .github/workflows/
│   ├── ci.yml                         # bei jedem Push: astro check + build
│   └── release.yml                    # bei Tag v*: Docker build + push GHCR
├── Dockerfile
├── nginx.conf
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

## Theme-Tokens

Portiert 1:1 aus `linkhop/frontend/src/lib/theme/tokens.css`, **aber:**
- nur die `:root[data-theme='dark']`-Werte; Light-Variante komplett entfernt
- `data-theme`-Selector entfernt — Dark ist `:root`-default
- Drift-Animation übernommen, mit `prefers-reduced-motion`-Respekt
- Atmospheric blobs (`--blob-a/b/c`) und Grain-Overlay übernommen
- `.glass`-Primitive übernommen

Alle drei Schriftfamilien aus linkhop:
- `--font-display`: Instrument Serif (Google Fonts, mit `<link rel="preconnect">` und `&display=swap`)
- `--font-body`: System sans
- `--font-mono`: ui-monospace (für Stack-Pills nicht zwingend, aber verfügbar)

## Inhalts-Sektionen

Sticky Top-Nav mit Anchor-Links:
`Über mich · Projekte · Tools · Hardware · Sidefacts · Kontakt`

### Hero (Variant B — asymmetric)

- **Links**: `<h1>` "Paul Reitmayer" mit Instrument Serif italic-Akzent auf Nachname, einzeilige Tagline, CTA "Projekte ansehen →"
- **Rechts**: `profilepicture.png` in Glass-Tile, ca. 240×240, abgerundet (`--r-lg`)
- Tagline ist Platzhalter — User redigiert
  - Initialer Vorschlag: *"Software-Engineer aus Bayern. Self-hosted Tools, Music-Tooling und alles, was dazwischen liegt."*

### About me

- 2–3 Absätze als Fließtext in einer Glass-Card
- Inhalts-Themen als Vorschlag (User redigiert):
  1. Wer du beruflich/aktuell bist
  2. Was dich an Self-Hosting / Music-Tooling reizt
  3. Was dich davon abhält, Closed-Source zu vertrauen
- Kein Now-Block (gestrichen).

### Projekte (Featured + 2-Spalten-Grid)

Daten in `src/data/projects.ts`:

| Karte | Featured | Stack-Pills | Live-URL | Repo |
|---|---|---|---|---|
| **linkhop** | ✓ (groß, mit Visual-Slot oben für `linkhop-preview.webp`) | SvelteKit, TypeScript, FastAPI, Python, Postgres, Redis, Docker, FluxCD, RKE2 | linkhop.paul.wtf | github.com/SpotifyNutzeer/linkhop |
| **luna-plugins** | — | TypeScript, esbuild, Tidal Luna API | — | github.com/SpotifyNutzeer/luna-plugins |
| **streamcontroller-tidal** | — | Python, WebSockets, StreamController API | — | github.com/SpotifyNutzeer/streamcontroller-tidal |

**Pre-Step (außerhalb dieses Repos):** `streamcontroller-tidal` muss vor Launch öffentlich auf GitHub liegen. Das lokale Verzeichnis ist aktuell *kein* Git-Repo. Aufgaben:
1. `git init` + erster Commit
2. Bug-Fix in `manifest.json`: `"github": "https://github.com/paul/streamcontroller-tidal"` → `"https://github.com/SpotifyNutzeer/streamcontroller-tidal"`
3. Push als public Repo nach `git@github.com:SpotifyNutzeer/streamcontroller-tidal.git`

**linkhop-Screenshot:** `scripts/capture-linkhop.mjs` mit Playwright (Headless-Chromium), nimmt Viewport-Screenshot von `https://linkhop.paul.wtf`, optimiert via `sharp` zu `linkhop-preview.webp`. Manuell aufrufen via `pnpm capture-linkhop`. Output ist in Git eingecheckt.

### Tools (Software)

Eine kompakte Glass-Card mit `Label Wert`-Pills (wrappt auf Mobile). Daten in `src/data/tools.ts`:

| Label | Wert |
|---|---|
| OS | Arch Linux |
| WM | Hyprland |
| Bar/Shell | Quickshell |
| Shell | fish |
| Editor | Vim |
| Terminal | kitty |
| Browser | Brave |
| Music | Tidal |

### Hardware (3 Cards: Workstation, Laptop, Server)

Daten in `src/data/hardware.ts`.

**Workstation** (große Glass-Card, 4 Sub-Blocks vertikal untereinander mit Kategorie-Headern als kleine Uppercase-Labels):

- **Compute**: AMD Ryzen 9 9950X3D · MSI GeForce RTX 4090 Gaming X Trio · 96 GB Kingston Fury Renegade DDR5-6000 CL32 · Crucial T700 1 TB NVMe + Crucial P310 4 TB NVMe
- **Peripherals**: Keychron Q1 Max · Logitech G Pro X Superlight 2 Lightspeed
- **Displays**: Alienware AW3225QF · Alienware AW3425DWF · Corsair Xeneon Edge
- **Audio**: Fiio FT1 (32 Ω) · Fosi Audio ZH3 · Rodecaster Duo 2 · Shure SM7B

**Laptop** (kompakte Glass-Card, eine Zeile):
> MacBook Pro 14,2" (M4 Pro) · 12-core CPU / 16-core GPU · 24 GB RAM · 512 GB SSD

**Server** (separate Glass-Card, Label *„Hosted bei TubeHosting"*):
- Ryzen 9 7950X3D · 192 GB RAM
- 2× 512 GB NVMe (RAID 1, Proxmox-Boot) · 2× 4 TB NVMe (RAID 1, VM-Storage) · 4× 16 TB HDD (RAID 10, Bulk-Storage)
- Uplink: 2× 10 GbE LACP-Bond

### Sidefacts ("Wenn ich nicht vor dem Bildschirm sitze")

Daten in `src/data/sidefacts.ts`. Layout:

**Reihe 1** — 2 große Cards nebeneinander (1:1 Aspect, Bild + Text):
- **BMW i4 eDrive35** — Bild `bmw.JPG`, Text: *"Mein erstes E-Auto. Ich bin sehr positiv überrascht."* (User darf umformulieren)
- **Pax** (Fursona, Card muss Hochformat-Bild `pax.png` 545×1047 handhaben — Bild rechts schmal, Text links):
  - Arctic Fox · he/him · 22
  - *"Playful, curious, a bit of a gremlin. Chaotic energy with a techy, clever streak underneath."*
  - Likes: Tinkering with tech, cold weather, snacks, poking at things that say "do not touch"
  - Dislikes: Proprietary software, slow Wi-Fi, people who say "it works on my machine"

**Reihe 2** — 4 kleine Photo-Cards in 4-Spalten-Grid (responsive: 2×2 auf Tablet, 1-Spalte auf Mobile):

| Bild | Name | Persönlichkeit |
|---|---|---|
| `eddy.JPG` | Eddy | liebenswert, aber stur. Bekommt immer was er will. |
| `lily.jpg` | Lily | eine kleine Kuschelprinzessin. |
| `lucky.jpg` | Lucky | Unruhestifter, zur richtigen Zeit aber auch kuschelig. |
| `jessy.jpg` | Jessy | schläft mehr als sie wach ist. |

### Kontakt

4 Glass-Tiles in einem Grid, jeweils mit lokalem SVG-Icon (kein FontAwesome / CDN):

| Kanal | Wert | Verhalten |
|---|---|---|
| GitHub | `github.com/SpotifyNutzeer` | Standard `<a href>` |
| Discord | Username `paul.wtf` | **Click-to-Copy** über `navigator.clipboard.writeText`. Visuelles Feedback: Inline-Label-Wechsel `paul.wtf` → `Kopiert!` für 1.5 s, dann zurück. |
| YouTube | `youtube.com/@spotifynutzer` | Standard `<a href>` |
| Email | `paul.reitmayer@paul.wtf` | **JS-rendered**: HTML enthält kein Klartext-Email. Pattern: `<button data-user="paul.reitmayer" data-domain="paul.wtf">` mit Vanilla-JS-Click-Handler, der `location.href = "mailto:" + user + "@" + domain` setzt. Anzeige im Button: Email als Text wird beim DOMContentLoaded zusammengesetzt. Hält 90% Bot-Scraper ab; ist kein Crypto. |

## Deployment

### Container-Build

Multi-stage `Dockerfile`:
- **Stage 1** (`node:lts-alpine`): pnpm enabled, `pnpm install --frozen-lockfile`, `pnpm build` → `/app/dist`
- **Stage 2** (`nginx:alpine-slim`): COPY `dist` nach `/usr/share/nginx/html`, COPY `nginx.conf`

Image: `ghcr.io/spotifynutzeer/homepage`. Architektur: nur `linux/amd64`. Server ist x86, multi-arch wäre Aufwand ohne Nutzen.

### nginx.conf

- `gzip on`, `gzip_static on` (Astro generiert `.gz`-Sidecars beim Build)
- Lange Cache-Header für `/_astro/*` (1 Jahr immutable, weil hashed Filenames)
- Kurze Cache-Header für HTML (`no-cache` oder `max-age=300`)
- Security-Headers: `X-Content-Type-Options nosniff`, `Referrer-Policy strict-origin-when-cross-origin`, minimale `Permissions-Policy`
- `error_page 404 /404.html`
- **Kein HSTS** — wird von Traefik vorgesetzt

### CI/CD (GitHub Actions)

`.github/workflows/ci.yml` — bei jedem Push & PR:
- `pnpm install --frozen-lockfile`
- `pnpm astro check` (TS + Astro-Validation)
- `pnpm build` (Build muss durchlaufen)

`.github/workflows/release.yml` — bei Tag-Push `v*`:
- Build des Docker-Images
- Push zu `ghcr.io/spotifynutzeer/homepage:<tag>`
- **Kein `latest`-Tag** — verhindert ungewollte Updates beim FluxCD-Reconcile

### Kubernetes (`k8s/`)

| Datei | Inhalt |
|---|---|
| `namespace.yaml` | Namespace `homepage` |
| `deployment.yaml` | 1 Replica, Container-Image als Tag-Referenz, `imagePullPolicy: IfNotPresent`, Resources req `50m/64Mi` / limit `200m/128Mi`, `readinessProbe` HTTP `/`, `livenessProbe` HTTP `/` |
| `service.yaml` | ClusterIP, Port 80 → 80 |
| `cert.yaml` | cert-manager `Certificate` für `paul.wtf`, Secret `homepage-tls`, ClusterIssuer `lets-encrypt` |
| `ingress.yaml` | Traefik Ingress, Class `traefik`, Annotations: `traefik.ingress.kubernetes.io/router.entrypoints: websecure`, `external-dns.alpha.kubernetes.io/hostname: paul.wtf`, `external-dns.alpha.kubernetes.io/cloudflare-proxied: "false"`, TLS-Secret `homepage-tls` |

### FluxCD-Integration (separates Folge-Projekt)

**Nicht Teil dieses Repos.** Folgt nach Erst-Deployment, im `paulwtf-infra/fluxcd`-Repo unter `apps/homepage/`:
- `GitRepository` zeigt auf `homepage`-Repo
- `Kustomization` mit `path: ./k8s` zeigt auf die Manifests im `homepage`-Repo
- Updates der Manifests im `homepage`-Repo fließen automatisch — sauberes GitOps, keine Doppelpflege.

### Lokale Verifikation

- `pnpm dev` für Astro-Dev-Server (HMR)
- `pnpm build && pnpm preview` für statische Vorschau
- `docker build -t homepage . && docker run -p 8080:80 homepage` für End-to-End-Test mit nginx vor Push

## Testing

Bewusst minimal:
- `pnpm astro check` als CI-Gatekeeper
- `pnpm build` muss durchlaufen
- **Keine** Component-Tests (Vitest), **keine** E2E-Tests (Playwright)
- Browser-Spot-Test bei UI-Änderungen, manuell durch User

ROI für Test-Infrastruktur ist auf einer 1-Page-Static-Site lächerlich; Wartungskosten übersteigen Nutzen.

## Optional aufgenommen

- **`@astrojs/sitemap`** — generiert `sitemap-index.xml` automatisch, 0 Aufwand
- **OpenGraph + Twitter Meta-Tags** im `<head>`, jeweils:
  - `og:title`, `og:description`, `og:url`, `og:type=website`, `og:image` (absolute URL auf `/og-image.png`), `og:locale=de_DE`
  - `twitter:card=summary_large_image`, `twitter:image`
- statisches `og-image.png` (1200×630) im `public/`-Ordner — schlicht, Name + Tagline auf Mesh-Gradient-Hintergrund passend zum Site-Theme
- **`favicon.svg`** mit Initial-Monogramm „PR"

## Out of Scope (V1, nicht "später", sondern "nein")

- Theme-Toggle (Light + Dark)
- i18n / Mehrsprachigkeit
- Now-Block
- Blog / Notes
- Search
- Analytics / Tracking
- RSS Feed
- Lighthouse CI
- humans.txt / security.txt
- Multi-Arch Container-Build
- Helm-Chart

## Asset-Liste (vom User geliefert)

Aktuell unter `images/`, werden beim Implementieren nach `src/assets/` verschoben:

- `profilepicture.png` — Hero
- `bmw.JPG` — Sidefact: BMW i4
- `pax.png` (545×1047, Hochformat — Card-Layout muss damit umgehen)
- `eddy.JPG`, `lily.jpg`, `lucky.jpg`, `jessy.jpg` — Katzen-Cards

Noch nicht vorhanden, wird beim Build erzeugt:
- `linkhop-preview.webp` (via `scripts/capture-linkhop.mjs`)

Noch zu erstellen beim Implementieren:
- `favicon.svg`
- `og-image.png` (1200×630, schlicht)

## Pre-Steps außerhalb dieses Repos

1. **`streamcontroller-tidal`** lokal initialisieren (`git init` + Commit), `manifest.json`-Bug fixen (`paul` → `SpotifyNutzeer`), public auf GitHub pushen.
2. **`fluxcd`-Repo** danach: `apps/homepage/` mit `GitRepository` + `Kustomization` anlegen.

## Texte, die User noch liefert

- Finale Hero-Tagline (Platzhalter im V1 OK)
- Finaler About-Me-Text (Platzhalter im V1 OK)

Diese können nach Launch jederzeit per Edit der Astro-Komponenten geändert werden — keine Build-Pipeline-Voraussetzung.
