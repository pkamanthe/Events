import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
   
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }

  
    setFormStatus('Sending...');

    
    setTimeout(() => {
      setFormStatus('Thank you for reaching out!');
      setFormData({ name: '', email: '', message: '' }); 
    }, 1500);
  }

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Please fill out the form below to get in touch.</p>
      
      {formStatus && <p>{formStatus}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
