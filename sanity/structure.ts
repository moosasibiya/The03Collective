import type { StructureResolver } from 'sanity/structure'

const vehicleList = (S: Parameters<StructureResolver>[0], title: string, filter?: string) => {
  const list = S.documentTypeList('vehicle').title(title)
  return filter ? list.filter(filter) : list
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('The 03 Collective CMS')
    .items([
      S.listItem()
        .title('Inventory')
        .schemaType('vehicle')
        .child(
          S.list()
            .title('Inventory')
            .items([
              S.listItem()
                .title('All Vehicles')
                .schemaType('vehicle')
                .child(vehicleList(S, 'All Vehicles')),
              S.listItem()
                .title('Available Vehicles')
                .schemaType('vehicle')
                .child(vehicleList(S, 'Available Vehicles', '_type == "vehicle" && status == "available"')),
              S.listItem()
                .title('Sold Vehicles')
                .schemaType('vehicle')
                .child(vehicleList(S, 'Sold Vehicles', '_type == "vehicle" && status == "sold"')),
              S.listItem()
                .title('Featured Vehicles')
                .schemaType('vehicle')
                .child(vehicleList(S, 'Featured Vehicles', '_type == "vehicle" && featured == true')),
            ]),
        ),
      S.listItem()
        .title('Marketing')
        .child(
          S.list()
            .title('Marketing')
            .items([
              S.listItem()
                .title('Client Testimonials')
                .schemaType('testimonial')
                .child(S.documentTypeList('testimonial').title('Client Testimonials')),
            ]),
        ),
    ])
