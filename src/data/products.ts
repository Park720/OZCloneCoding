// PPT 9~11쪽: 상품 하나의 타입과 상품 3개의 데이터입니다.
export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    title: '무선 헤드폰',
    price: 59000,
    imageUrl: './public/images/Headphones.jpg',
    inStock: true,
  },
  {
    id: 2,
    title: '기계식 키보드',
    price: 39000,
    imageUrl: './public/images/keyboard.jpg',
    inStock: true,
  },
  {
    id: 3,
    title: '노트북',
    price: 1900000,
    imageUrl: './public/images/laptop.png',
    inStock: false,
  },
];
