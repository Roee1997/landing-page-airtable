'use client'

import { useState, useRef, useEffect } from 'react'

const INITIAL_FORM = {
  fullName: '',
  email: '',
  companyName: '',
  businessType: '',
  currentERP: '',
  message: '',
}

const inputBase = 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all'
const inputNormal = `${inputBase} border-slate-300 focus:ring-[#52a9ff]`
const inputError = `${inputBase} border-red-400 focus:ring-red-400`

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [formVisible, setFormVisible] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
  }, [])

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim())
      errs.fullName = 'Full name is required'
    if (!form.email.trim())
      errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address'
    if (!form.message.trim())
      errs.message = 'Please describe your business needs'
    else if (form.message.trim().length < 10)
      errs.message = 'Message must be at least 10 characters'
    return errs
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm(INITIAL_FORM)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
          <p className="text-lg text-slate-500 mb-8">
            Thanks for reaching out. Our implementation team will contact you within 1
            business day.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-3 bg-[#52a9ff] text-white font-medium rounded-lg hover:bg-[#3a9ef0] transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" ref={formRef} className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Start Your Implementation
          </h2>
          <p className="text-lg text-slate-500">
            Tell us about your business and we'll build a plan tailored to your needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${formVisible ? 'animate-slide-in' : 'opacity-0'}`}
            style={{ animationDelay: '0ms' }}
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.fullName ? inputError : inputNormal}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Business Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={errors.email ? inputError : inputNormal}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div
            className={formVisible ? 'animate-slide-in' : 'opacity-0'}
            style={{ animationDelay: '150ms' }}
          >
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Business Needs / Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project, goals, and any specific requirements..."
              className={`${errors.message ? inputError : inputNormal} resize-none`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${formVisible ? 'animate-slide-in' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Your Company Ltd."
                className={inputNormal}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Business Type
              </label>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className={`${inputNormal} bg-white`}
              >
                <option value="">Select type...</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div
            className={formVisible ? 'animate-slide-in' : 'opacity-0'}
            style={{ animationDelay: '450ms' }}
          >
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Current ERP / Existing System
            </label>
            <input
              type="text"
              name="currentERP"
              value={form.currentERP}
              onChange={handleChange}
              placeholder="e.g. Priority, SAP, None"
              className={inputNormal}
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ animationDelay: '600ms' }}
            className={`w-full py-4 bg-[#52a9ff] text-white font-semibold rounded-lg hover:bg-[#3a9ef0] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-lg ${formVisible ? 'animate-slide-in' : 'opacity-0'}`}
          >
            {status === 'loading' ? 'Sending...' : 'Send Implementation Request →'}
          </button>

          <p className="text-center text-sm text-slate-400">
            We'll get back to you within 1 business day.
          </p>
        </form>
      </div>
    </section>
  )
}
