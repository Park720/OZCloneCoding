import type { Product } from '../data/products';

// 상품 정보와 담은 수량을 묶습니다.
export type CartItem = {
  product: Product;
  quantity: number;
};
