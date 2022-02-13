export type GuestInfo = {
  readonly address: ReadonlyArray<string>,
  readonly directions: ReadonlyArray<string>,
  readonly itinerary: Itinerary,
  readonly rsvpUrl: string,
  readonly weddingListUrl: string,
  readonly date: string
}

export type Itinerary = [
  {
    time: string,
    description: string,
  }
];

export type GuestType = 'all_day' | 'evening';