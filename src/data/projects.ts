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
  }
];
