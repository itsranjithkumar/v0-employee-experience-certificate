'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCertificate } from '../context/CertificateContext'
import Certificate from '../components/Certificate'
import { Download, ArrowLeft } from 'lucide-react'

export default function PreviewPage() {
  const router = useRouter()
  const { data } = useCertificate()
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    try {
      const element = certificateRef.current
      console.log('Element:', element);
      if (!element) return

      const html2pdf = (await import('html2pdf.js')).default

      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${data.employeeName || 'certificate'}_certificate.pdf`,
        image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { format: 'a4', orientation: 'portrait' as 'portrait', unit: 'mm' },
      }

      await html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error('[v0] PDF Download Error:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-6 text-amber-800 border-amber-300 hover:bg-amber-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-amber-950">
                Certificate Preview
              </h1>
              <p className="text-amber-800 mt-2">
                Review your certificate and download as PDF
              </p>
            </div>

            <Button
              onClick={handleDownloadPDF}
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Certificate Container */}
        <div className="bg-white overflow-hidden shadow-2xl">
          <div ref={certificateRef} style={{ pageBreakAfter: 'avoid' }}>
            <Certificate data={data} />
          </div>
        </div>

        {/* Print Instructions */}
        <div className="mt-8 p-6 bg-amber-100 border border-amber-300 rounded-lg text-center">
          <p className="text-amber-900">
            You can also <strong>print directly to PDF</strong> using your browser&apos;s print function (Ctrl+P or Cmd+P)
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          div {
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .max-w-5xl {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
