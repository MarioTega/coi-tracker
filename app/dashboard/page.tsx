

import { VendorComplianceDashboard } from '@/components/dashboard/VectorCompliance';

export default function Dashboard(){
    
    return(
        
        <VendorComplianceDashboard
            organizationName="Example Organization"
            vendors={[
                {
                    id: "1",
                    companyName: "Example Vendor 1",
                    coverageSummary: "$1M GL · $500K Auto",
                    status: "compliant",
                    expirationDate: "2023-12-31"
                },
                {
                    id: "2",
                    companyName: "Example Vendor 2",
                    coverageSummary: "$2M GL · $1M Auto",
                    status: "expiring",
                    expirationDate: "2023-06-30"
                }
            ]}
        ></VendorComplianceDashboard>
    )
    
}

