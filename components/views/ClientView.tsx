'use client';

import { useDiscount } from '@/context/DiscountContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Offer } from '@/lib/types';
import { Search, Tag, ExternalLink } from 'lucide-react';

export const ClientView = () => {
  const { offers } = useDiscount();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const approvedOffers = offers.filter(
    (o) => o.status === 'approved' && (
      o.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-6 py-16 sm:px-12 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Exclusive Savings with Your Discount Card
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl opacity-90">
            Unlock premium deals from top brands. Curated just for you.
          </p>
        </motion.div>
      </section>

      {/* Search & Filter */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search brands or offers..."
            className="flex h-10 w-full rounded-full border border-input bg-background px-3 pl-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {approvedOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">{offer.category}</Badge>
                  <span className="text-xs text-muted-foreground">Verified</span>
                </div>
                <CardTitle className="text-xl">{offer.brand}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground/80 mt-1">
                  {offer.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {offer.description || 'Limited time offer. Terms and conditions apply.'}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setSelectedOffer(offer)}>
                  <Tag className="mr-2 h-4 w-4" />
                  Claim Discount
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {approvedOffers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No offers found searching for "{searchTerm}".
        </div>
      )}

      {/* Reveal Modal */}
      <Modal
        isOpen={!!selectedOffer}
        onClose={() => setSelectedOffer(null)}
        title={`Claim ${selectedOffer?.brand} Offer`}
      >
        <div className="space-y-6 text-center">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Your Discount Code</p>
            <div className="text-3xl font-mono font-bold tracking-widest text-primary selection:bg-primary/20">
              {selectedOffer?.discountValue}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Copy the code above and use it at checkout.
          </p>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                window.open(selectedOffer?.redemptionLink, '_blank');
              }}
            >
              Redeem on {selectedOffer?.brand} <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setSelectedOffer(null)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
