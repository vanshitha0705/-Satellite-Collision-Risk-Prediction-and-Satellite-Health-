import RiskBadge from './RiskBadge.jsx';

export default function DataTable({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1E293B]">
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 text-left text-xs font-medium text-[#94A3B8] uppercase tracking-wider">
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-[#0B1220]/50 transition-colors">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3 text-[#F8FAFC] whitespace-nowrap">
                  {col.accessor === 'risk_level' || col.accessor === 'risk' ? (
                    <RiskBadge level={row[col.accessor]} />
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
