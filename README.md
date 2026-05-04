# homepage

Personal homepage for [paul.wtf](https://paul.wtf). German, dark-only, in the [linkhop](https://linkhop.paul.wtf) liquid-glass design family.

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

### Regenerate the linkhop preview

```bash
pnpm exec playwright install chromium   # one-time
pnpm capture-linkhop                    # writes src/assets/linkhop-preview.webp
```

### Regenerate the OG image

```bash
node scripts/generate-og.mjs            # writes public/og-image.png
```

## Build & run container locally

```bash
docker build -t homepage:dev .
docker run --rm -p 8080:80 homepage:dev
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
