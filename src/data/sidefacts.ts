import type { ImageMetadata } from 'astro';
import bmwImg   from '../assets/bmw.jpg';
import paxImg   from '../assets/pax.png';
import eddyImg  from '../assets/eddy.jpg';
import lilyImg  from '../assets/lily.jpg';
import luckyImg from '../assets/lucky.jpg';
import jessyImg from '../assets/jessy.jpg';

export interface Cat {
  name: string;
  personality: string;
  image: ImageMetadata;
}

export const bmw = {
  image: bmwImg,
  text: 'Mein erstes E-Auto. Ich war skeptisch, aber das Fahrgefühl hat mich überzeugt — und Laden, Reichweite und Routenplanung sind für mich überraschend unkompliziert.'
};

export const pax = {
  image: paxImg,
  species: 'Polarfuchs',
  pronouns: 'er/ihn',
  age: 22,
  description:
    'Verspielt, neugierig, ein kleiner Gremlin. Chaotische Energie mit einer technikaffinen, cleveren Seite darunter.',
  likes: [
    'An Technik herumbasteln',
    'kaltes Wetter',
    'Snacks',
    'an Dingen herumstochern, auf denen „nicht berühren“ steht'
  ],
  dislikes: [
    'Proprietäre Software',
    'langsames WLAN'
  ]
};

export const cats: Cat[] = [
  { name: 'Eddy',  image: eddyImg,  personality: 'Liebenswert, aber stur. Bekommt immer was er will.' },
  { name: 'Lily',  image: lilyImg,  personality: 'Eine kleine Kuschelprinzessin.' },
  { name: 'Lucky', image: luckyImg, personality: 'Unruhestifter, zur richtigen Zeit aber auch kuschelig.' },
  { name: 'Jessy', image: jessyImg, personality: 'Schläft mehr als sie wach ist.' }
];
