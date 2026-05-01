'use client'

import React, { useRef } from 'react'
import { CertificateData } from '../context/CertificateContext'

interface CertificateProps {
  data: CertificateData
}

export default function Certificate({ data }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getTitle = (name: string) => {
    if (name.toLowerCase().includes('mr') || name.toLowerCase().includes('ms') || 
        name.toLowerCase().includes('mrs') || name.toLowerCase().includes('mrs')) {
      return ''
    }
    // Simple heuristic: if name starts with certain letters, guess gender (this is just for demo)
    return 'Mr./Ms.'
  }

  return (
    <div
      ref={certificateRef}
      className="w-full max-w-4xl mx-auto bg-white p-8 md:p-16 shadow-2xl rounded-lg border-4 border-amber-900 print:shadow-none print:border-0"
      style={{
        aspectRatio: '8.5 / 11',
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      {/* Certificate Header */}
      <div className="text-center mb-12">
        {/* Company Logo Placeholder */}
        <div className="mb-6 h-20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-slate-300 flex items-center justify-center bg-slate-100">
            <span className="text-sm font-bold text-slate-400">LOGO</span>
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-wide">
          {data.companyName}
        </h1>

        {/* Certificate Title */}
        <div className="border-t-2 border-b-2 border-slate-400 py-4 my-6">
          <h2 className="text-3xl font-bold text-slate-900 tracking-wider">
            EXPERIENCE CERTIFICATE
          </h2>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="text-center mb-12 leading-8">
        <p className="text-slate-800 text-lg mb-6">
          This is to certify that <span className="font-bold">{getTitle(data.employeeName)} {data.employeeName}</span>, holding Employee ID{' '}
          <span className="font-bold">{data.employeeId}</span>, was employed with{' '}
          <span className="font-bold">{data.companyName}</span> as a{' '}
          <span className="font-bold">{data.jobTitle}</span> in the{' '}
          <span className="font-bold">{data.department}</span> from{' '}
          <span className="font-bold">{formatDate(data.startDate)}</span> to{' '}
          <span className="font-bold">{formatDate(data.endDate)}</span>.
        </p>

        <p className="text-slate-800 text-lg leading-8 mb-6">
          During their tenure with us, they have demonstrated professionalism, dedication,
          and strong work ethics. Their contributions to the organization have been valuable
          and appreciated.
        </p>

        <p className="text-slate-800 text-lg">
          We wish them success in their future endeavors.
        </p>
      </div>

      {/* Signature Section */}
      <div className="mt-16 pt-8 border-t border-slate-300">
        <div className="grid grid-cols-3 gap-8 text-center">
          {/* Manager Signature */}
          <div>
            <div className="h-16 mb-2 flex items-flex-end justify-center">
              <div className="w-24 border-t-2 border-slate-800"></div>
            </div>
            <p className="text-slate-800 font-bold text-sm">{data.managerName}</p>
            <p className="text-slate-600 text-xs">Manager</p>
          </div>

          {/* Date */}
          <div>
            <div className="h-16 mb-2 flex items-flex-end justify-center">
              <div className="text-slate-800 text-sm font-semibold">
                {getTodayDate()}
              </div>
            </div>
            <p className="text-slate-800 font-bold text-sm">Date</p>
            <p className="text-slate-600 text-xs">of Issue</p>
          </div>

          {/* HR Signature */}
          <div>
            <div className="h-16 mb-2 flex items-flex-end justify-center">
              <div className="w-24 border-t-2 border-slate-800"></div>
            </div>
            <p className="text-slate-800 font-bold text-sm">{data.hrName}</p>
            <p className="text-slate-600 text-xs">HR</p>
          </div>
        </div>

        {/* Company Location Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-700 font-semibold text-sm">
            {data.companyLocation}
          </p>
        </div>
      </div>
    </div>
  )
}
