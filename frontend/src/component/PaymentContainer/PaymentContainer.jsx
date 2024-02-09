import { useState } from "react";
import MainContainer from "../../utils/MainContainer/MainContainer";
import Checkout from "../Checkout/Checkout";
import PaymentMethods from "../PaymentMethod/PaymentMethods";

const data = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    name: "Sample Product 1",
    description: "This is a sample product description 1.",
    price: 50,
    quantity: 1,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    name: "Sample Product 2",
    description: "This is a sample product description 2.",
    price: 60,
    quantity: 1,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    name: "Sample Product 3",
    description: "This is a sample product description 3.",
    price: 70,
    quantity: 1,
  },
];

const PaymentContainer = () => {
  const [products, setProducts] = useState(data);

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const totalPrice = products
    .reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="flex h-screen items-start gap-4">
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <Checkout
            key={product.id}
            product={product}
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <p className=" text-end text-lg font-semibold">
            Total Price: ${totalPrice}
          </p>{" "}
        </div>
      </div>
      <PaymentMethods totalPrice={totalPrice} />
    </div>
  );
};

export default PaymentContainer;
