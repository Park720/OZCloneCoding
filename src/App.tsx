import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { products } from './data/products';
import type { Product } from './data/products';
import type { CartItem } from './types/cart';

export default function App() {
  // PPT 26쪽: 제출한 검색어를 기억합니다.
  const [searchTerm, setSearchTerm] = useState('');
  // PPT 43쪽: 카드와 Header가 함께 사용하는 장바구니입니다.
  const [cart, setCart] = useState<CartItem[]>([]);

  const visibleProducts = products.filter((product) =>
    product.title.includes(searchTerm)
  );

  // PPT 46쪽: 같은 상품이면 수량만 늘리고, 처음이면 새 항목을 만듭니다.
  function handleAddToCart(product: Product) {
    if (!product.inStock) return;

    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }

  // PPT 51쪽: cart에서 계산할 수 있으므로 별도 state로 만들지 않습니다.
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Header
        onSearch={setSearchTerm}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
      />
      <main className="page">
        <h1>오늘의 추천 상품</h1>
        {visibleProducts.length === 0 ? (
          <p className="empty-message">검색 결과가 없습니다.</p>
        ) : (
          <section className="product-grid" aria-label="상품 목록">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}
