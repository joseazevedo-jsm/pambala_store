export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  category: string;
  condition: "New" | "Used";
  shippingOptions: string[];
  paymentOptions: string[];
  sellerInfo: {
    id: string;
    name: string;
    rating: number;
  };
}
