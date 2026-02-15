type Tenant = {
  id: number;
  date: string;
  description: string;
  unit: string;
  dueDate: string;
  status: 'Active' | 'Pending';
};

type TenantRowProps = {
  tenant: Tenant;
  isLast?: boolean;
};

const TenantRow = ({ tenant, isLast = false }: TenantRowProps) => {
  return (
    <tr className={isLast ? '' : 'border-b border-slate-100'}>
      <td className="px-3 py-3 text-base">{tenant.date}</td>
      <td className="px-3 py-3 text-base">{tenant.description}</td>
      <td className="px-3 py-3 text-base">{tenant.unit}</td>
      <td className="px-3 py-3 text-base">{tenant.dueDate}</td>
      <td className="px-3 py-3">
        <span
          className={`rounded-lg px-2 py-1 text-sm ${tenant.status === 'Active' ? 'bg-[#2F80ED] text-white' : 'bg-slate-100 text-gray-600'}`}
        >
          {tenant.status}
        </span>
      </td>
    </tr>
  );
};

export default TenantRow;
