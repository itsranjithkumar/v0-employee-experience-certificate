'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
    startDate: '',
    endDate: '',
    employmentType: 'Full-time',
    department: '',
    managerName: '',
    hrName: '',
    companyLocation: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const inputFields = [
    { label: 'Employee Full Name', name: 'employeeName', type: 'text', required: true },
    { label: 'Employee ID', name: 'employeeId', type: 'text', required: true },
    { label: 'Job Title / Designation', name: 'jobTitle', type: 'text', required: true },
    { label: 'Company Name', name: 'companyName', type: 'text', required: true },
    { label: 'Start Date', name: 'startDate', type: 'date', required: true },
    { label: 'End Date', name: 'endDate', type: 'date', required: true },
    { label: 'Department', name: 'department', type: 'text', required: true },
    { label: 'Manager Name', name: 'managerName', type: 'text', required: true },
    { label: 'HR Name', name: 'hrName', type: 'text', required: true },
    { label: 'Company Location', name: 'companyLocation', type: 'text', required: true },
  ]

  return (
    <Card className="border border-slate-200 shadow-lg">
      <CardHeader className="bg-white border-b border-slate-200">
        <CardTitle>Employee Details</CardTitle>
        <CardDescription>
          Please fill in all the required information to generate the certificate
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* First Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.slice(0, 6).map(field => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-slate-700 font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.label}
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employmentType" className="text-slate-700 font-medium">
              Type of Employment
            </Label>
            <Select
              value={formData.employmentType}
              onValueChange={(value) => handleSelectChange('employmentType', value)}
            >
              <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Second Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.slice(6).map(field => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-slate-700 font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.label}
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Certificate'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
