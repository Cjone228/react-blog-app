import { Link } from 'react-router'

function BlogPost({ post, featured = false }) {
  return (
    <article className={featured ? 'blog-post blog-post--featured' : 'blog-post'}>
      {featured ? (
        <h1><Link to={`/posts/${post.id}`}>{post.title}</Link></h1>
      ) : (
        <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
      )}
      <p className="blog-post__content">{post.body}</p>
      <Link className="read-more" to={`/posts/${post.id}`}>Read post</Link>
    </article>
  )
}

export default BlogPost