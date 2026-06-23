export type Track = {
  id: number;
  title: string;
  author: string;
  releaseDate: string;
  genre: string[];
  album: string;
  durationInSeconds: number;
};

export const tracks: Track[] = [
  {
    id: 1,
    title: 'Guilt',
    author: 'Nero',
    releaseDate: '2011-08-05',
    genre: ['Электроника'],
    album: 'Welcome Reality',
    durationInSeconds: 284,
  },
  {
    id: 2,
    title: 'Elektro',
    author: 'Dynoro, Outwork, Mr. Gee',
    releaseDate: '2020-09-11',
    genre: ['Танцевальная музыка'],
    album: 'Elektro',
    durationInSeconds: 142,
  },
  {
    id: 3,
    title: 'I’m Fire',
    author: 'Ali Bakgor',
    releaseDate: '2021-03-19',
    genre: ['Хаус'],
    album: 'I’m Fire',
    durationInSeconds: 142,
  },
  {
    id: 4,
    title: 'Non Stop (Remix)',
    author: 'Стоункат, Psychopath',
    releaseDate: '2021-10-15',
    genre: ['Хип-хоп'],
    album: 'Non Stop',
    durationInSeconds: 252,
  },
  {
    id: 5,
    title: 'Run Run (feat. AR/CO)',
    author: 'Jaded, Will Clarke, AR/CO',
    releaseDate: '2022-07-22',
    genre: ['Танцевальная музыка'],
    album: 'Run Run',
    durationInSeconds: 174,
  },
  {
    id: 6,
    title: 'Eyes on Fire (Zeds Dead Remix)',
    author: 'Blue Foundation, Zeds Dead',
    releaseDate: '2009-01-01',
    genre: ['Дабстеп'],
    album: 'Eyes on Fire',
    durationInSeconds: 320,
  },
  {
    id: 7,
    title: 'Mucho Bien (HI Profile Remix)',
    author: 'HYBIT, Mr. Black, Offer Nissim, Hi Profile',
    releaseDate: '2021-04-16',
    genre: ['Транс'],
    album: 'Mucho Bien',
    durationInSeconds: 221,
  },
  {
    id: 8,
    title: 'Knives n Cherries',
    author: 'minthaze',
    releaseDate: '2020-04-03',
    genre: ['Лоу-фай'],
    album: 'Captivating',
    durationInSeconds: 108,
  },
  {
    id: 9,
    title: 'How Deep Is Your Love',
    author: 'Calvin Harris, Disciples',
    releaseDate: '2015-07-17',
    genre: ['Хаус'],
    album: 'How Deep Is Your Love',
    durationInSeconds: 212,
  },
  {
    id: 10,
    title: 'Morena',
    author: 'Tom Boxer',
    releaseDate: '2010-01-01',
    genre: ['Поп'],
    album: 'Soundz Made in Romania',
    durationInSeconds: 216,
  },
];
