/**
 * Single source of truth for business facts.
 * Change a value here and it updates everywhere on the site: the hero,
 * the contact block, the footer, the metadata and the search schema.
 */
export const shop = {
  name: 'Neighborhood Cutz',
  shortName: 'Cutz',
  domain: 'https://neighborhoodcutz.com',

  tagline: 'Wilshire Blvd · Los Angeles',
  heroCopy:
    'Fades, tapers, beard work and lineups from five barbers who cut here every week. Walk in, or pick your barber and book a time.',

  address: {
    line1: '3959 Wilshire Blvd #A23',
    line2: 'Los Angeles, CA 90010',
    building: 'Inside the Gramercy Wilshire building',
    street: '3959 Wilshire Blvd #A23',
    city: 'Los Angeles',
    region: 'CA',
    postalCode: '90010',
    country: 'US',
  },

  // Used for the map embed and the directions links.
  mapQuery: '3959+Wilshire+Blvd+%23A23,+Los+Angeles,+CA+90010',

  phone: {
    display: '(213) 263-9243',
    href: 'tel:+12132639243',
  },

  booksyUrl:
    'https://booksy.com/en-us/dl/show-business/936448?utm_medium=c2c_referral',

  // TODO: replace with the shop's real Instagram handle.
  instagramUrl: 'https://www.instagram.com/',

  rating: { value: '5.0', count: '432' },

  highlights: [
    'Walk-ins accepted',
    'Good for kids',
    'Restroom',
    'Se habla español',
  ],

  /**
   * Opening hours in 24h decimal, indexed Sunday = 0 to match
   * JavaScript's getDay(). 9.5 means 9:30 AM.
   *
   * TODO: CONFIRM THE FULL WEEK WITH THE SHOP BEFORE LAUNCH.
   * Google lists a 9:30 AM Monday open, Booksy showed 9:00 AM to 7:00 PM.
   * Sunday below is an assumption.
   *
   * To mark a day closed, set it to: { day: 'Sunday', closed: true }
   */
  hours: [
    { day: 'Sunday', open: 10, close: 17 },
    { day: 'Monday', open: 9.5, close: 19 },
    { day: 'Tuesday', open: 9, close: 19 },
    { day: 'Wednesday', open: 9, close: 19 },
    { day: 'Thursday', open: 9, close: 19 },
    { day: 'Friday', open: 9, close: 19 },
    { day: 'Saturday', open: 9, close: 19 },
  ],

  // The shop's own clock. Status stays correct for out-of-state visitors.
  timeZone: 'America/Los_Angeles',
};

export const stats = [
  { value: '5.0', label: 'Booksy rating across 432 reviews' },
  { value: '5', label: 'Barbers taking appointments' },
  { value: '7', label: 'Days a week, walk-ins accepted' },
];

export const about = {
  eyebrow: 'About the shop',
  heading: 'A clean cut and a chair that knows your name',
  body: [
    'Neighborhood Cutz sits inside the Gramercy Wilshire building on Wilshire Blvd, a few steps off Koreatown. Five barbers, one room, and a standard that has not moved since the doors opened.',
    'Skin fades, scissor work, beard shaping, kids cuts. Walk-ins are welcome whenever a chair is free, and booking online holds your time with the barber you want. Se habla español.',
  ],
};
