// 최종 API 단계에서는 정적 products 배열 없이 타입만 남깁니다.
export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  description: string;
};
