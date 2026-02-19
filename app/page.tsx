'use client';

import { useDiscount } from '@/context/DiscountContext';
import { ClientView } from '@/components/views/ClientView';
import { VendorView } from '@/components/views/VendorView';
import { AdminView } from '@/components/views/AdminView';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { role } = useDiscount();

  return (
    <>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <span className="text-xl font-bold tracking-tight">PerksPlatform</span>
          </div>

          <div className="text-sm text-muted-foreground hidden sm:block">
            Currently viewing as: <span className="font-semibold text-foreground">{role}</span>
          </div>
        </header>

        <RoleSwitcher />

        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {role === 'CLIENT' && <ClientView />}
            {role === 'VENDOR' && <VendorView />}
            {role === 'ADMIN' && <AdminView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
