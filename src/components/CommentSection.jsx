import CommentForm from './CommentForm.jsx'

function CommentSection({ comments, onAddComment }) {
  return (
    <div className="comment-section">
      <CommentForm onAddComment={onAddComment} />
      {comments.length === 0 ? (
        <p className="empty-comments">No comments yet. Be the first to comment!</p>
      ) : (
        <ol className="comment-list" aria-label={`${comments.length} comments`}>
          {comments.map((comment) => (
            <li className="comment" key={comment.id}>
              <p className="comment__heading">
                <span className="comment__author">{comment.name}</span>
              </p>
              <p className="comment__text">{comment.body}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default CommentSection