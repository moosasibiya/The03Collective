import OrganizationStructuredData from '@/components/seo/OrganizationStructuredData'
import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import PageReveal from '@/components/PageReveal'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <OrganizationStructuredData />
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <PageReveal />
    </>
  )
}
