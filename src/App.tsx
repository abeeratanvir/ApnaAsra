import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import Home from '@/pages/Home'
import Individuals from '@/pages/Individuals'
import NGOs from '@/pages/NGOs'
import Companies from '@/pages/Companies'
import Impact from '@/pages/Impact'

type Page = 'home' | 'individuals' | 'ngos' | 'companies' | 'impact'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activePage={page} onNavigate={navigate} />
      <main style={{ flex: 1 }} key={page} className="page-transition">
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'individuals' && <Individuals onNavigate={navigate} />}
        {page === 'ngos' && <NGOs onNavigate={navigate} />}
        {page === 'companies' && <Companies onNavigate={navigate} />}
        {page === 'impact' && <Impact onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
      <BackToTop />
    </div>
  )
}
