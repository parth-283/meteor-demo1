import React, { useState } from 'react';
import SEO from './SEO';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            debugger
            await Meteor.callAsync("contacts.insert", {
                ...formData,
                createdAt: new Date(),
            });

            setSuccessMessage('Your message has been sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setErrorMessage('There was an error sending your message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title="Contact | Demo1"
                description="Welcome to dashboard"
                url="/contact"
            />

            <div className="contact-us-container">
                <h1>Contact Us</h1>
                <p>If you have any questions, comments, or feedback, please feel free to reach out to us using the form below or through our contact information.</p>

                <div className={successMessage ? "success-header" : "error-header"}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>

                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
                    <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                    <p>Address: 123 Main Street, City, Country</p>
                </div>
            </div>
        </>
    );
};

export default ContactUs;