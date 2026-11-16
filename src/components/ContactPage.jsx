import { useState } from 'react'

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <p className="eyebrow">Get in touch</p>
      <h1 id="contact-title">Contact</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" autoComplete="name" required />
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required />
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="6" required />
        <button type="submit">Send message</button>
        {submitted && <p className="form-confirmation" role="status">Thanks for your message. This demo form does not send messages.</p>}
      </form>
    </section>
  )
}

export default ContactPage