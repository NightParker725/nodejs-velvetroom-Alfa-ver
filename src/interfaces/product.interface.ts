export interface ProductInput {
  sellerEmail: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  condition: 'new' | 'used' | 'fan_made';
}
