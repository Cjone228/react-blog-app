import './App.css'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import BlogPostsPage from './components/BlogPostsPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import IndividualPostPage from './components/IndividualPostPage.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<BlogPostsPage />} />
            <Route path="/posts/:postId" element={<IndividualPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<p className="not-found">That page could not be found.</p>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
