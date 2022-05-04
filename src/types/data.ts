export type GuestInfo = {
  readonly address: ReadonlyArray<string>;
  readonly intro: ReadonlyArray<string>;
  readonly itinerary: Itinerary;
  readonly rsvpUrl: string;
  readonly weddingListUrl: string;
  readonly date: string;
};

export type GettingThere = { title: string; text: string };

export type Directions = {
  readonly date: string;
  readonly address: ReadonlyArray<string>;
  readonly access: string;
  readonly intro: string;
  readonly gettingThere: ReadonlyArray<GettingThere>;
};

export type Itinerary = [
  {
    time: string;
    description: string;
  },
];

export type GuestType = 'all_day' | 'evening';
