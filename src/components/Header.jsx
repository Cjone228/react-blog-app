import { useContext } from 'react'
import { Link } from 'react-router'
import { ThemeContext } from '../theme-context.js'

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-title" to="/">Margin Notes</Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/">Blog posts</Link>
          <Link to="/posts/1">Featured post</Link>
          <Link to="/contact">Contact</Link>
          <button className="theme-toggle" type="button" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header