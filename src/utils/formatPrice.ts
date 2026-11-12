// 수업의 API 단계는 USD로 표시합니다. 환율을 변환하는 함수는 아닙니다.
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
