'use client'

import React from 'react'
import { CertificateData } from '../context/CertificateContext'

interface CertificateProps {
  data: CertificateData
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Certificate({ data }: CertificateProps) {
  return (
    <div 
      className="w-full bg-white print:bg-white"
      style={{ 
        borderLeft: '8px solid #b8860b',
        borderRight: '8px solid #b8860b',
        borderTop: '2px solid #000000',
        borderBottom: '2px solid #000000',
        fontFamily: '"Times New Roman", Times, serif',
        minHeight: '1000px',
        color: '#000000'
      }}
    >
      {/* Certificate Content */}
      <div className="p-16 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-4">
          {/* Company Logo */}
          {data.logo && (
            <div className="flex justify-center mb-4">
              <img src={data.logo} alt="Company Logo" className="h-20 object-contain" />
            </div>
          )}

          {/* Company Name */}
          <h1 className="text-4xl font-bold text-black tracking-widest" style={{ letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            {data.companyName}
          </h1>
        </div>

        {/* Date - Top Right */}
        {data.certificateDate && (
          <div className="text-right text-sm font-bold text-black mb-8">
            <span>Date: {formatDate(data.certificateDate)}</span>
          </div>
        )}

        {/* Certification Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black tracking-widest" style={{ letterSpacing: '0.3em' }}>
            C E R T I F I C A T I O N
          </h2>
          <div className="flex justify-center mt-3">
            <div className="w-32 h-px bg-black"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-5 leading-8 text-black">
          {/* Salutation */}
          <p className="font-bold text-sm">TO: WHOM IT MAY CONCERN,</p>

          {/* Main paragraph with italics */}
          <div className="italic leading-loose">
            <p>
              This Certificate serves as appreciation for the excellent performance of{' '}
              <span className="font-bold not-italic">{data.employeeName}</span>, who worked with our{' '}
              {data.department && <span>{data.department} </span>}
              Team
              {data.jobTitle && <span> in {data.jobTitle}</span>} activities.
            </p>
            
            <p className="mt-3">
              During his job tenure from{' '}
              <span className="font-bold not-italic">{formatDate(data.startDate)}</span> to{' '}
              <span className="font-bold not-italic">{formatDate(data.endDate)}</span>, he has shown diligence and integrity 
              with our project team. I have found his work to be highly professional, through and productive.
            </p>
          </div>

          {/* Description - if available */}
          {data.description && (
            <p className="whitespace-pre-wrap leading-relaxed">{data.description}</p>
          )}

          {/* Achievements Section */}
          {data.achievements && (
            <div>
              <p>
                For his outstanding performance during the completion of following projects:
              </p>
              <div className="ml-6 space-y-2 whitespace-pre-wrap">
                {data.achievements}
              </div>
            </div>
          )}

          {/* Closing paragraphs */}
          <p className="italic font-semibold">
            This Letter of Appreciation is issued for his efforts towards the completion of Project.
          </p>

          <p>
            In view of the above, we express him our sincere gratitude and best appreciation.
          </p>

          <p className="text-xs text-black">
            This certification is issued for any legal purpose it served.
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-16 pt-8" style={{ borderTop: '2px solid #000000' }}>
          <p className="text-sm font-bold mb-8 text-black">{data.companyName}, By</p>
          
          <div className="grid grid-cols-3 gap-12 text-center">
            {/* Manager Signature */}
            <div>
              <div className="h-20 flex items-end justify-center mb-1">
                {data.signatureManager && (
                  <img src={data.signatureManager} alt="Manager Signature" className="h-14 object-contain" />
                )}
              </div>
              <div style={{ borderTop: '2px solid #000000', paddingTop: '0.5rem' }}>
                <p className="font-bold text-sm text-black">{data.managerName}</p>
                {data.managerTitle && (
                  <p className="text-xs text-black">{data.managerTitle}</p>
                )}
              </div>
            </div>

            {/* Company Seal/Stamp */}
            <div>
              <div className="h-24 flex items-center justify-center mb-2">
                {data.stampImage && (
                  <img src={data.stampImage} alt="Company Seal" className="h-20 w-20 object-contain" />
                )}
              </div>
              {!data.stampImage && (
                <div className="border-4 border-blue-600 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                    <text x="12" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">SEAL</text>
                  </svg>
                </div>
              )}
            </div>


          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid #000000' }}>
          <p className="text-xs text-black text-center leading-relaxed mb-6">
            Issued this on {formatDate(data.certificateDate)} at {data.companyLocation} Main Office, Kingdom of Saudi Arabia. By {data.companyName}.
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-xs text-black">
            <div className="text-center">
              <p className="font-semibold">Company Info</p>
              <p>{data.companyLocation}</p>
            </div>
            <div className="text-center">
              <p>{data.companyName}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Contact</p>
              <p>For inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
