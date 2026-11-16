import { useState } from 'react'

function CommentForm({ onAddComment }) {
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedBody = body.trim()
    if (!trimmedName || !trimmedBody) {
      setError('Enter your name and a comment before posting.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await onAddComment({ name: trimmedName, body: trimmedBody })
      setName('')
      setBody('')
    } catch (requestError) {
      setError(requestError.message || 'Your comment could not be posted. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment-name">Name</label>
      <input
        id="comment-name"
        name="name"
        autoComplete="name"
        maxLength={80}
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor="comment-text">Comment</label>
      <textarea
        id="comment-text"
        name="comment"
        maxLength={500}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        required
      />
      <button type="submit" disabled={submitting}>{submitting ? 'Posting…' : 'Post comment'}</button>
      {error && <p className="error-message" role="alert">{error}</p>}
    </form>
  )
}

export default CommentForm