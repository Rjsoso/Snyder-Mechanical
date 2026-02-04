import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages section - Home and other key pages first
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .child(S.documentTypeList('aboutPage').title('About Page')),
              S.listItem()
                .title('Commercial Page')
                .child(S.document().schemaType('commercialPage').documentId('commercialPage')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
              S.listItem()
                .title('Resources Page')
                .child(S.document().schemaType('resourcesPage').documentId('resourcesPage')),
            ])
        ),
      S.divider(),
      // Rest of document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['homePage', 'aboutPage', 'commercialPage', 'contactPage', 'resourcesPage'].includes(
            (listItem.getId() as string) ?? ''
          )
      ),
    ])
