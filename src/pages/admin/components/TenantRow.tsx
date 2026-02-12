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
      <td className="px-3 py-2">{tenant.date}</td>
      <td className="px-3 py-2">{tenant.description}</td>
      <td className="px-3 py-2">{tenant.unit}</td>
      <td className="px-3 py-2">{tenant.dueDate}</td>
      <td className="px-3 py-2">
        {tenant.status === 'Active' ? (
          <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">Active</span>
        ) : (
          <span className="text-slate-700">Pending</span>
        )}
      </td>
    </tr>
  );
};

export default TenantRow;
