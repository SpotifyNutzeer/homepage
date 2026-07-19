# homepage

Personal homepage for [paul.wtf](https://paul.wtf). German, dark-only, styled after the »zen« variant of my quickshell/Hyprland desktop theme ([dotfiles](https://github.com/SpotifyNutzeer/dotfiles)): opaque Catppuccin-Mocha surfaces, zero borders, teal accent, JetBrains Mono, the desktop's screen frame with concave viewport corners, and the nav as a numbered workspace switcher.

## Stack

Astro 5 (static), TypeScript, Vanilla JS for the small interactive bits (mailto and Discord click-to-copy). nginx for serving, plain Kubernetes manifests for deployment.

Design spec: [`docs/superpowers/specs/2026-05-03-homepage-design.md`](docs/superpowers/specs/2026-05-03-homepage-design.md)
Implementation plan: [`docs/superpowers/plans/2026-05-03-homepage.md`](docs/superpowers/plans/2026-05-03-homepage.md)

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm astro check  # type-check
pnpm build        # outputs dist/
pnpm preview      # serves dist/ locally
```

### Regenerate the project previews

`Projects.astro` matches each preview to its featured project by filename
(`<project.name>-preview.webp` in `src/assets/`), so a new featured project gets
its screenshot the moment the asset exists — no code change needed.

Playwright needs a Chromium-family browser. On NixOS the bundled Chromium won't
run, so point `BROWSER_BIN` at one instead of `playwright install chromium`:

```bash
# linkhop — its live site is the preview
BROWSER_BIN=$(which brave) pnpm capture-previews         # -> linkhop-preview.webp

# tidalwave — its public page is a login gate, so we shoot the dashboard from a
# locally-running frontend with a mocked stats API (see the script header):
#   (cd ../tidalwave/frontend && pnpm install && pnpm dev --port 4319)
TW_URL=http://localhost:4319 BROWSER_BIN=$(which brave) pnpm capture-tidalwave-demo
```

### Regenerate the OG image

```bash
node scripts/generate-og.mjs            # writes public/og-image.png
```

## Build & run container locally

```bash
docker build -t homepage:dev .
docker run --rm -p 8080:8080 homepage:dev
```

## Release

Tagged releases push to GHCR via GitHub Actions:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Image lands at `ghcr.io/spotifynutzeer/homepage:v0.1.0`. Update `k8s/deployment.yaml` (and the FluxCD-managed manifests) to point at the new tag.

## Deploy

Apply manifests in `k8s/` to the cluster. In production these are reconciled by FluxCD from `paulwtf-infra/fluxcd` (`apps/homepage/`), not applied by hand.
