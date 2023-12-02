import type { Metadata } from 'next';

import './layout.sass';

export const metadata: Metadata = {
  title: { template: '%s | Taiknon', default: 'Taiknon' },
  description: 'A daily planner',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
