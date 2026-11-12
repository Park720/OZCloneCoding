import { Link } from 'react-router';

export default function NotFound() {
  return (
    <main className="page">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>주소를 확인하거나 상품 목록으로 돌아가 주세요.</p>
      <Link className="back-link" to="/">상품 목록으로</Link>
    </main>
  );
}
