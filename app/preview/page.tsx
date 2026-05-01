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
      if (!element) return

      const html2pdf = (await import('html2pdf.js')).default

      const options = {
        margin: 5,
        filename: `${data.employeeName}_experience_certificate.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' },
      }

      html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-6 text-slate-700 border-slate-300 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Experience Certificate Preview
              </h1>
              <p className="text-slate-600 mt-2">
                Review the certificate below and download as PDF
              </p>
            </div>

            <Button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Certificate Container */}
        <div ref={certificateRef} className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <Certificate data={data} />
        </div>

        {/* Print Instructions */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-slate-700">
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
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  )
}
