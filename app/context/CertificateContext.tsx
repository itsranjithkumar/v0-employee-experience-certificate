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
  managerTitle: string
  companyLocation: string
  certificateDate: string
  description: string
  achievements: string
  logo: string
  signatureManager: string
  stampImage: string
}

export const DUMMY_CERTIFICATE_DATA: CertificateData = {
  employeeName: 'Arjun Mehta',
  employeeId: 'EMP-2021-0847',
  jobTitle: 'Senior Software Engineer',
  companyName: 'NovaTech Solutions Pvt. Ltd.',
  startDate: '2021-03-15',
  endDate: '2024-11-30',
  employmentType: 'Full-time',
  department: 'Product Engineering',
  managerName: 'Rajesh Krishnamurthy',
  managerTitle: 'Vice President – Engineering',
  companyLocation: 'Chennai, Tamil Nadu',
  certificateDate: '2024-12-05',
  description:
    'Mr. Arjun Mehta served as a Senior Software Engineer within our Product Engineering division and consistently demonstrated exceptional technical acumen, leadership, and commitment to quality. He played a pivotal role in architecting scalable backend systems and mentoring junior engineers, earning high regard from peers and stakeholders alike.',
  achievements:
    '• Led the end-to-end development of the NovaPay microservices platform, reducing transaction latency by 42%\n• Architected the real-time analytics dashboard adopted across 3 enterprise clients\n• Spearheaded migration of legacy monolith to cloud-native AWS infrastructure\n• Received the "Innovator of the Quarter" award – Q3 2023',
  logo: '',
  signatureManager: '',
  stampImage: '',
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
    managerTitle: '',
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