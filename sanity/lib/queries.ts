export const FEATURED_VEHICLES_QUERY = `
  *[_type == "vehicle" && featured == true && status != "sold"]
  | order(_createdAt desc)[0...6] {
    _id,
    make,
    model,
    year,
    mileage,
    price,
    colour,
    trim,
    transmission,
    status,
    slug,
    whatsappMessage,
    "mainImage": images[0]{
      asset->{url},
      alt
    }
  }
`

export const ALL_VEHICLES_QUERY = `
  *[_type == "vehicle"] | order(_createdAt desc) {
    _id,
    make,
    model,
    year,
    mileage,
    price,
    colour,
    trim,
    transmission,
    fuel,
    status,
    slug,
    whatsappMessage,
    "mainImage": images[0]{
      asset->{url},
      alt
    }
  }
`

export const VEHICLE_BY_SLUG_QUERY = `
  *[_type == "vehicle" && slug.current == $slug][0] {
    _id,
    make,
    model,
    year,
    mileage,
    price,
    colour,
    trim,
    transmission,
    fuel,
    status,
    description,
    features,
    specs,
    conditionNotes,
    whatsappMessage,
    slug,
    "images": images[]{
      asset->{url, metadata{dimensions}},
      alt
    }
  }
`

export const RELATED_VEHICLES_QUERY = `
  *[_type == "vehicle" &&
    make == $make &&
    slug.current != $slug &&
    status != "sold"
  ] | order(_createdAt desc)[0...3] {
    _id,
    make,
    model,
    year,
    mileage,
    price,
    colour,
    trim,
    status,
    slug,
    "mainImage": images[0]{
      asset->{url},
      alt
    }
  }
`

export const ALL_VEHICLE_SLUGS_QUERY = `
  *[_type == "vehicle" && defined(slug.current)] {
    "slug": slug.current
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    location
  }
`
