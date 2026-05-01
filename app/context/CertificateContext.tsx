'use client'

import React, { createContext, useContext, useState } from 'react'

export interface CertificateData {
  employeeName: string
  employeeId: string
  jobTitle: string
  companyName: string
  startDate: string
  endDate: string
  employmentType: string
  department: string
  managerName: string
  hrName: string
  companyLocation: string
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
    startDate: '',
    endDate: '',
    employmentType: 'Full-time',
    department: '',
    managerName: '',
    hrName: '',
    companyLocation: '',
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
