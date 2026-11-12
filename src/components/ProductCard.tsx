import { Link } from 'react-router';
import type { Product } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-link" to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.title} />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="price">{formatPrice(product.price)}</p>
          <span className="detail-hint">상세 정보 보기</span>
        </div>
      </Link>
      <div className="product-actions">
        <p className={product.inStock ? 'stock available' : 'stock sold-out'}>
          {product.inStock ? '구매 가능' : '품절'}
        </p>
        <button
          className="add-button"
          type="button"
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
        >
          {product.inStock ? '장바구니 담기' : '품절'}
        </button>
      </div>
    </article>
  );
}
