'use client';

import { useDiscount } from '@/context/DiscountContext';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';
import { Role } from '@/lib/types';

export const RoleSwitcher = () => {
  const { role, setRole } = useDiscount();

  const roles: Role[] = ['CLIENT', 'VENDOR', 'ADMIN'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border bg-background/80 p-2 shadow-lg backdrop-blur"
    >
      <span className="ml-2 text-xs font-medium text-muted-foreground mr-1">View as:</span>
      {roles.map((r) => (
        <Button
          key={r}
          variant={role === r ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setRole(r)}
          className="rounded-full text-xs font-semibold transition-all"
        >
          {r}
        </Button>
      ))}
    </motion.div>
  );
};
