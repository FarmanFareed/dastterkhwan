export type Restaurant = {
  slug: string;
  name: string;
  city: string;
  region: "Punjab" | "Sindh" | "Khyber Pakhtunkhwa" | "Balochistan";
  cuisine: string;
  signatureDish: string;
  priceRange: "Rs. 300–600" | "Rs. 600–1200" | "Rs. 1200+";
  hours: string;
  description: string;
  longDescription: string;
  tags: string[];
};

export const restaurants: Restaurant[] = [
  {
    slug: "andaaz-e-lahore",
    name: "Andaaz-e-Lahore",
    city: "Lahore",
    region: "Punjab",
    cuisine: "Punjabi, Mughlai",
    signatureDish: "Lahori Chargha",
    priceRange: "Rs. 600–1200",
    hours: "Daily, 1pm – 1am",
    description:
      "A Gawalmandi institution rebuilt three times and never once changed the recipe.",
    longDescription:
      "Andaaz-e-Lahore started as a single tandoor on a Gawalmandi side street in the 1970s and has since grown into three floors, but the chargha still comes out the same way it always has — steamed in spices overnight, then flash-fried to order so the skin shatters and the meat stays loose on the bone. Go on a weeknight if you want a table without a wait; go on a Thursday if you want the city's best version of the Friday crowd.",
    tags: ["tandoor", "family style", "late night"],
  },
  {
    slug: "kolachi-do-darya",
    name: "Kolachi",
    city: "Karachi",
    region: "Sindh",
    cuisine: "Pakistani, Seafood BBQ",
    signatureDish: "Kolachi Fish Tikka",
    priceRange: "Rs. 1200+",
    hours: "Daily, 12pm – 12am",
    description: "Harbour-side grills with the coastline doing half the work.",
    longDescription:
      "Kolachi sits where the Malir river meets the sea, and the menu leans into it — pomfret and shrimp pulled straight off the boats that dock nearby, marinated simply and grilled over open coals so the smoke does the seasoning. Order the mixed platter for two and eat it slow; the view is doing the same thing the food is.",
    tags: ["seafood", "waterfront", "family style"],
  },
  {
    slug: "namak-mandi-charsi",
    name: "Namak Mandi Charsi Tikka",
    city: "Peshawar",
    region: "Khyber Pakhtunkhwa",
    cuisine: "Pathan, Karahi",
    signatureDish: "Charsi Tikka Karahi",
    priceRange: "Rs. 600–1200",
    hours: "Daily, 11am – 11pm",
    description:
      "No menu, no cutlery, and a karahi that's been seasoning itself for decades.",
    longDescription:
      "There's one dish here and it doesn't need a name on a laminated card — mutton karahi cooked in nothing but its own fat, salt, and green chillies, ladled straight from a blackened pan that's been in continuous use since before most of the staff were born. Eat with your hands, order naan by the piece, and don't ask for a fork.",
    tags: ["karahi", "no-frills", "mutton"],
  },
  {
    slug: "quetta-sajji-house",
    name: "Quetta Sajji House",
    city: "Quetta",
    region: "Balochistan",
    cuisine: "Balochi",
    signatureDish: "Whole Lamb Sajji",
    priceRange: "Rs. 1200+",
    hours: "Daily, 12pm – 10pm",
    description: "A whole lamb, a wood fire, and almost nothing else.",
    longDescription:
      "Sajji is a study in restraint — a whole lamb or chicken, salted and skewered, roasted upright beside an open wood fire for hours until the outside is dark and the inside falls apart. This is one of the few places in the city still doing it the slow way rather than finishing it in an oven. Order a half portion unless the table has four people committed to finishing it.",
    tags: ["whole roast", "wood fire", "sharing"],
  },
  {
    slug: "cafe-aylanto",
    name: "Cafe Aylanto",
    city: "Karachi",
    region: "Sindh",
    cuisine: "Contemporary Pakistani-Italian",
    signatureDish: "Lahori Chicken Pasta",
    priceRange: "Rs. 1200+",
    hours: "Daily, 12pm – 11pm",
    description: "Two kitchens' worth of instinct on one plate.",
    longDescription:
      "Aylanto's kitchen treats local spice the way an Italian nonna treats tomato — as the non-negotiable base, not a garnish. The Lahori chicken pasta is the dish regulars order without reading the rest of the menu, but the seasonal risottos are worth the detour if you've been before.",
    tags: ["date night", "fusion", "reservation recommended"],
  },
  {
    slug: "cheena-lahore",
    name: "Cheena Lahore",
    city: "Lahore",
    region: "Punjab",
    cuisine: "Desi Chinese",
    signatureDish: "Dragon Chicken",
    priceRange: "Rs. 600–1200",
    hours: "Daily, 5pm – 2am",
    description: "The Lahore-Chinese hybrid at its loudest and best.",
    longDescription:
      "Desi Chinese is its own cuisine at this point, and Cheena Lahore runs the wok as hard as anywhere in the city — heavy on garlic, heavier on chilli, and finished with a scorch you can taste. Dragon chicken is the order, but the fried rice underneath deserves attention too.",
    tags: ["wok", "spicy", "late night"],
  },
  {
    slug: "student-biryani",
    name: "Student Biryani",
    city: "Karachi",
    region: "Sindh",
    cuisine: "Sindhi Biryani",
    signatureDish: "Chicken Biryani",
    priceRange: "Rs. 300–600",
    hours: "Daily, 11am – 1am",
    description: "The biryani every Karachiite argues about and still orders.",
    longDescription:
      "Started by a student in 1964 with a single pot, now a citywide chain — and still the reference point locals measure every other biryani against. The rice is drier than a Lucknawi biryani and wetter than a pulao, potato included, no apologies.",
    tags: ["biryani", "quick", "budget"],
  },
  {
    slug: "haveli-food-street",
    name: "Haveli Rooftop",
    city: "Lahore",
    region: "Punjab",
    cuisine: "Punjabi",
    signatureDish: "Mutton Karahi with a Fort view",
    priceRange: "Rs. 1200+",
    hours: "Daily, 6pm – 1am",
    description:
      "Food Street with the Badshahi Mosque lit up over your shoulder.",
    longDescription:
      "The food at Haveli is solid, traditional Punjabi cooking, but the reason it stays booked out is the terrace — a straight sightline to the Badshahi Mosque and Lahore Fort, floodlit after dark. Book a window table two days ahead for weekend dinners.",
    tags: ["rooftop", "view", "reservation recommended"],
  },
];

export const regions = Array.from(new Set(restaurants.map((r) => r.region)));
