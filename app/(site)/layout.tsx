import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
