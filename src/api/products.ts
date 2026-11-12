import type { Product } from '../data/products';

// 다음 백엔드 수업에서는 이 주소와 아래 응답 변환 부분을 연결합니다.
export const PRODUCTS_URL =
  'https://dummyjson.com/products/category/smartphones?limit=6';

// 서버가 보내는 모양입니다. 우리 Product와 필드 이름이 다릅니다.
// TypeScript 타입 선언 자체가 실제 JSON을 검사해 주지는 않습니다.
type ApiProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  stock: number;
};

type ProductsResponse = {
  products: ApiProduct[];
};

export async function fetchProducts(signal: AbortSignal): Promise<Product[]> {
  // 메서드를 따로 지정하지 않은 fetch의 기본 요청은 GET입니다.
  const response = await fetch(PRODUCTS_URL, { signal });

  // 404나 500 응답도 fetch는 응답으로 반환하므로 직접 확인합니다.
  if (!response.ok) {
    throw new Error(`상품 요청에 실패했습니다. HTTP ${response.status}`);
  }

  const data: ProductsResponse = await response.json();

  // API의 필드를 기존 카드·상세가 사용하는 Product 모양으로 바꿉니다.
  return data.products.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    imageUrl: item.thumbnail,
    description: item.description,
    inStock: item.stock > 0,
  }));
}
