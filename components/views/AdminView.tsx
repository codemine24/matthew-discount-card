'use client';

import { useDiscount } from '@/context/DiscountContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';
import { Check, X, Shield, Filter } from 'lucide-react';
import { useState } from 'react';

export const AdminView = () => {
  const { offers, updateOfferStatus } = useDiscount();
  const [filter, setFilter] = useState<'all' | 'pending'>('all');

  const sortedOffers = [...offers].sort((a, b) => {
    // Pending first
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    // Then by date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).filter(o => filter === 'all' || o.status === filter);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" /> Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Review and manage vendor submissions.</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'all' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All Offers
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === 'pending' ? 'bg-background shadow text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Start Review ({offers.filter(o => o.status === 'pending').length})
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedOffers.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
            <h3 className="text-lg font-medium text-muted-foreground">No offers found.</h3>
          </div>
        ) : (
          sortedOffers.map((offer) => (
            <motion.div
              key={offer.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="flex flex-col sm:flex-row items-center justify-between p-6 gap-6 hover:shadow-md transition-shadow">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded uppercase">{offer.vendorId}</span>
                    <span>•</span>
                    <span>{new Date(offer.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{offer.brand}</h3>
                    {offer.status === 'approved' && <Badge variant="success" className="bg-green-100 text-green-800">Live</Badge>}
                    {offer.status === 'pending' && <Badge variant="warning" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>}
                    {offer.status === 'rejected' && <Badge variant="destructive">Rejected</Badge>}
                  </div>
                  <p className="font-medium">{offer.title}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                    <span className="bg-secondary/50 px-2 py-1 rounded">Code: <span className="font-mono text-foreground font-semibold">{offer.discountValue}</span></span>
                    <span className="bg-secondary/50 px-2 py-1 rounded">Category: <span className="text-foreground">{offer.category}</span></span>
                  </div>
                  <a href={offer.redemptionLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline inline-block mt-2">
                    {offer.redemptionLink}
                  </a>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  {offer.status === 'pending' ? (
                    <>
                      <Button
                        onClick={() => updateOfferStatus(offer.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial"
                      >
                        <Check className="mr-2 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateOfferStatus(offer.id, 'rejected')}
                        className="flex-1 sm:flex-initial"
                      >
                        <X className="mr-2 h-4 w-4" /> Reject
                      </Button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateOfferStatus(offer.id, 'pending')}
                      >
                        Re-evaluate
                      </Button>
                      {offer.status === 'approved' && (
                        <Button variant="destructive" size="sm" onClick={() => updateOfferStatus(offer.id, 'rejected')}>Revoke</Button>
                      )}
                      {offer.status === 'rejected' && (
                        <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={() => updateOfferStatus(offer.id, 'approved')}>Approve</Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
