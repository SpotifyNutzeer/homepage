export interface Project {
  name: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'linkhop',
    description:
      'Music-Link-Converter zwischen Streaming-Diensten. Self-hosted Alternative zu Odesli/song.link, mit ISRC/UPC-Matching für Track-Treue statt fuzzy Metadaten. Postgres-persisted Short-Links, Redis-Cache, OpenAPI-Docs.',
    stack: [
      'SvelteKit',
      'TypeScript',
      'FastAPI',
      'Python',
      'Postgres',
      'Redis',
      'Docker',
      'FluxCD',
      'RKE2'
    ],
    repoUrl: 'https://github.com/SpotifyNutzeer/linkhop',
    liveUrl: 'https://linkhop.paul.wtf',
    featured: true
  },
  {
    name: 'tidalwave',
    description:
      'Self-hosted Hörstatistik für Tidal. Da Tidal keine History-API bietet, läuft tidalwave über Last.fm: pollt user.getRecentTracks und aggregiert Top-Artists/Tracks/Alben, Listening-Clock und Scrobble-Verlauf in Postgres. Multi-User von Tag eins, mit optionalen Read-only-Share-Links.',
    stack: [
      'SvelteKit',
      'TypeScript',
      'FastAPI',
      'Python',
      'Postgres',
      'Helm',
      'FluxCD',
      'RKE2'
    ],
    repoUrl: 'https://github.com/SpotifyNutzeer/tidalwave',
    liveUrl: 'https://tidalwave.paul.wtf',
    featured: true
  },
  {
    name: 'luna-plugins',
    description:
      'Custom-Plugins für Tidal Luna. „Link Copy“ für Spotify- und YouTube-Links direkt aus dem Tidal-Kontextmenü.',
    stack: ['TypeScript', 'esbuild', 'Tidal Luna API'],
    repoUrl: 'https://github.com/SpotifyNutzeer/luna-plugins'
  },
  {
    name: 'streamcontroller-tidal',
    description:
      'StreamController-Plugin für Tidal-Wiedergabesteuerung über die TidaLuna WebSocket-API. Play/Pause, Skip, Volume, Now-Playing.',
    stack: ['Python', 'WebSockets', 'StreamController API'],
    repoUrl: 'https://github.com/SpotifyNutzeer/streamcontroller-tidal'
  },
  {
    name: 'rodecaster-tidal-bridge',
    description:
      'Brücke vom RodeCaster-USB-MIDI-Fader zur Tidal-Lautstärke, über das @vmohammad/api-TidaLuna-Plugin. Fader anlernen, als systemd-User-Service laufen lassen — der Hardware-Regler steuert die Wiedergabe.',
    stack: ['Python', 'ALSA MIDI', 'TidaLuna API', 'systemd'],
    repoUrl: 'https://github.com/SpotifyNutzeer/rodecaster-tidal-bridge'
  },
  {
    name: 'System-Setup',
    description:
      'Mein Desktop als Code: deklarative NixOS-Konfiguration (Flakes, modular nach Hosts & Home-Manager) plus Dotfiles — Hyprland, Quickshell-Bar/Shell (QML), fish, kitty.',
    stack: ['Nix', 'NixOS', 'Flakes', 'Hyprland', 'Quickshell', 'fish'],
    repoUrl: 'https://github.com/SpotifyNutzeer/nixos'
  }
];
