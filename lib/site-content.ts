import type { Testimonial, Vehicle } from '@/types'

export const SITE_CONTACT = {
  whatsappNumber: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '27659079083',
  phoneDisplay: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+27 65 907 9083',
  phoneHref: `tel:${(process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+27 65 907 9083').replace(/[^\d+]/g, '')}`,
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@the03collective.co.za',
  emailHref: `mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'hello@the03collective.co.za'}`,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || '@the03collective.za',
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    'https://www.instagram.com/the03collective.za?igsh=MXhnMWRxNzVtYWl3dA%3D%3D&utm_source=qr',
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
    body: 'We do not list every car that comes our way. Each vehicle is assessed for condition, desirability, and fit before it earns a place in our inventory. If it does not belong here, it does not appear here.',
  },
  {
    number: '02',
    title: 'Presentation',
    body: 'Great cars deserve more than rushed photos and vague descriptions. We present each vehicle with professional imagery, honest details, and a listing built to show why it matters.',
  },
  {
    number: '03',
    title: 'Trust',
    body: 'No pressure tactics. No manufactured urgency. No hidden conditions. Buyers know what they are buying, sellers know what to expect, and every interaction is handled directly.',
  },
]

export const ABOUT_STORY = [
  'The 03 Collective started from a simple frustration: quality cars often reach the market without the care they deserve.',
  'Poor photos, thin descriptions, and unclear processes cost sellers value and waste buyers time.',
  'We built a more deliberate approach: selective inventory, strong presentation, and clear communication from start to finish.',
  'We are intentionally focused. Not every car belongs here, but the right cars are represented properly.',
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

export const FALLBACK_TESTIMONIALS: Testimonial[] = []

export const FALLBACK_VEHICLES: Vehicle[] = []
