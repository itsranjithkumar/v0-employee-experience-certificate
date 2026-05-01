'use client'

import React, { useState } from 'react'
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
import { Upload } from 'lucide-react'

interface CertificateFormProps {
  onSubmit: (data: any) => void
  isLoading: boolean
}

export default function CertificateForm({ onSubmit, isLoading }: CertificateFormProps) {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    jobTitle: '',
    companyName: '',
    companyNameArabic: '',
    startDate: '',
    endDate: '',
    employmentType: 'Full-time',
    department: '',
    managerName: '',
    managerTitle: '',
    hrName: '',
    hrTitle: '',
    companyLocation: '',
    certificateDate: '',
    description: '',
    achievements: '',
    logo: '',
    signatureManager: '',
    stampImage: '',
  })
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [stampPreview, setStampPreview] = useState<string>('')
  const [signaturePreview, setSignaturePreview] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'stamp' | 'signature') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setFormData(prev => ({ ...prev, [type === 'logo' ? 'logo' : type === 'stamp' ? 'stampImage' : 'signatureManager']: base64 }))
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }



  return (
    <Card className="border border-amber-300 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <CardTitle className="text-amber-900">Certificate Information</CardTitle>
        <CardDescription className="text-amber-700">
          Fill in all details to generate a professional certificate
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Logo Section */}
          <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 bg-amber-50">
            <Label className="text-amber-900 font-semibold text-lg block mb-4">Company Logo Upload</Label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  className="border-amber-300 flex-1"
                />
                <Upload className="w-5 h-5 text-amber-700" />
              </div>
              {logoPreview && (
                <div className="flex items-center justify-center">
                  <img src={logoPreview} alt="Logo preview" className="h-16 object-contain" />
                </div>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-amber-900 font-semibold">Company Name (English)</Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="e.g., SAUDI TECHINT LTD."
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyNameArabic" className="text-amber-900 font-semibold">Company Name (Arabic)</Label>
            <Input
              id="companyNameArabic"
              name="companyNameArabic"
              type="text"
              value={formData.companyNameArabic}
              onChange={handleChange}
              placeholder="e.g., شركة لكينيت السعودية المحدودة"
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Employee Information */}
          <div className="border-t border-amber-200 pt-6">
            <h3 className="text-amber-900 font-semibold text-lg mb-4">Employee Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName" className="text-amber-800">Full Name</Label>
                <Input
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="text-amber-800">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  placeholder="Employee ID"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-amber-800">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  placeholder="Job title"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-amber-800">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="Department"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-amber-800">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-amber-800">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentType" className="text-amber-800">Employment Type</Label>
                <Select
                  value={formData.employmentType}
                  onValueChange={(value) => handleSelectChange('employmentType', value)}
                >
                  <SelectTrigger className="border-amber-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="certificateDate" className="text-amber-800">Certificate Date</Label>
                <Input
                  id="certificateDate"
                  name="certificateDate"
                  type="date"
                  value={formData.certificateDate}
                  onChange={handleChange}
                  required
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          {/* Signature & Dates */}
          <div className="border-t border-amber-200 pt-6">
            <h3 className="text-amber-900 font-semibold text-lg mb-4">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyLocation" className="text-amber-800">Location/City</Label>
                <Input
                  id="companyLocation"
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Dhahran"
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          {/* Manager & HR Section */}
          <div className="border-t border-amber-200 pt-6">
            <h3 className="text-amber-900 font-semibold text-lg mb-4">Signatory Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName" className="text-amber-800">Manager Name</Label>
                <Input
                  id="managerName"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  required
                  placeholder="Manager name"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerTitle" className="text-amber-800">Manager Title</Label>
                <Input
                  id="managerTitle"
                  name="managerTitle"
                  value={formData.managerTitle}
                  onChange={handleChange}
                  placeholder="e.g., Project Manager"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hrName" className="text-amber-800">HR Name</Label>
                <Input
                  id="hrName"
                  name="hrName"
                  value={formData.hrName}
                  onChange={handleChange}
                  required
                  placeholder="HR name"
                  className="border-amber-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hrTitle" className="text-amber-800">HR Title</Label>
                <Input
                  id="hrTitle"
                  name="hrTitle"
                  value={formData.hrTitle}
                  onChange={handleChange}
                  placeholder="e.g., HR Manager"
                  className="border-amber-200"
                />
              </div>
            </div>
          </div>

          {/* Signature Uploads */}
          <div className="border-t border-amber-200 pt-6">
            <h3 className="text-amber-900 font-semibold text-lg mb-4">Signatures & Stamp</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 bg-amber-50">
                <Label className="text-amber-800 font-medium text-sm block mb-2">Manager Signature</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'signature')}
                  className="border-amber-300 text-sm mb-2"
                />
                {signaturePreview && (
                  <img src={signaturePreview} alt="Signature" className="h-12 object-contain" />
                )}
              </div>
              <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 bg-amber-50">
                <Label className="text-amber-800 font-medium text-sm block mb-2">Company Stamp/Seal</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'stamp')}
                  className="border-amber-300 text-sm mb-2"
                />
                {stampPreview && (
                  <img src={stampPreview} alt="Stamp" className="h-16 object-contain" />
                )}
              </div>
            </div>
          </div>

          {/* Certificate Description */}
          <div className="border-t border-amber-200 pt-6">
            <h3 className="text-amber-900 font-semibold text-lg mb-4">Certificate Content</h3>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-amber-800 font-medium">Certificate Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the employee's work and contributions..."
                className="border-amber-200 min-h-24"
                required
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="achievements" className="text-amber-800 font-medium">Key Achievements/Projects</Label>
              <Textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                placeholder="List major projects and achievements..."
                className="border-amber-200 min-h-24"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-amber-200">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition-colors text-lg"
            >
              {isLoading ? 'Generating...' : 'Preview Certificate'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
