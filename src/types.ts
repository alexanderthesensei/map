// todo rename
export type Map = {
  url: string;
  entries: Entry[];
};

// todo rename to point
export type Entry = {
  title: string;
  description?: string;
  children: (Map | string)[];

  markerX: number;
  markerY: number;
};
