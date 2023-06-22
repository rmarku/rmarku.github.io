import { Footer, Header } from '@/components/Layout'

type LayoutProps = {
  children: React.ReactNode
  params: {
    lng: string
  }
}

const Layout: React.FC<LayoutProps> = ({ children, params: { lng } }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header lng={lng} />
      <main className="flex-grow container mx-auto py-8 px-4">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
