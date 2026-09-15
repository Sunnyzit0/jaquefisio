import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Layout from './Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ServicePage from './pages/ServicePage.jsx'

// React Router keeps the browser's scroll position across client-side navigations
// (unlike a full page load, which always starts at the top) — without this, clicking
// a service card while scrolled down on the home page would land mid-scroll on the
// new page instead of at its top.
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos/:slug" element={<ServicePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
