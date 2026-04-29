import type { Testimonial, Vehicle } from '@/types'

export const SITE_CONTACT = {
  whatsappNumber: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '27820000000',
  phoneDisplay: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+27 82 000 0000',
  phoneHref: `tel:${(process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+27 82 000 0000').replace(/[^\d+]/g, '')}`,
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@the03collective.co.za',
  emailHref: `mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@the03collective.co.za'}`,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '@the03collective',
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/the03collective',
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/the03collective',
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@the03collective',
  location: ['Johannesburg, Gauteng', 'South Africa'],
  hours: [
    { day: 'Monday - Friday', time: '08:00 - 18:00' },
    { day: 'Saturday', time: '09:00 - 14:00' },
    { day: 'Sunday', time: 'By appointment' },
  ],
}

export const HERO_STATS = [
  { value: '140+', label: 'Vehicles Sold' },
  { value: '98%', label: 'Seller Satisfaction' },
  { value: '72h', label: 'Avg. Response' },
]

export const MARQUEE_ITEMS = [
  'Premium Selection',
  'Professional Presentation',
  'Transparent Process',
  'Verified Vehicles',
  'Personal Service',
  'The 03 Collective',
]

export const TRUST_ITEMS = [
  {
    title: 'Premium Presentation',
    body: 'Every listing is photographed and described to the highest standard.',
    icon: 'eye',
  },
  {
    title: 'Transparent History',
    body: "Full vehicle backgrounds. No surprises. You know exactly what you're buying.",
    icon: 'shield',
  },
  {
    title: 'Personal Consultation',
    body: 'Direct access to real people. No call centres. No automated replies.',
    icon: 'person',
  },
  {
    title: 'Verified Condition',
    body: 'Every car is assessed and graded before it earns a place in our inventory.',
    icon: 'badge',
  },
]

export const HOME_CONSIGN_BENEFITS = [
  'Professional photography and video - every car is shot like it matters.',
  'Multi-platform exposure - we reach buyers across every channel.',
  'Qualified enquiries only - we filter the noise before it reaches you.',
  'You stay in control - your price, your timeline, your decision.',
]

export const SELL_BENEFITS = [
  'Professional photography and video - your car is shot the way it deserves.',
  'Multi-platform listing - across every channel your buyer uses.',
  "Qualified buyers only - we vet enquiries so you don't waste time.",
  'Negotiation handled - we protect your asking price with skill.',
  'Full paperwork support - from first enquiry to final signature.',
  'You control the price - we advise, you decide.',
]

export const PROCESS_STEPS = [
  {
    title: 'Submit Your Car',
    body: "Fill out our short form or send us a WhatsApp. We'll assess your car and respond within 24 hours with a no-obligation proposal.",
  },
  {
    title: 'We Present It Properly',
    body: 'Professional photography, a detailed listing, and targeted promotion across every platform where your buyer is looking.',
  },
  {
    title: 'We Handle the Sale',
    body: "Enquiries, viewings, negotiations, and paperwork - we manage it all. You focus on what's next.",
  },
]

export const SELL_STEPS = [
  {
    title: 'Submit Your Details',
    body: 'Use the form opposite or WhatsApp us. Tell us about your car - make, model, year, mileage, asking price.',
  },
  {
    title: 'We Assess and Propose',
    body: "Within 24 hours we'll come back with an honest assessment and a no-obligation consignment proposal.",
  },
  {
    title: 'Sit Back. We Sell.',
    body: 'Photography, listing, promotion, enquiries, negotiations - we handle everything until your car is sold.',
  },
]

export const FAQS = [
  {
    question: 'How does consignment work?',
    answer:
      "You bring your car to us, or we come to you for an assessment. We agree on a listing price, handle all photography and marketing, and manage enquiries on your behalf. You only engage when there's a serious, qualified buyer.",
  },
  {
    question: 'What does it cost to list my car?',
    answer:
      "Our commission structure is discussed privately once we've assessed your car. There are no upfront photography or listing fees - we only earn when your car sells.",
  },
  {
    question: 'How long will it take to sell my car?',
    answer:
      'This depends on the vehicle and the market, but most of our inventory sells within 2-6 weeks of listing. Premium or niche vehicles can take longer, but we set accurate expectations from the start.',
  },
  {
    question: 'Do you offer finance or trade-ins?',
    answer:
      "We can connect buyers with finance partners, and we do consider trade-ins on a case-by-case basis. Speak to us directly and we'll advise based on your specific situation.",
  },
  {
    question: 'Can I still drive my car while it is listed?',
    answer:
      'Yes. Your car remains yours until the sale is finalised. We just ask that you keep us informed of any condition changes so the listing stays accurate.',
  },
  {
    question: 'What types of vehicles do you list?',
    answer:
      "We focus on performance cars, luxury vehicles, and premium used cars generally. We don't list everyday commuters or high-mileage vehicles - our standard is maintained deliberately.",
  },
]

export const ABOUT_PILLARS = [
  {
    number: '01',
    title: 'Selection',
    body: 'We do not list every car that comes our way. Each vehicle is assessed against our standard before it earns a place in our inventory. If it does not belong here, it does not appear here. This is how we protect the trust of every buyer who visits us.',
  },
  {
    number: '02',
    title: 'Presentation',
    body: 'Most cars are undersold because they are poorly shown. We believe every vehicle deserves professional photography, honest detailed descriptions, and a listing built to convert interest into enquiry. Presentation is not an afterthought - it is the product.',
  },
  {
    number: '03',
    title: 'Trust',
    body: 'No pressure. No manufactured urgency. No hidden conditions. We operate with complete transparency - buyers know what they are buying, sellers know what to expect, and every interaction is handled with the care it deserves. This is non-negotiable.',
  },
]

export const ABOUT_STORY = [
  'The 03 Collective grew from a frustration shared by every enthusiast who has ever bought or sold a quality car in South Africa: the experience rarely matches the vehicle.',
  'We watched excellent cars go to market with phone photos and generic descriptions. We watched sellers accept less than their car was worth because the listing did nothing to communicate its value. We watched buyers wade through noise, sifting for honesty.',
  'So we built something different. A platform that takes presentation seriously. A team that knows what it is looking at. A process built around the people involved, not just the transaction at the end.',
  'The 03 Collective is small by design. We do not aim to list every car in South Africa. We aim to list the right ones - and to make sure every buyer and seller who comes to us leaves with exactly what they came for.',
]

export const TEAM_MEMBERS = [
  {
    name: 'Jarrod Nkosi',
    role: 'Founder and Director',
    bio: 'Automotive enthusiast with 12 years of buying, selling, and collecting performance cars. Built The 03 Collective to fill a gap the industry refused to close.',
  },
  {
    name: 'Cara Venter',
    role: 'Photography and Creative',
    bio: 'Former editorial photographer turned automotive specialist. The reason every listing here looks the way it does. She finds the shot others miss.',
  },
  {
    name: 'Reza Patel',
    role: 'Client Relations',
    bio: 'First point of contact for buyers and sellers. Known for responding faster than expected and solving problems before they become problems.',
  },
]

export const CONTACT_TOPICS = [
  { value: '', label: 'Select a topic' },
  { value: 'buying', label: 'Buying a vehicle' },
  { value: 'selling', label: 'Selling / consigning my car' },
  { value: 'both', label: 'Both buying and selling' },
  { value: 'general', label: 'General enquiry' },
]

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: 'testimonial-1',
    quote:
      "I've sold cars through classifieds, through friends, and through dealers. The 03 Collective is simply different - they treated my car like it mattered, and got me more than I expected.",
    author: 'Ruan V.',
    location: 'Cape Town',
  },
  {
    _id: 'testimonial-2',
    quote:
      'Found my M3 here after weeks of searching elsewhere. The listing was honest, the photos were accurate, and the whole transaction was smooth. Exactly what you want from a private sale.',
    author: 'Jarryd M.',
    location: 'Johannesburg',
  },
  {
    _id: 'testimonial-3',
    quote:
      'Consigned my 911 with the team and had a qualified buyer within a week. The photography alone was worth it - my car looked better in their listing than it did in my driveway.',
    author: 'Simone K.',
    location: 'Pretoria',
  },
]

export const FALLBACK_VEHICLES: Vehicle[] = [
  {
    _id: 'fallback-bmw-m3-competition',
    make: 'BMW',
    model: 'M3 Competition',
    year: 2021,
    mileage: 42800,
    price: 1295000,
    colour: 'Frozen Black',
    trim: 'Carbon Interior Package',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'available',
    featured: true,
    slug: { current: '2021-bmw-m3-competition' },
    descriptionHtml:
      "<p>This M3 Competition is one of the most complete driver's cars in our inventory. Finished in rare Frozen Black Individual paint - a colour that demands a second look in any light - and specified with the full Carbon Interior Package, this is not a base-spec example.</p><p>Serviced at BMW Centre Johannesburg at every interval, with the full service history book stamped and verified. A single careful owner from new. All original panels, no accident history on record.</p>",
    features: [
      'Carbon fibre roof',
      'M Sport seats with full leather',
      'M Compound brakes',
      'Harman Kardon audio',
      'Adaptive M suspension',
      'Heads-up display',
      'Heated steering wheel',
      'Parking cameras (360-degree)',
      'BMW DriveRecorder',
      'M Carbon exterior mirrors',
    ],
    specs: {
      power: '375 kW',
      torque: '650 Nm',
      drive: 'RWD',
      acceleration: '3.9s',
    },
    conditionNotes:
      'Excellent. No paintwork issues, no kerb damage to wheels. Interior unmarked. All four tyres are above 6 mm. Exhaust system is original and unmarked.',
    whatsappMessage:
      "Hi, I'm interested in the 2021 BMW M3 Competition listed on The 03 Collective.",
    tags: ['375 kW', 'Carbon Pack', 'One Owner'],
  },
  {
    _id: 'fallback-porsche-911-carrera-s',
    make: 'Porsche',
    model: '911 Carrera S',
    year: 2023,
    mileage: 18200,
    price: 2850000,
    colour: 'Gentian Blue',
    trim: 'Sport Chrono Package',
    transmission: 'PDK',
    fuel: 'Petrol',
    status: 'reserved',
    featured: true,
    slug: { current: '2023-porsche-911-carrera-s' },
    descriptionHtml:
      '<p>A 2023 Carrera S in Gentian Blue Metallic - a colour exclusive to the new-generation 992 and one that transforms in different lighting conditions from deep navy to vivid steel blue. Specified with Sport Chrono and PASM Sport active suspension.</p><p>Delivered new by Porsche Centre Cape Town. Under 20 000 km from new. Still within the Porsche Approved Warranty. Currently reserved - contact us to be added to the waiting list if the sale does not proceed.</p>',
    features: [
      'Sport Chrono Package',
      'PASM Sport suspension',
      'Bose surround sound',
      'Sport exhaust system',
      'Rear-axle steering',
      '18-way adaptive sport seats',
      'Panoramic roof',
      'Night Vision Assist',
      'Front axle lift system',
      'Carbon interior accents',
    ],
    specs: {
      power: '331 kW',
      torque: '530 Nm',
      drive: 'RWD',
      acceleration: '3.5s',
    },
    conditionNotes:
      'As-new condition. No marks, no issues. Full Porsche service history. Under Porsche Approved Warranty until 2026.',
    whatsappMessage: "Hi, I'd like to join the waiting list for the 2023 Porsche 911 Carrera S.",
    tags: ['Sport Chrono', '992 Gen', 'Porsche APW'],
  },
  {
    _id: 'fallback-mercedes-amg-c63-s',
    make: 'Mercedes-AMG',
    model: 'C63 S',
    year: 2020,
    mileage: 61500,
    price: 875000,
    colour: 'Obsidian Black',
    trim: 'AMG Performance Seats',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'available',
    featured: true,
    slug: { current: '2020-mercedes-amg-c63-s' },
    descriptionHtml:
      '<p>The last-generation V8 C63 S - a car many regard as one of the finest AMG products ever built. Obsidian Black over an AMG Performance Seat interior in black Nappa leather with red stitching. The soundtrack from the hand-built 4.0-litre twin-turbo V8 remains one of the great sensory experiences in modern motoring.</p><p>Full Mercedes-Benz service history. One owner. Every service performed at an authorised AMG dealer. Exhaust system is original and completely unmarked.</p>',
    features: [
      'AMG Performance seats in Nappa leather',
      'AMG exhaust system',
      'Burmester surround sound',
      'AMG Ride Control+ suspension',
      'Multibeam LED headlights',
      'AMG SPEEDSHIFT MCT 9-speed',
      'Designo interior package',
      '360-degree parking camera',
      'Heated and ventilated seats',
      'AMG Track Pace',
    ],
    specs: {
      power: '375 kW',
      torque: '700 Nm',
      drive: 'RWD',
      acceleration: '3.9s',
    },
    conditionNotes:
      'Very good. Minor stone chips to the front bumper have been professionally touched up. Wheels are in excellent condition. Interior is unmarked.',
    whatsappMessage:
      "Hi, I'm interested in the 2020 Mercedes-AMG C63 S listed on The 03 Collective.",
    tags: ['V8 Biturbo', '375 kW', 'Dealer History'],
  },
  {
    _id: 'fallback-audi-rs6-avant',
    make: 'Audi',
    model: 'RS6 Avant',
    year: 2022,
    mileage: 34100,
    price: 1650000,
    colour: 'Nardo Grey',
    trim: 'Carbon Black Package',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'available',
    slug: { current: '2022-audi-rs6-avant' },
    descriptionHtml:
      '<p>The RS6 Avant in Nardo Grey is perhaps the most purposeful expression of the super-estate formula. Paired with the Carbon Black Package, every exterior accent is darkened - grille, mirrors, roof rails - creating a vehicle that looks like it was designed to be overlooked until it decides not to be.</p><p>Two adult owners from new, both based in Johannesburg. Full Audi dealer service history. Quattro all-wheel drive remains in immaculate condition.</p>',
    features: [
      'Carbon Black Package',
      'RS Sport suspension',
      'Bang and Olufsen 3D Premium Sound',
      'Head-up display',
      'Matrix LED with laser light',
      '4-zone climate control',
      'Panoramic sunroof',
      'RS Sport exhaust',
      'Audi Virtual Cockpit Plus',
      'Night vision assist',
    ],
    specs: {
      power: '441 kW',
      torque: '800 Nm',
      drive: 'Quattro AWD',
      acceleration: '3.6s',
    },
    conditionNotes:
      'Excellent. A minor surface scratch is visible on the rear bumper only in direct sunlight. Wheels and interior remain in excellent condition.',
    whatsappMessage: "Hi, I'm interested in the 2022 Audi RS6 Avant listed on The 03 Collective.",
    tags: ['441 kW', 'Carbon Pack', 'Quattro AWD'],
  },
  {
    _id: 'fallback-bmw-m4-competition-xdrive',
    make: 'BMW',
    model: 'M4 Competition xDrive',
    year: 2022,
    mileage: 28500,
    price: 1450000,
    colour: 'Sao Paulo Yellow',
    trim: 'M Carbon Package',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'sold',
    slug: { current: '2022-bmw-m4-competition-xdrive' },
    descriptionHtml:
      '<p>Sao Paulo Yellow was one of the most talked-about colour choices on the G82 M4 - a colour that divides opinion and then wins people over entirely in person. This example was specified with the full M Carbon Package and competed on two track days, both logged in the service history, with nothing to hide.</p><p>Sold to a private buyer in Pretoria. We are listing this to show what we have placed - the quality of this transaction is a fair representation of what we do.</p>',
    features: [
      'Full M Carbon Package',
      'M xDrive AWD system',
      'Carbon ceramic brakes',
      'Merino leather interior',
      'M Track Package',
      'Adaptive M suspension',
      '20-inch M light alloy wheels',
      'Laserlight headlights',
      'Reversing camera',
      'Wireless CarPlay',
    ],
    specs: {
      power: '375 kW',
      torque: '650 Nm',
      drive: 'xDrive AWD',
      acceleration: '3.5s',
    },
    conditionNotes:
      "This vehicle has been sold. Contact us if you're looking for something similar - we can often source vehicles that do not appear in our public inventory.",
    whatsappMessage:
      "Hi, I'm looking for something similar to the BMW M4 Competition xDrive that was sold.",
    tags: ['Sold', 'xDrive', 'M Carbon'],
  },
  {
    _id: 'fallback-lamborghini-huracan-evo',
    make: 'Lamborghini',
    model: 'Huracan EVO',
    year: 2020,
    mileage: 9800,
    price: 4200000,
    colour: 'Arancio Borealis',
    trim: 'Ad Personam Commission',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'available',
    slug: { current: '2020-lamborghini-huracan-evo' },
    descriptionHtml:
      '<p>A Huracan EVO in Arancio Borealis - an Ad Personam commission colour that blurs the line between orange and red depending on the angle and light. Under 10 000 km from new. This is as close to a delivery-mileage supercar as the South African market is likely to see.</p><p>Commissioned and specified new by a collector in the Western Cape who has since expanded his collection in a different direction. Lamborghini SA service history. Immaculate in every respect.</p>',
    features: [
      'Ad Personam specification',
      'Lamborghini Dynamic Steering',
      'LDVI integrated vehicle dynamics',
      'Sensonum audio system',
      'Carbon fibre interior trim',
      'Forged composite wheels',
      'Alcantara headlining',
      'Track mode with torque vectoring',
      'Exterior carbon fibre package',
      'Transparent engine bay cover',
    ],
    specs: {
      power: '470 kW',
      torque: '600 Nm',
      drive: 'AWD',
      acceleration: '2.9s',
    },
    conditionNotes:
      'Exceptional. Under 10 000 km. No marks on paintwork, no marks on wheels. Interior is immaculate. Delivery documentation, books, and both keys are present.',
    whatsappMessage:
      "Hi, I'm interested in the 2020 Lamborghini Huracan EVO listed on The 03 Collective.",
    tags: ['Ad Personam', '470 kW', '<10k km'],
  },
  {
    _id: 'fallback-ferrari-458-italia',
    make: 'Ferrari',
    model: '458 Italia',
    year: 2013,
    mileage: 22300,
    price: 3800000,
    colour: 'Rosso Corsa',
    trim: 'Carbon Racing Package',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'sold',
    slug: { current: '2013-ferrari-458-italia' },
    descriptionHtml:
      "<p>The 458 Italia is increasingly regarded as one of Ferrari's greatest naturally aspirated road cars - and one whose values have consistently been validated. Rosso Corsa on black interior with the Carbon Racing Package. 22 300 km from new, Ferrari Classiche certified.</p><p>This vehicle was sold to a buyer in Johannesburg in 2024. We include it here as part of our sold portfolio - evidence of the calibre of vehicle we handle.</p>",
    features: [
      'Carbon Racing Package',
      'Racing suspension setup',
      'Ferrari Hi-Fi audio',
      'Carbon fibre racing seats',
      'Scuderia Ferrari shields',
      'Carbon steering wheel',
      'Racing exhaust',
      'Michelin Pilot Sport tyres',
      'GPS theft tracking',
      'Ferrari Classiche certified',
    ],
    specs: {
      power: '419 kW',
      torque: '540 Nm',
      drive: 'RWD',
      acceleration: '3.4s',
    },
    conditionNotes:
      'This vehicle has been sold. It represented one of the finest examples of the 458 Italia we have had the privilege of handling. Contact us if you are seeking a similar specification.',
    whatsappMessage:
      "Hi, I'm looking for something similar to the Ferrari 458 Italia that was sold.",
    tags: ['Sold', 'Naturally Aspirated', 'Classiche'],
  },
  {
    _id: 'fallback-range-rover-sport-svr',
    make: 'Range Rover',
    model: 'Sport SVR',
    year: 2021,
    mileage: 55000,
    price: 1100000,
    colour: 'Santorini Black',
    trim: 'SVR Carbon Fibre Pack',
    transmission: 'Automatic',
    fuel: 'Petrol',
    status: 'available',
    slug: { current: '2021-range-rover-sport-svr' },
    descriptionHtml:
      '<p>The Range Rover Sport SVR occupies a unique position - a luxury SUV with supercar-level performance in a package that still makes everyday sense. In Santorini Black with the SVR Carbon Fibre Pack, this example is as purposeful as the SVR gets aesthetically.</p><p>Well-maintained with full LRSA service history. Both owners were based in Johannesburg. No off-road use is on record - this is a road car through and through. The air suspension has recently been inspected and is functioning perfectly.</p>',
    features: [
      'SVR Carbon Fibre Pack',
      'Configurable terrain response',
      'Meridian Signature Sound system',
      'Head-up display',
      'Sliding panoramic roof',
      '22-inch SVR alloy wheels',
      'All-terrain progress control',
      'Wade sensing system',
      'Heated and cooled front seats',
      'Quad-zone climate',
    ],
    specs: {
      power: '405 kW',
      torque: '700 Nm',
      drive: 'AWD',
      acceleration: '4.5s',
    },
    conditionNotes:
      'Good to very good. Service is up to date. Rear pads were replaced in January 2025 at 54 000 km. No bodywork issues.',
    whatsappMessage:
      "Hi, I'm interested in the 2021 Range Rover Sport SVR listed on The 03 Collective.",
    tags: ['405 kW', 'Carbon Pack', 'Full LRSA SH'],
  },
  {
    _id: 'fallback-volkswagen-golf-r',
    make: 'Volkswagen',
    model: 'Golf R',
    year: 2023,
    mileage: 12400,
    price: 420000,
    colour: 'Lapiz Blue',
    trim: 'Akrapovic Edition',
    transmission: 'Manual',
    fuel: 'Petrol',
    status: 'available',
    slug: { current: '2023-volkswagen-golf-r' },
    descriptionHtml:
      "<p>The Mk8 Golf R is arguably the most complete hot hatch ever made. This example in Lapiz Blue - the colour that defines the R's understated aggression - was specified with the Akrapovic Edition Package from new, adding the titanium exhaust and a 10 kW power increase.</p><p>Under 13 000 km from new, owned by a single private buyer in Johannesburg who has moved to a larger family car. Full Volkswagen dealer service history. Both keys and the full documentation set are present.</p>",
    features: [
      'Akrapovic Edition exhaust',
      '4Motion AWD with torque vectoring',
      'Harman Kardon premium audio',
      'DCC adaptive suspension',
      'Digital cockpit Pro',
      'Matrix LED headlights',
      'IQ.LIGHT LED tail lights',
      'Heated front seats',
      'Driver profile selection',
      'Full digital instrument cluster',
    ],
    specs: {
      power: '245 kW',
      torque: '420 Nm',
      drive: '4Motion AWD',
      acceleration: '4.6s',
    },
    conditionNotes:
      "Excellent. Under 13 000 km. No marks anywhere on the car. Alloy wheels are perfect. Interior is unmarked - exactly what you'd expect from a car this new.",
    whatsappMessage:
      "Hi, I'm interested in the 2023 Volkswagen Golf R listed on The 03 Collective.",
    tags: ['Akrapovic Ed.', 'Manual', '4Motion'],
  },
]
