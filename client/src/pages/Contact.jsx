import React, { useState } from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add your form submission logic here
      toast.success('Message sent successfully!')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: assets.location_icon,
      title: 'Our Location',
      content: 'New Delhi, India'
    },
    {
      icon: assets.phone_icon,
      title: 'Phone Number',
      content: '+91 9818000000'
    },
    {
      icon: assets.email_icon,
      title: 'Email Address',
      content: 'saksham067@gmail.com'
    },
    {
      icon: assets.clock_icon,
      title: 'Working Hours',
      content: '24/7',
    }
  ]

  return (
    <div className="py-12 px-6 md:px-16 lg:px-24 xl:px-32 space-y-16">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch</h1>
        <p className="mt-4 text-gray-600">
          Have questions about our products or services? We're here to help! Reach out to us through any of the following channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <img src={info.icon} alt={info.title} className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900">{info.title}</h3>
            <p className="mt-2 text-gray-600">{info.content}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Saksham Sharma"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Saksham@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dull transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900">What are your delivery hours?</h3>
            <p className="mt-2 text-gray-600">8:00 AM to 10:00 PM (I.S.T.)</p>
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900">Do you offer same-day delivery?</h3>
            <p className="mt-2 text-gray-600">No, we don't offer same-day delivery.</p>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900">What payment methods do you accept?</h3>
            <p className="mt-2 text-gray-600">We accept all major kinds of payment methods.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 