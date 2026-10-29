import './App.css';
import ProductCard from './components/ProductCard';
import Header from './components/Headers';

export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <h1>오늘의 추천 상품</h1>
        <section className="product-grid">
          <ProductCard />
          <ProductCard />
        </section>
      </main>
    </>
  );
}