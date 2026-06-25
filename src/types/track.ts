export type Track = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: null | {
    type: string;
    data: number[];
  };
  track_file: string;
  staredUser: number[];
};

export type TracksResponse = {
  success: boolean;
  data: Track[];
};

export type Selection = {
  _id: number;
  name?: string;
  items: number[];
  owner: number[];
  __v: number;
};

export type SelectionsResponse = {
  success: boolean;
  data: Selection[];
};

export type SelectionResponse = {
  success: boolean;
  data: Selection | null;
};
