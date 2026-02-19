export type Role = 'CLIENT' | 'VENDOR' | 'ADMIN';

export type OfferStatus = 'pending' | 'approved' | 'rejected';

export interface Offer {
  id: string;
  brand: string;
  title: string;
  category: string;
  discountValue: string;
  redemptionLink: string; // URL or discount code
  status: OfferStatus;
  createdAt: string;
  vendorId: string; // Simulate different vendors
  description?: string;
}
