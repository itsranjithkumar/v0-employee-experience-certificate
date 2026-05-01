'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCertificate } from './context/CertificateContext'
import CertificateForm from './components/CertificateForm'

export default function FormPage() {
  const router = useRouter()
  const { setData } = useCertificate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (formData: any) => {
    setIsLoading(true)
    setData(formData)
    setTimeout(() => {
      router.push('/preview')
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Certificate Generator
          </h1>
          <p className="text-lg text-slate-600">
            Create professional experience certificates for your employees
          </p>
        </div>

        <CertificateForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
