import React, { useState } from 'react'
import axios from 'axios'
import Banner from '../../assets/banners/contactusBanner.jpg'
import { FaAddressCard } from "react-icons/fa"
import { FaPhone } from "react-icons/fa6"
import { MdEmail, MdGroups } from "react-icons/md"
import { FaLocationDot } from "react-icons/fa6"
import { IoIosLink } from "react-icons/io"
import { useTranslation } from 'react-i18next'
const ContactUs = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [success, setSuccess] = useState(false)
  const handleChange = e => setFormData({ ...formData, [e.target.id]: e.target.value })
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:8000/api/contact-messages/', formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error(err)
      setSuccess(false)
    }
  }
  return (
    <div className="bg-gradient-light min-h-screen" data-cy="contact-us-page">
      {/* Banner */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `linear-gradient(135deg, rgba(24,78,119,0.9),rgba(30,96,145,0.8)), url(${Banner})`
        }} />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg" data-aos="fade-up">
            {t('contact.title')}
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Info & Map */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-large p-8 card-hover" data-aos="fade-right">
              <div className="flex items-start mb-4">
                <FaAddressCard className='text-xl mr-2 text-[#184E77]' />
                <div>
                  <h3 className="text-xl font-bold text-[#184E77]">{t('contact.address.title')}</h3>
                  <div className="mt-2 space-y-1 text-gray-700">
                    {t('contact.address.lines', { returnObjects: true }).map((line, idx) => <p key={idx}>{line}</p>)}
                  </div>
                  <div className="mt-4 space-y-1 text-gray-700">
                    <p className="flex items-center">
                      <MdEmail className='text-lg mr-1 text-[#184E77]' />
                      {t('contact.email.label')}: <a className="text-[#1E6091] hover:underline" href={`mailto:${t('contact.email.value')}`}>{t('contact.email.value')}</a>
                    </p>
                    <p className="flex items-center">
                      <FaPhone className='text-md mr-1 text-[#184E77]' />
                      {t('contact.phone.label')}: <a className="text-[#1E6091] hover:underline" href={`tel:${t('contact.phone.value')}`}>{t('contact.phone.value')}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="bg-white shadow-md border-t-4 border-[#168AAD] p-6">
              <div className="flex items-center mb-4">
                <FaLocationDot className='text-xl mr-2 text-[#184E77]' />
                <h3 className="text-xl font-bold text-[#1E6091]">{t('contact.location.title')}</h3>
              </div>
              <div className="aspect-w-16 aspect-h-9 h-64 md:h-72">
                <iframe title={t('contact.location.iframeTitle')} src={t('contact.location.iframeSrc')} className="w-full h-full border-none" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="mt-4 text-center">
                <a href={t('contact.location.mapLink')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#1E6091] hover:text-[#184E77] font-medium">
                  {t('contact.location.mapLinkText')}
                  <IoIosLink className='text-xl ml-2 text-[#184E77]' />
                </a>
              </div>
            </div>
          </div>
          {/* Right – Personnel & Form */}
          <div className="space-y-8">
            {/* Personnel */}
            <div className="bg-white shadow-md border-t-4 border-[#1A759F] p-6">
              <div className="flex items-center mb-4">
                <MdGroups className='text-3xl text-[#184E77] mr-2' />
                <h3 className="text-xl font-bold text-[#1E6091]">{t('contact.personnel.title')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead><tr className="bg-[#1E6091] text-white">
                    {['name','designation','email','role'].map(key => <th key={key} className="px-4 py-3 text-left">{t(`contact.personnel.headers.${key}`)}</th>)}
                  </tr></thead>
                  <tbody>
                    {t('contact.personnel.list', { returnObjects: true }).map((p, i) => (
                      <tr key={i} className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-3 border-b">{p.name}</td>
                        <td className="px-4 py-3 border-b">{p.designation}</td>
                        <td className="px-4 py-3 border-b"><a className="text-[#1A759F] hover:underline" href={`mailto:${p.email}`}>{p.email}</a></td>
                        <td className="px-4 py-3 border-b">{p.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Form */}
            <div className="bg-white shadow-md border-t-4 border-[#34A0A4] p-6">
              <div className="flex items-center mb-4">
                <MdEmail className='text-3xl mr-2 text-[#184E77]' />
                <h3 className="text-xl font-bold text-[#1E6091]">{t('contact.form.title')}</h3>
              </div>
              {success && <p data-cy="contact-success" className="text-green-600 mb-4">{t('contact.form.success')}</p>}
              <form onSubmit={handleSubmit} className="space-y-5">
                {['name','email','phone','message'].map((field,i) => (
                  <div key={i}>
                    <label htmlFor={field} className="block text-gray-700 mb-2 font-medium">{t(`contact.form.labels.${field}`)}</label>
                    {field === 'message' ?
                      <textarea id={field} rows="4" required value={formData[field]} onChange={handleChange} placeholder={t(`contact.form.placeholders.${field}`)} className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-[#1A759F] focus:border-[#1A759F]" />
                      :
                      <input id={field} type={field==='email'? 'email': field==='phone'? 'tel':'text'} required={field!=='phone'} value={formData[field]} onChange={handleChange} placeholder={t(`contact.form.placeholders.${field}`)}
                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-[#1A759F] focus:border-[#1A759F]" />
                    }
                  </div>
                ))}
                <button type="submit" className="w-full py-3 bg-[#1E6091] hover:bg-[#184E77] text-white font-bold shadow-sm transition">
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-[#1E6091] to-[#184E77] p-6 text-center text-white">
          <h3 className="text-xl font-bold mb-3">{t('contact.hours.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {t('contact.hours.lines', { returnObjects: true }).map((l,i) => <p key={i}>{l}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactUs
