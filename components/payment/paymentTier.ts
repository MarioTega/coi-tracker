import {PaymentGridProps} from '@/components/payment/PaymentGrid'
export const paymentTiers: PaymentGridProps[] = [
    {
        tier: 'free',
        description: "Perfect for getting started",
        price: "$0/month",
      
    },
    {
        tier: 'pro',
        description: "Great for growing businesses",
        price: "$19/month",
       
    },
    {
        tier: 'enterprise',
        description: "For large organizations",
        price: "$49/month"
    }
]