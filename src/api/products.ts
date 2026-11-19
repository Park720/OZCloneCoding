import type { Product } from '../data/products';
import { supabase } from '../lib/supabase';

// Supabase의 products 테이블에서 상품을 가져옵니다.
// App.tsx는 그대로 두고, 이 함수 안쪽만 DummyJSON에서 Supabase로 바꿨습니다.
export async function fetchProducts(signal: AbortSignal): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    // DB 열 이름(image_url, in_stock)을 Product 필드 이름(imageUrl, inStock)으로 바꿔 받습니다.
    .select('id, title, price, imageUrl:image_url, inStock:in_stock, description')
    .order('id')
    // App이 요청을 취소하면(AbortController) 이 요청도 함께 취소됩니다.
    .abortSignal(signal);

  // 허용(grant)이 없거나 테이블 이름이 틀리면 error가 옵니다.
  // 정책(RLS)이 없으면 error 없이 빈 배열이 옵니다.
  if (error) {
    throw new Error(`상품 요청에 실패했습니다. ${error.message}`);
  }

  return data;
}