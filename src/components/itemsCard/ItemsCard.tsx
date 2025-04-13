import React, { useEffect, useRef, useState } from "react";

const ItemCard = ({ category }: any) => {
  const [description, setDescription] = useState(category.description);
  const previousDescription = useRef<string | null>(null);

  useEffect(() => {
    if (category.description) {
      setDescription(category.description);
      previousDescription.current = category.description;
    } else if (previousDescription.current) {
      setDescription(previousDescription.current);
    } else {
      setDescription("No description available for this particular category.");
    }
  }, [category]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (existingCart.length > 0) {
      alert(
        "Your cart already contains an item. Please remove it or proceed to checkout before adding a new item."
      );
      return;
    }

    const updatedCart = [...existingCart, category];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Optional: trigger a global update or custom event for badge count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="flex border rounded-2xl shadow-md overflow-hidden max-w-4xl mx-auto">
      {/* Left Side Image */}
      <div className="w-1/3 flex items-center justify-center bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          className="w-full max-h-64 object-contain"
        />
      </div>

      {/* Right Side Content */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">{category.name}</h2>
          <p
            className="text-sm text-gray-700 mt-2 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        </div>
        {/* Price and Add to Cart Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">
            AED {category.price}
          </span>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
