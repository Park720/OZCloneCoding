import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import type { Product } from './data/products';
import type { CartItem } from './types/cart';
import { fetchProducts } from './api/products';
import './App.css';

export default function App() {
  // 목록과 상세 화면이 함께 쓰는 값은 App에 둡니다.
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const navigate = useNavigate();

  // 처음 화면에 연결될 때와 retryKey가 바뀔 때 상품을 요청합니다.
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(controller.signal);
        // 이전 요청이 취소됐다면 그 응답으로 현재 화면을 덮어쓰지 않습니다.
        if (!controller.signal.aborted) setProducts(data);
      } catch {
        if (!controller.signal.aborted) {
          setError('상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadProducts();
    // 재실행 전 또는 App이 제거될 때 이전 요청을 정리합니다.
    return () => controller.abort();
  }, [retryKey]);

  function handleAddToCart(product: Product) {
    if (!product.inStock) return;

    // 이전 배열을 직접 수정하지 않고 새 배열/객체를 반환합니다.
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }

  // 이미 가진 cart로 계산할 수 있으므로 별도의 state나 Effect가 필요 없다.
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  function handleSearch(keyword: string) {
    setSearchTerm(keyword);
    // 상세 화면에서 검색해도 목록으로 이동해 결과를 보여 줍니다.
    navigate('/');
  }

  return (
    <>
      <Header
        onSearch={handleSearch}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
      />
      {isLoading ? (
        <main className="page">
          <div className="request-state" role="status">
            <span className="loading-dot" aria-hidden="true" />
            <h1>상품을 불러오는 중입니다.</h1>
            <p>잠시만 기다려 주세요.</p>
          </div>
        </main>
      ) : error ? (
        <main className="page">
          <div className="request-state" role="alert">
            <h1>상품을 불러오지 못했습니다.</h1>
            <p>{error}</p>
            <button
              className="retry-button"
              type="button"
              onClick={() => setRetryKey((prev) => prev + 1)}
            >다시 시도</button>
          </div>
        </main>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                products={products}
                searchTerm={searchTerm}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProductDetail products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
