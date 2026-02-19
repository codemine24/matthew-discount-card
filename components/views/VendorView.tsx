'use client';

import { useDiscount } from '@/context/DiscountContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Offer } from '@/lib/types';
import { Plus, Check, Clock, XCircle } from 'lucide-react';

const VENDOR_ID = 'v1'; // Simulated current vendor

export const VendorView = () => {
  const { offers, addOffer } = useDiscount();
  const myOffers = offers.filter((o) => o.vendorId === VENDOR_ID);

  const stats = {
    approved: myOffers.filter((o) => o.status === 'approved').length,
    pending: myOffers.filter((o) => o.status === 'pending').length,
    rejected: myOffers.filter((o) => o.status === 'rejected').length,
  };

  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    category: '',
    discountValue: '',
    redemptionLink: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOffer({
      ...formData,
      vendorId: VENDOR_ID,
    });
    setFormData({
      title: '',
      brand: '',
      category: '',
      discountValue: '',
      redemptionLink: '',
      description: '',
    });
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Manage your discount offers and track approvals.</p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4 flex flex-col items-center justify-center min-w-[100px] border-l-4 border-l-green-500">
            <span className="text-2xl font-bold text-green-600">{stats.approved}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Live</span>
          </Card>
          <Card className="p-4 flex flex-col items-center justify-center min-w-[100px] border-l-4 border-l-yellow-500">
            <span className="text-2xl font-bold text-yellow-600">{stats.pending}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Pending</span>
          </Card>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Submission Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Submit New Offer</CardTitle>
            <CardDescription>Fill out the details for your new discount.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Name</label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g. Acme Corp"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Offer Title</label>
                <input
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g. 50% Off Everything"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <input
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Retail"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Value/Code</label>
                  <input
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="SAVE50"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Redemption Link</label>
                <input
                  type="url"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="https://example.com"
                  value={formData.redemptionLink}
                  onChange={(e) => setFormData({ ...formData, redemptionLink: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Submit Offer
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Your Submissions</h2>
          {myOffers.length === 0 ? (
            <div className="text-center py-12 border rounded-lg border-dashed text-muted-foreground">
              No offers submitted yet.
            </div>
          ) : (
            myOffers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                layout
              >
                <Card className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{offer.title}</h3>
                      <Badge variant="outline" className="text-xs">{offer.brand}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{offer.category} • {offer.discountValue}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {offer.status === 'approved' && <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100 flex gap-1"><Check className="h-3 w-3" /> Approved</Badge>}
                    {offer.status === 'pending' && <Badge variant="warning" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex gap-1"><Clock className="h-3 w-3" /> Pending</Badge>}
                    {offer.status === 'rejected' && <Badge variant="destructive" className="flex gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>}
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
