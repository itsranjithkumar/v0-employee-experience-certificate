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

const GoldRule = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '10px 0' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #b8960b, #d4af37, #b8960b, transparent)' }} />
    <div style={{ width: '5px', height: '5px', background: '#d4af37', transform: 'rotate(45deg)', flexShrink: 0 }} />
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #b8960b, #d4af37, #b8960b, transparent)' }} />
  </div>
)

const CornerOrnament = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const isTop = position === 'tl' || position === 'tr'
  const isLeft = position === 'tl' || position === 'bl'
  return (
    <svg
      width="48" height="48" viewBox="0 0 60 60"
      style={{
        position: 'absolute',
        top: isTop ? 20 : undefined,
        bottom: !isTop ? 20 : undefined,
        left: isLeft ? 20 : undefined,
        right: !isLeft ? 20 : undefined,
        transform: `rotate(${position === 'tl' ? 0 : position === 'tr' ? 90 : position === 'bl' ? 270 : 180}deg)`,
        opacity: 0.75,
        zIndex: 2,
      }}
    >
      <path d="M2 2 L30 2 L2 30 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
      <path d="M2 2 L14 2 L2 14 Z" fill="none" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="5" cy="5" r="2" fill="#d4af37" />
    </svg>
  )
}

export default function Certificate({ data }: CertificateProps) {
  const achievements = data.achievements
    ? data.achievements.split('\n').map(a => a.trim()).filter(Boolean)
    : []

  return (
    <div
      style={{
        fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, Georgia, serif',
        background: '#fdfaf3',
        color: '#1a1208',
        position: 'relative',
        width: '794px',
        height: '1123px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Borders */}
      <div style={{ position: 'absolute', inset: '12px', border: '3px solid #1a2e4a', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: '20px', border: '1px solid #d4af37', pointerEvents: 'none', zIndex: 1 }} />

      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {/* CONTENT — flex column, fills full 794×1123 */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '40px 70px 40px 70px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        boxSizing: 'border-box',
      }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          {data.logo ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <img src={data.logo} alt="Logo" style={{ maxHeight: '56px', maxWidth: '200px', objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a2e4a' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#d4af37">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
            </div>
          )}
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1a2e4a', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 3px', lineHeight: 1.2 }}>
            {data.companyName || 'Company Name'}
          </h1>
          <p style={{ fontSize: '9px', color: '#7a6030', letterSpacing: '0.28em', textTransform: 'uppercase', margin: 0 }}>
            {data.companyLocation}
          </p>
        </div>

        <GoldRule />

        {/* TITLE BLOCK */}
        <div style={{ textAlign: 'center', marginBottom: '10px', flexShrink: 0 }}>
          <div style={{ display: 'inline-block', padding: '4px 24px', background: '#1a2e4a', marginBottom: '6px' }}>
            <p style={{ color: '#d4af37', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
              Experience Certificate
            </p>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1a2e4a', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, lineHeight: 1.15 }}>
            C E R T I F I C A T E
          </h2>
        </div>

        {/* REF / DATE ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '6px 14px', background: '#f5edd8', borderLeft: '3px solid #d4af37', borderRight: '3px solid #d4af37', flexShrink: 0 }}>
          <div style={{ fontSize: '10px', color: '#7a6030', letterSpacing: '0.08em' }}>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', color: '#1a2e4a' }}>Ref No:</span>{' '}{data.employeeId || '—'}
          </div>
          <div style={{ fontSize: '10px', color: '#7a6030', letterSpacing: '0.08em' }}>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', color: '#1a2e4a' }}>Date:</span>{' '}{formatDate(data.certificateDate)}
          </div>
        </div>

        {/* SALUTATION */}
        <p style={{ fontWeight: 700, fontSize: '11px', color: '#1a2e4a', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px', flexShrink: 0 }}>
          To Whomsoever It May Concern,
        </p>

        {/* BODY — flex: 1 stretches to fill remaining space */}
        <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#2a1e08', textAlign: 'justify', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Text content */}
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 10px' }}>
              This is to certify that{' '}
              <strong style={{ color: '#1a2e4a', borderBottom: '1px solid #d4af37', paddingBottom: '1px' }}>
                {data.employeeName || '________________________'}
              </strong>
              , bearing Employee ID <strong>{data.employeeId || '—'}</strong>, was employed with{' '}
              <strong style={{ color: '#1a2e4a' }}>{data.companyName || '________________________'}</strong> as a{' '}
              <strong style={{ fontStyle: 'italic' }}>{data.jobTitle || '________________________'}</strong>
              {data.department ? <> within the <strong>{data.department}</strong> department</> : ''}, on a{' '}
              <strong>{data.employmentType}</strong> basis.
            </p>

            <p style={{ margin: '0 0 10px' }}>
              The period of employment was from{' '}
              <strong style={{ color: '#1a2e4a', borderBottom: '1px solid #d4af37', paddingBottom: '1px' }}>{formatDate(data.startDate)}</strong>{' '}
              to{' '}
              <strong style={{ color: '#1a2e4a', borderBottom: '1px solid #d4af37', paddingBottom: '1px' }}>{formatDate(data.endDate)}</strong>
              . Throughout the tenure, the employee demonstrated commendable professionalism, diligence, and integrity in all assigned responsibilities.
            </p>

            {data.description && (
              <p style={{ margin: '0 0 10px' }}>{data.description}</p>
            )}

            {achievements.length > 0 && (
              <div style={{ margin: '0 0 10px' }}>
                <p style={{ margin: '0 0 6px' }}>Noteworthy contributions and accomplishments during the employment period include:</p>
                <div style={{ marginLeft: '12px', paddingLeft: '12px', borderLeft: '2px solid #d4af37' }}>
                  {achievements.map((item, i) => (
                    <p key={i} style={{ margin: '0 0 4px', fontSize: '12.5px' }}>{item}</p>
                  ))}
                </div>
              </div>
            )}

            <p style={{ margin: '0 0 8px', fontStyle: 'italic' }}>
              We wish {data.employeeName ? data.employeeName.split(' ')[0] : 'the individual'}{' '}
              continued success in all future professional endeavors and wholeheartedly recommend their services to any prospective employer.
            </p>

            <p style={{ fontSize: '10px', color: '#7a6030', margin: 0, letterSpacing: '0.04em' }}>
              This certificate is issued in good faith and is valid for all legal and professional purposes it may serve.
            </p>
          </div>

          {/* SIGNATURE — always pinned above footer */}
          <div style={{ marginTop: '22px', paddingTop: '14px', borderTop: '1px solid #c8b880', flexShrink: 0 }}>
            <p style={{ fontSize: '11px', color: '#1a2e4a', fontWeight: 600, margin: '0 0 14px', letterSpacing: '0.04em' }}>
              Issued by: <span style={{ fontStyle: 'italic' }}>{data.companyName}</span>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Signature col */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '8px' }}>
                  {data.signatureManager ? (
                    <img src={data.signatureManager} alt="Signature" style={{ maxHeight: '80px', maxWidth: '220px', objectFit: 'contain', objectPosition: 'bottom' }} />
                  ) : (
                    <div style={{ width: '200px', height: '2px', background: 'repeating-linear-gradient(90deg, #c8b880 0, #c8b880 6px, transparent 6px, transparent 12px)' }} />
                  )}
                </div>
                <div style={{ borderTop: '2px solid #1a2e4a', paddingTop: '8px' }}>
                  <p style={{ fontWeight: 700, fontSize: '13px', margin: '2px 0', color: '#1a2e4a', letterSpacing: '0.04em' }}>{data.managerName || '________________________'}</p>
                  {data.managerTitle && <p style={{ fontSize: '11px', color: '#7a6030', margin: '2px 0', fontStyle: 'italic' }}>{data.managerTitle}</p>}
                  <p style={{ fontSize: '10px', color: '#7a6030', margin: '2px 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Authorised Signatory</p>
                </div>
              </div>
              {/* Seal col */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  {data.stampImage ? (
                    <img src={data.stampImage} alt="Seal" style={{ maxHeight: '90px', maxWidth: '90px', width: '90px', height: '90px', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ width: '88px', height: '88px', borderRadius: '50%', border: '2px dashed #c8b880', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ fontSize: '8px', color: '#c8b880', textAlign: 'center', lineHeight: 1.4, padding: '6px' }}>OFFICIAL<br />SEAL</p>
                    </div>
                  )}
                </div>
                <div style={{ borderTop: '2px solid #1a2e4a', paddingTop: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#7a6030', margin: '2px 0', fontStyle: 'italic' }}>{data.companyName || 'Company Name'}</p>
                  <p style={{ fontSize: '10px', color: '#7a6030', margin: '2px 0', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Company Seal</p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #c8b880', textAlign: 'center', flexShrink: 0 }}>
            <GoldRule />
            <p style={{ fontSize: '9.5px', color: '#7a6030', letterSpacing: '0.06em', lineHeight: '1.6', margin: 0 }}>
              Issued on <strong>{formatDate(data.certificateDate)}</strong> at <strong>{data.companyLocation}</strong> by <strong>{data.companyName}</strong>.
              <br />
              This document bears the official seal of the organisation and is duly signed by an authorised representative.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}