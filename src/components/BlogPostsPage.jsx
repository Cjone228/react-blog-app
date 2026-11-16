import { useEffect, useState } from 'react'
import BlogPost from './BlogPost.jsx'
import { API_BASE_URL, fetchJson } from '../api.js'

function BlogPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      try {
        const data = await fetchJson(`${API_BASE_URL}/posts`, { signal: controller.signal })
        if (!Array.isArray(data)) {
          throw new Error('The posts could not be loaded. Please try again.')
        }
        setPosts(data)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'The posts could not be loaded. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPosts()
    return () => controller.abort()
  }, [])

  return (
    <section className="posts-page" aria-labelledby="posts-title">
      <p className="eyebrow">Notes from around town, home, and the road</p>
      <h1 id="posts-title">The blog</h1>
      {loading && <p className="loading-message" role="status">Loading posts…</p>}
      {error && <p className="error-message" role="alert">{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No posts are available right now.</p>}
      {!loading && !error && posts.length > 0 && (
        <div className="post-list">
          {posts.map((post, index) => (
            <BlogPost key={post.id} post={post} featured={index === 0} />
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogPostsPage