'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Offer, OfferStatus, Role } from '../lib/types';

interface DiscountContextType {
  role: Role;
  setRole: (role: Role) => void;
  offers: Offer[];
  addOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'status'>) => void;
  updateOfferStatus: (id: string, status: OfferStatus) => void;
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

const INITIAL_OFFERS: Offer[] = [
  {
    id: '1',
    brand: 'Nike',
    title: '20% Off Footwear',
    category: 'Retail',
    discountValue: 'NIKE20',
    redemptionLink: 'https://nike.com',
    status: 'approved',
    createdAt: new Date().toISOString(),
    vendorId: 'v1',
    description: 'Get 20% off all running shoes.',
  },
  {
    id: '2',
    brand: 'Starbucks',
    title: 'Free Coffee with Pastry',
    category: 'F&B',
    discountValue: 'FREECOFFEE',
    redemptionLink: 'In-store',
    status: 'approved',
    createdAt: new Date().toISOString(),
    vendorId: 'v2',
    description: 'Buy any pastry and get a free tall coffee.',
  },
  {
    id: '3',
    brand: 'Spotify',
    title: '3 Months Premium Trial',
    category: 'Services',
    discountValue: '3MONTHFREE',
    redemptionLink: 'https://spotify.com/redeem',
    status: 'approved',
    createdAt: new Date().toISOString(),
    vendorId: 'v3',
    description: 'New users only.',
  },
  {
    id: '4',
    brand: 'Adidas',
    title: '15% Off Sitewide',
    category: 'Retail',
    discountValue: 'ADIDAS15',
    redemptionLink: 'https://adidas.com',
    status: 'pending',
    createdAt: new Date().toISOString(),
    vendorId: 'v1',
    description: 'Valid for online purchases.',
  },
];

export function DiscountProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('CLIENT');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedOffers = localStorage.getItem('offers');
    if (savedOffers) {
      setOffers(JSON.parse(savedOffers));
    } else {
      setOffers(INITIAL_OFFERS);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('offers', JSON.stringify(offers));
    }
  }, [offers, isInitialized]);

  const addOffer = (newOffer: Omit<Offer, 'id' | 'createdAt' | 'status'>) => {
    const offer: Offer = {
      ...newOffer,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending', // Default to pending
    };
    setOffers((prev) => [offer, ...prev]);
  };

  const updateOfferStatus = (id: string, status: OfferStatus) => {
    setOffers((prev) =>
      prev.map((offer) => (offer.id === id ? { ...offer, status } : offer))
    );
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <DiscountContext.Provider
      value={{ role, setRole, offers, addOffer, updateOfferStatus }}
    >
      {children}
    </DiscountContext.Provider>
  );
}

export function useDiscount() {
  const context = useContext(DiscountContext);
  if (context === undefined) {
    throw new Error('useDiscount must be used within a DiscountProvider');
  }
  return context;
}
