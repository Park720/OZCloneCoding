import type { CartItem } from '../types/cart';

type CartPanelProps = {
  items: CartItem[];
  total: number;
};

// PPT 56~58쪽을 하나로 합친 컴포넌트입니다.
export default function CartPanel({ items, total }: CartPanelProps) {
  return (
    <aside id="cart-panel" className="cart-panel" aria-labelledby="cart-heading">
      <h2 id="cart-heading">장바구니</h2>
      {items.length === 0 ? (
        <p className="cart-empty">장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.product.id}>
                <img src={item.product.imageUrl} alt="" />
                <div>
                  <h3>{item.product.title}</h3>
                  <p>수량 {item.quantity}개</p>
                  <strong>
                    {(item.product.price * item.quantity)
                      .toLocaleString('ko-KR')}원
                  </strong>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">
            <span>상품 합계</span>
            <strong>{total.toLocaleString('ko-KR')}원</strong>
          </p>
        </>
      )}
    </aside>
  );
}
