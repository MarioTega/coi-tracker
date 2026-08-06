export type VendorComplianceRow = {
  id: string
  companyName: string
  coverageSummary: string // e.g. "$1M GL · $500K Auto"
  status: 'compliant' | 'expiring' | 'non_compliant' | 'pending'
  expirationDate: string | null // ISO date string, or null if no cert on file
}

const STATUS_CONFIG = {
  compliant: { label: 'COMPLIANT', color: '#3FB950' },
  expiring: { label: 'EXPIRING SOON', color: '#FBBF24' },
  non_compliant: { label: 'NON-COMPLIANT', color: '#F87171' },
  pending: { label: 'AWAITING UPLOAD', color: '#8A8A93' },
} as const

function StatusTag({ status }: { status: VendorComplianceRow['status'] }) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className="font-sans text-[11px] tracking-wider px-2 py-1  whitespace-nowrap"
      style={{ color: config.color}}
    >
       {config.label} 
    </span>
  )
}

function formatDate(dateString: string | null) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}

export function VendorComplianceDashboard({
  organizationName,
  vendors,
}: {
  organizationName: string
  vendors: VendorComplianceRow[]
}) {
  const counts = {
    compliant: vendors.filter((v) => v.status === 'compliant').length,
    expiring: vendors.filter((v) => v.status === 'expiring').length,
    non_compliant: vendors.filter((v) => v.status === 'non_compliant').length,
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAF9]">
      {/* Top bar */}
      <header className="border-b border-[#27272A] px-6 py-4 flex items-center justify-between">
        <span className="font-sans text-xs tracking-[0.2em] text-[#8A8A93]">
          CERTTRACK
        </span>
        <span className="font-sans text-xs tracking-wider text-[#FAFAF9]">
          {organizationName.toUpperCase()}
        </span>
      </header>

      <main className="px-6 py-10 max-w-6xl mx-auto">
        <p className="font-sans text-xs tracking-[0.2em] text-[#FF5A1F] mb-2">
          COMPLIANCE OVERVIEW
        </p>

        {/* Asymmetric stats strip: one hero number + three small counts */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 border-b border-[#27272A] pb-8 mb-8">
          <div>
            <div className="text-6xl font-semibold tracking-tight">
              {vendors.length}
            </div>
            <div className="font-sans text-xs tracking-wider text-[#8A8A93] mt-1">
              ACTIVE VENDORS TRACKED
            </div>
          </div>

          <div className="flex gap-8">
            <div>
              <div className="text-2xl font-semibold" style={{ color: STATUS_CONFIG.compliant.color }}>
                {counts.compliant}
              </div>
              <div className="font-sans text-[11px] tracking-wider text-[#8A8A93] mt-1">
                COMPLIANT
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold" style={{ color: STATUS_CONFIG.expiring.color }}>
                {counts.expiring}
              </div>
              <div className="font-sans text-[11px] tracking-wider text-[#8A8A93] mt-1">
                EXPIRING SOON
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold" style={{ color: STATUS_CONFIG.non_compliant.color }}>
                {counts.non_compliant}
              </div>
              <div className="font-sans text-[11px] tracking-wider text-[#8A8A93] mt-1">
                NON-COMPLIANT
              </div>
            </div>
          </div>
        </div>

        {/* Vendor manifest table */}
        <div className="border border-[#27272A]">
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 px-4 py-3 border-b border-[#27272A] font-sans text-[11px] tracking-wider text-[#8A8A93]">
            <span>VENDOR</span>
            <span>COVERAGE</span>
            <span>EXPIRES</span>
            <span>STATUS</span>
          </div>

          {vendors.length === 0 ? (
            <div className="px-4 py-10 text-center font-sans text-xs text-[#8A8A93]">
              No vendors added yet.
            </div>
          ) : (
            vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 px-4 py-4 border-b border-[#27272A] last:border-b-0 bg-[#131316] hover:bg-[#18181b] items-center"
              >
                <span className="text-sm">{vendor.companyName}</span>
                <span className="text-sm text-[#8A8A93]">{vendor.coverageSummary}</span>
                <span className="font-sans text-xs text-[#8A8A93]">
                  {formatDate(vendor.expirationDate)}
                </span>
                <StatusTag status={vendor.status} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}