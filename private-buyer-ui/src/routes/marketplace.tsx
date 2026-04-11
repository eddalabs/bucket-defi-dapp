import { createFileRoute } from '@tanstack/react-router';
import { Marketplace } from '@/pages/marketplace';

export const Route = createFileRoute('/marketplace')({
  component: Marketplace,
});
