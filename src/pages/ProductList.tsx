import ProductCard from '../components/ProductCard';
import type { Product } from '../data/products';

type ProductListProps = {
  products: Product[];
  searchTerm: string;
  onAddToCart: (product: Product) => void;
};

export default function ProductList({
  products, searchTerm, onAddToCart,
}: ProductListProps) {
  // 제출된 검색어로 현재 받은 상품 목록만 검색합니다.
  // includes는 대소문자를 구분합니다. 빈 문자열이면 모든 상품이 남습니다.
  const visibleProducts = products.filter((product) =>
    product.title.includes(searchTerm),
  );

  return (
    <main className="page">
      <p className="eyebrow">OZ SHOP</p>
      <h1>오늘의 추천 상품</h1>
      <p className="catalog-note">스마트폰 컬렉션 · 가격은 USD 기준입니다.</p>
      <p className="result-count" aria-live="polite">
        {searchTerm ? `“${searchTerm}” 검색 결과` : '전체 상품'}
        {' · '}{visibleProducts.length}개
      </p>
      {visibleProducts.length === 0 ? (
        <p className="empty-message">검색 결과가 없습니다.</p>
      ) : (
        <section className="product-grid" aria-label="상품 목록">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </section>
      )}
    </main>
  );
}
