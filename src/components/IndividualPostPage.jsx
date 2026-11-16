import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import CommentSection from './CommentSection.jsx'
import { API_BASE_URL, fetchJson } from '../api.js'

function IndividualPostPage() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPost() {
      setLoading(true)
      setError('')
      setNotFound(false)
      setPost(null)
      setUser(null)
      setComments([])

      try {
        const postData = await fetchJson(`${API_BASE_URL}/posts/${postId}`, { signal: controller.signal })
        if (!postData?.id || !postData.title || !postData.body) {
          setNotFound(true)
          return
        }

        const [userData, commentData] = await Promise.all([
          fetchJson(`${API_BASE_URL}/users/${postData.userId}`, { signal: controller.signal }),
          fetchJson(`${API_BASE_URL}/posts/${postId}/comments`, { signal: controller.signal }),
        ])
        if (!Array.isArray(commentData)) {
          throw new Error('Comments could not be loaded. Please try again.')
        }
        setPost(postData)
        setUser(userData)
        setComments(commentData)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'This post could not be loaded. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPost()
    return () => controller.abort()
  }, [postId])

  async function addComment(comment) {
    const newComment = await fetchJson(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ postId: Number(postId), name: comment.name, body: comment.body }),
    })
    setComments((currentComments) => [...currentComments, newComment])
  }

  if (loading) return <p className="loading-message" role="status">Loading post…</p>
  if (error) return <p className="error-message" role="alert">{error} <Link to="/">View all posts</Link></p>
  if (notFound || !post) {
    return <p className="not-found">That post could not be found. <Link to="/">View all posts</Link></p>
  }

  return (
    <article className="post-detail">
      <Link className="back-link" to="/">← All posts</Link>
      <h1>{post.title}</h1>
      <p className="blog-post__details">
        <span><strong>By:</strong> {user?.name || 'Unknown author'}</span>
        {user?.email && <span><strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></span>}
      </p>
      <div className="post-detail__content">
        <p>{post.body}</p>
      </div>
      <section className="comments-section" aria-labelledby="comments-title">
        <h2 id="comments-title">Comments</h2>
        <CommentSection comments={comments} onAddComment={addComment} />
      </section>
    </article>
  )
}

export default IndividualPostPage