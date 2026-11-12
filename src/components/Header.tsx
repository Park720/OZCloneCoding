import { useState } from 'react';
import type { CartItem } from '../types/cart';
import CartPanel from './CartPanel';

type HeaderProps = {
  onSearch: (keyword: string) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
};

export default function Header({
  onSearch,
  cart,
  cartCount,
  cartTotal,
}: HeaderProps) {
  // query는 입력 중인 값, App의 searchTerm은 제출한 값입니다.
  const [query, setQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="site-header">
      <span className="brand">OZ Shop</span>
      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch(query.trim());
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

      {/*  카트 버튼은 검색 form 바깥에 둡니다. */}
      <div className="cart-area">
        <button
          type="button"
          className="cart-toggle"
          aria-expanded={isCartOpen}
          aria-controls="cart-panel"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
          장바구니
          <span className="cart-badge" aria-live="polite">{cartCount}</span>
        </button>
        {isCartOpen && <CartPanel items={cart} total={cartTotal} />}
      </div>
    </header>
  );
}
