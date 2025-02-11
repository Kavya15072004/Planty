export default function handler(req, res) {
  const products = [
    { id: 1, name: 'Aloe Vera', price: 10 },
    { id: 2, name: 'Snake Plant', price: 15 },
    { id: 3, name: 'Money Plant', price: 8 },
  ];
  res.status(200).json(products);
}
