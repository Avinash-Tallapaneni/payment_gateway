import React from "react";

const Checkout = ({ product, onQuantityChange }) => {
  const handleIncrement = () => {
    onQuantityChange(product.id, product.quantity + 1);
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onQuantityChange(product.id, newQuantity);
    }
  };

  return (
    <div className="flex mt-4 items-center justify-between gap-4 bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500 whitespace-nowrap">
            {product.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
        >
          -
        </button>
        <input
          type="number"
          className="w-16 px-3 py-1 text-center border border-gray-300 rounded"
          value={product.quantity}
          onChange={handleQuantityChange}
        />
        <button
          onClick={handleIncrement}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r"
        >
          +
        </button>
      </div>
      <div>
        <p className="text-lg font-semibold">
          ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Checkout;
