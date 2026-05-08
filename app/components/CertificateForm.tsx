'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Wand2, FileText, User, MapPin, PenTool, Award } from 'lucide-react'
import { DUMMY_CERTIFICATE_DATA } from '../context/CertificateContext'

interface CertificateFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

const sectionClass = 'border-t border-[#2a3a5c] pt-7 mt-2'
const labelClass = 'text-[#c9a84c] font-semibold text-xs uppercase tracking-widest'
const inputClass =
  'bg-[#0f1c35] border border-[#2a3a5c] text-[#e8dcc8] placeholder:text-[#4a5a7a] focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] rounded-md h-10 text-sm transition-all'
const textareaClass =
  'bg-[#0f1c35] border border-[#2a3a5c] text-[#e8dcc8] placeholder:text-[#4a5a7a] focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] rounded-md text-sm transition-all min-h-[96px]'

export default function CertificateForm({ onSubmit, isLoading }: CertificateFormProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    const element = printRef.current
    if (!element) return

    try {
      const html2pdf = (await import('html2pdf.js')).default

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `certificate-${Date.now()}.pdf`,
        image: {
          type: 'jpeg' as 'jpeg' | 'png' | 'webp',
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          orientation: 'portrait' as 'portrait' | 'landscape',
          unit: 'mm',
          format: 'a4',
        },
        pagebreak: {
          mode: ['avoid-all'],
        },
      }

      html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('PDF generation failed:', error)
      window.print()
    }
  }

  const emptyForm = {
    employeeName: '',
    employeeId: '',
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    employmentType: 'Full-time',
    department: '',
    managerName: '',
    managerTitle: '',
    companyLocation: '',
    certificateDate: '',
    description: '',
    achievements: '',
    logo: '',
    signatureManager: '',
    stampImage: '',
  }

  const [formData, setFormData] = useState(emptyForm)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [stampPreview, setStampPreview] = useState<string>('')
  const [signaturePreview, setSignaturePreview] = useState<string>('')
  const [filled, setFilled] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'stamp' | 'signature'
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        const key =
          type === 'logo' ? 'logo' : type === 'stamp' ? 'stampImage' : 'signatureManager'
        setFormData(prev => ({ ...prev, [key]: base64 }))
        if (type === 'logo') setLogoPreview(base64)
        if (type === 'stamp') setStampPreview(base64)
        if (type === 'signature') setSignaturePreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFillDummy = () => {
    setFormData(DUMMY_CERTIFICATE_DATA)
    setLogoPreview('')
    setStampPreview('')
    setSignaturePreview('')
    setFilled(true)
    setTimeout(() => setFilled(false), 2000)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const UploadBox = ({
    label,
    type,
    preview,
    hint,
  }: {
    label: string
    type: 'logo' | 'stamp' | 'signature'
    preview: string
    hint: string
  }) => (
    <div className="rounded-xl border border-[#2a3a5c] bg-[#0a1628] p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <Upload className="w-3.5 h-3.5 text-[#c9a84c]" />
        <span className={labelClass}>{label}</span>
      </div>
      <p className="text-[#4a5a7a] text-xs">{hint}</p>
      <label className="cursor-pointer group">
        <div className="border-2 border-dashed border-[#2a3a5c] group-hover:border-[#c9a84c] transition-colors rounded-lg p-4 flex flex-col items-center gap-2 bg-[#0f1c35]">
          {preview ? (
            <img
              src={preview}
              alt={label}
              className="object-contain max-h-20 max-w-full rounded"
              style={{ maxWidth: type === 'stamp' ? '80px' : '160px' }}
            />
          ) : (
            <>
              <Upload className="w-6 h-6 text-[#4a5a7a] group-hover:text-[#c9a84c] transition-colors" />
              <span className="text-[#4a5a7a] text-xs group-hover:text-[#c9a84c] transition-colors">
                Click to upload
              </span>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleImageUpload(e, type)}
        />
      </label>
    </div>
  )

  return (
    <div
      ref={printRef}
      className="w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: '#07111f', border: '1px solid #1e2f4a' }}
    >
      {/* Header */}
      <div
        className="px-8 py-6 flex items-center justify-between"
        style={{
          background: 'linear-gradient(135deg, #0d1f3a 0%, #0a1628 100%)',
          borderBottom: '1px solid #1e2f4a',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #a07830)' }}
          >
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-[#e8dcc8] font-bold text-lg tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Certificate Details
            </h2>
            <p className="text-[#4a5a7a] text-xs tracking-widest uppercase">
              Experience Certificate Generator
            </p>
          </div>
        </div>
        {/* Dummy Fill Button */}
        <button
          type="button"
          onClick={handleFillDummy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all"
          style={{
            background: filled
              ? 'linear-gradient(135deg, #2a7a4a, #1a5a3a)'
              : 'linear-gradient(135deg, #1e3a6a, #162d54)',
            border: `1px solid ${filled ? '#2a7a4a' : '#c9a84c'}`,
            color: filled ? '#7effc0' : '#c9a84c',
          }}
        >
          <Wand2 className="w-3.5 h-3.5" />
          {filled ? 'Filled!' : 'Fill Sample Data'}
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="px-8 py-8 space-y-8">
        {/* Logo Upload */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-[#c9a84c]" />
            <span
              className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest"
            >
              Company Identity
            </span>
          </div>
          <UploadBox
            label="Company Logo"
            type="logo"
            preview={logoPreview}
            hint="Upload your company logo. Recommended: PNG with transparent background."
          />
        </div>

        {/* Company Name */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest">
              Company Information
            </span>
          </div>
          <div className="space-y-2">
            <Label className={labelClass}>Company Name *</Label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="e.g., NovaTech Solutions Pvt. Ltd."
              className={inputClass}
            />
          </div>
        </div>

        {/* Employee Information */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest">
              Employee Information
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Full Name *', name: 'employeeName', placeholder: 'e.g., Arjun Mehta', required: true },
              { label: 'Employee ID *', name: 'employeeId', placeholder: 'e.g., EMP-2021-0847', required: true },
              { label: 'Job Title *', name: 'jobTitle', placeholder: 'e.g., Senior Software Engineer', required: true },
              { label: 'Department *', name: 'department', placeholder: 'e.g., Product Engineering', required: true },
            ].map(field => (
              <div key={field.name} className="space-y-2">
                <Label className={labelClass}>{field.label}</Label>
                <Input
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label className={labelClass}>Start Date *</Label>
              <Input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className={labelClass}>End Date *</Label>
              <Input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className={labelClass}>Employment Type</Label>
              <Select
                value={formData.employmentType}
                onValueChange={v => handleSelectChange('employmentType', v)}
              >
                <SelectTrigger
                  className="h-10 rounded-md text-sm"
                  style={{
                    background: '#0f1c35',
                    border: '1px solid #2a3a5c',
                    color: '#e8dcc8',
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: '#0f1c35', border: '1px solid #2a3a5c' }}>
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map(v => (
                    <SelectItem key={v} value={v} className="text-[#e8dcc8] focus:bg-[#1e2f4a]">
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className={labelClass}>Certificate Issue Date *</Label>
              <Input
                name="certificateDate"
                type="date"
                value={formData.certificateDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest">
              Location
            </span>
          </div>
          <div className="space-y-2">
            <Label className={labelClass}>Company Location / City *</Label>
            <Input
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleChange}
              required
              placeholder="e.g., Chennai, Tamil Nadu"
              className={inputClass}
            />
          </div>
        </div>

        {/* Signatory */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <PenTool className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest">
              Signatory Information
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={labelClass}>Authorizing Manager Name *</Label>
              <Input
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                required
                placeholder="e.g., Rajesh Krishnamurthy"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className={labelClass}>Manager Designation</Label>
              <Input
                name="managerTitle"
                value={formData.managerTitle}
                onChange={handleChange}
                placeholder="e.g., Vice President – Engineering"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Signatures & Stamp */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <PenTool className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest">
              Signatures &amp; Company Seal
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UploadBox
              label="Manager Signature"
              type="signature"
              preview={signaturePreview}
              hint="Upload signature image. PNG with transparent background preferred. Max display: 180×60px."
            />
            <UploadBox
              label="Company Stamp / Seal"
              type="stamp"
              preview={stampPreview}
              hint="Upload official company seal. PNG with transparent background preferred. Max display: 100×100px."
            />
          </div>
        </div>

        {/* Certificate Content */}
        <div className={sectionClass}>
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-4 h-4 text-[#c9a84c]" />
            <span className="text-[#c9a84c] font-bold text-xs uppercase tracking-widest">
              Certificate Content
            </span>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className={labelClass}>Certificate Description *</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the employee's role, conduct, and contributions during their tenure..."
                className={textareaClass}
              />
            </div>
            <div className="space-y-2">
              <Label className={labelClass}>Key Achievements &amp; Projects</Label>
              <Textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="• Project / Achievement 1&#10;• Project / Achievement 2&#10;• Award or recognition..."
                className={textareaClass}
                style={{ minHeight: '120px' }}
              />
            </div>
          </div>
        </div>

        {/* Submit & Download */}
        <div className="pt-6 space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: isLoading
                ? '#1e2f4a'
                : 'linear-gradient(135deg, #c9a84c 0%, #a07830 100%)',
              color: isLoading ? '#4a5a7a' : '#07111f',
              boxShadow: isLoading ? 'none' : '0 4px 20px rgba(201,168,76,0.3)',
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Generating Certificate...
              </span>
            ) : (
              '✦ Preview Certificate'
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all"
            style={{
              background: 'linear-gradient(135deg, #1e3a6a, #162d54)',
              color: '#c9a84c',
              border: '1px solid #c9a84c',
              boxShadow: '0 4px 20px rgba(201,168,76,0.2)',
            }}
          >
            ⬇ Download as PDF
          </button>
        </div>
      </form>
    </div>
  )
}
