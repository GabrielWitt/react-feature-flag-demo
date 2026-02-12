export type Tenant = {
  id: number;
  name: string;
  apartment: string;
  status: 'Active' | 'Inactive';
  lastPaymentDate: string;
  paymentRecorded: string;
};

export const TENANTS: Tenant[] = [
  { id: 1, name: 'Jane Doe', apartment: 'B402', status: 'Active', lastPaymentDate: 'Oct 15, 2025', paymentRecorded: 'Oct 15, 2025' },
  { id: 2, name: 'John Smith', apartment: 'A401', status: 'Active', lastPaymentDate: 'Oct 07, 2025', paymentRecorded: 'Sep 30, 2025' },
  { id: 8, name: 'John Smith', apartment: 'A401', status: 'Active', lastPaymentDate: 'Sep 30, 2025', paymentRecorded: 'Aug 01, 2025' },
  { id: 9, name: 'Emily White', apartment: 'C305', status: 'Inactive', lastPaymentDate: 'Aug 01, 2025', paymentRecorded: 'Aug 01, 2025' },
];
