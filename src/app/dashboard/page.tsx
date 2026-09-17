import type { Metadata } from 'next';
import Dashboard from '@/components/dashboard/Dashboard';

export const metadata: Metadata = {
  title: 'Atlas Dashboard — live multi-agent debate & paper book',
  description:
    'Watch the Bull, Bear, Risk Manager and Trader agents debate live market data and execute paper trades.',
};

export default function DashboardPage() {
  return <Dashboard />;
}
