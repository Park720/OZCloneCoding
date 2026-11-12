import { Link, useParams } from 'react-router';
import type { Product } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

type ProductDetailProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export default function ProductDetail({ products, onAddToCart }: ProductDetailProps) {
  const { productId } = useParams();
  // URL 값은 문자열입니다. 이미 받은 목록에서 같은 id의 상품을 찾습니다.
  const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    return (
      <main className="page">
        <h1>상품을 찾을 수 없습니다.</h1>
        <p>상품 주소를 확인하거나 목록에서 다시 선택해 주세요.</p>
        <Link className="back-link" to="/">상품 목록으로</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <Link className="back-link" to="/">상품 목록으로</Link>
      <article className="product-detail">
        <img className="detail-image" src={product.imageUrl} alt={product.title} />
        <div className="detail-content">
          <p className="eyebrow">상품 상세</p>
          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="price">{formatPrice(product.price)}</p>
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
    </main>
  );
}
