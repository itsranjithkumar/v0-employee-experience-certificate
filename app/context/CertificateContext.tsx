'use client'

import React, { createContext, useContext, useState } from 'react'

export interface CertificateData {
  employeeName: string
  employeeId: string
  jobTitle: string
  companyName: string
  companyNameArabic: string
  startDate: string
  endDate: string
  employmentType: string
  department: string
  managerName: string
  managerTitle: string
  hrName: string
  hrTitle: string
  companyLocation: string
  certificateDate: string
  description: string
  achievements: string
  logo: string
  signatureManager: string
  stampImage: string
}

interface CertificateContextType {
  data: CertificateData
  setData: (data: CertificateData) => void
}

const CertificateContext = createContext<CertificateContextType | undefined>(undefined)

export function CertificateProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CertificateData>({
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

  return (
    <CertificateContext.Provider value={{ data, setData }}>
      {children}
    </CertificateContext.Provider>
  )
}

export function useCertificate() {
  const context = useContext(CertificateContext)
  if (context === undefined) {
    throw new Error('useCertificate must be used within CertificateProvider')
  }
  return context
}
