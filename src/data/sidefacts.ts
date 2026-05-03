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
  text: 'Mein erstes E-Auto. Ich bin sehr positiv überrascht, wie sehr sich der Wechsel anfühlt.'
};

export const pax = {
  image: paxImg,
  species: 'Arctic Fox',
  pronouns: 'he/him',
  age: 22,
  description:
    'Playful, curious, a bit of a gremlin. Chaotic energy with a techy, clever streak underneath.',
  likes: [
    'Tinkering with tech',
    'cold weather',
    'snacks',
    'poking at things that say "do not touch"'
  ],
  dislikes: [
    'Proprietary software',
    'slow Wi-Fi',
    'people who say "it works on my machine"'
  ]
};

export const cats: Cat[] = [
  { name: 'Eddy',  image: eddyImg,  personality: 'Liebenswert, aber stur. Bekommt immer was er will.' },
  { name: 'Lily',  image: lilyImg,  personality: 'Eine kleine Kuschelprinzessin.' },
  { name: 'Lucky', image: luckyImg, personality: 'Unruhestifter, zur richtigen Zeit aber auch kuschelig.' },
  { name: 'Jessy', image: jessyImg, personality: 'Schläft mehr als sie wach ist.' }
];
