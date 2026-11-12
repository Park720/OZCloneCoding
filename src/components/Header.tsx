import { useState } from 'react';
import { Link } from 'react-router';
import type { CartItem } from '../types/cart';
import CartPanel from './CartPanel';

type HeaderProps = {
  onSearch: (keyword: string) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
};

export default function Header({
  onSearch, cart, cartCount, cartTotal,
}: HeaderProps) {
  // 입력 중인 query와 App에 제출된 searchTerm은 다른 값입니다.
  const [query, setQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" to="/">OZ Shop</Link>
      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch(query.trim());
          setIsCartOpen(false);
        }}
      >
        <input
          type="search"
          aria-label="상품 검색"
          placeholder="상품 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">검색</button>
      </form>
      <div className="cart-area">
        <button
          className="cart-toggle"
          type="button"
          aria-expanded={isCartOpen}
          aria-controls="cart-panel"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
          <span>장바구니</span>
          <span className="cart-badge" aria-live="polite">{cartCount}</span>
        </button>
        {isCartOpen && <CartPanel items={cart} total={cartTotal} />}
      </div>
    </header>
  );
}
