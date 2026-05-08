'use client'

import React from 'react'
import { useCertificate } from '../context/CertificateContext'
import Certificate from '../components/Certificate'

export default function PreviewPage() {
  const { data } = useCertificate()

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: 794px 1123px;
            margin: 0;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            width: 794px !important;
            height: 1123px !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }
          body * { visibility: hidden; }
          #cert-area, #cert-area * { visibility: visible !important; }
          #cert-area {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 794px !important;
            height: 1123px !important;
            margin: 0 !important; padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
            box-shadow: none !important;
          }
          #cert-inner {
            width: 794px !important;
            height: 1123px !important;
            transform: none !important;
          }
          .no-print { display: none !important; }
        }

        @media screen {
          html, body { margin: 0; padding: 0; }
          body {
            background: #0d1a2e;
            min-height: 100vh;
            padding: 32px 16px 100px;
            box-sizing: border-box;
          }
          #cert-area {
            width: 794px;
            height: 1123px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 40px rgba(0,0,0,0.28);
            overflow: hidden;
          }
          #cert-inner {
            width: 794px;
            height: 1123px;
            overflow: hidden;
          }
        }
      `}</style>

      <div id="cert-area">
        <div id="cert-inner">
          <Certificate data={data} />
        </div>
      </div>

      <div className="no-print" style={{ position: 'fixed', bottom: '28px', right: '28px', display: 'flex', gap: '10px', zIndex: 1000 }}>
        <button
          onClick={() => window.history.back()}
          style={{ padding: '11px 22px', background: '#1e3a6a', color: '#c9a84c', border: '1px solid #c9a84c', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', letterSpacing: '0.05em' }}
        >
          ← Back
        </button>
        <button
          onClick={handleDownloadPDF}
          style={{ padding: '11px 26px', background: 'linear-gradient(135deg, #c9a84c, #a07830)', color: '#07111f', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', boxShadow: '0 4px 20px rgba(201,168,76,0.35)' }}
        >
          ⬇ Download PDF
        </button>
      </div>
    </>
  )
}