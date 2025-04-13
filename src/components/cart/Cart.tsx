import React, { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";

interface CartItem {
  id: number;
  image: string;
  price: number;
  name: string;
  description: string;
  quantity: number;
  selectedOptions?: {
    name: string;
    price: number;
    type: string; // 'side', 'sauce', 'glass', 'preference'
  }[];
  selectedSide?: string;
  selectedSauce?: string;
  selectedPreference?: string;
  extrasWithOptions?: any[];
}

// Move options outside the component to access in any function
const sideOptions = [
  { name: "Truffle and parmesan fries", price: 30 },
  { name: "French fries", price: 30 },
  { name: "Garden salad", price: 30 },
  { name: "Grilled vegetables", price: 30 },
  { name: "Steamed broccoli", price: 30 },
  { name: "Mashed potato", price: 30 },
  { name: "Basmati rice", price: 30 },
];

const sauceOptions = [
  { name: "Wild mushroom", price: 15 },
  { name: "BBQ sauce", price: 15 },
  { name: "Lemon butter", price: 15 },
  { name: "Veal jus", price: 15 },
  { name: "Peppercorn", price: 15 },
];

const glassOptions = [
  { name: "Anakena merlot", price: 55 },
  { name: "Anakena sauvignon blanc", price: 55 },
];

const cookingPreferences = [
  "Rare",
  "Extra rare",
  "Medium-rare",
  "Medium-well",
  "Medium",
  "Medium rare",
  "Medium well",
  "Well done",
];

const Topbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartData(cart);
    setCartCount(cart.length);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartData];
    updatedCart[index].quantity = newQuantity;
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (index: number) => {
    const updatedCart = [...cartData];
    updatedCart.splice(index, 1);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const toggleOption = (
    itemIndex: number,
    option: { name: string; price: number; type: string }
  ) => {
    const updatedCart = [...cartData];
    const item = updatedCart[itemIndex];
    if (!item.selectedOptions) item.selectedOptions = [];

    const optionIndex = item.selectedOptions.findIndex(
      (opt) => opt.name === option.name && opt.type === option.type
    );

    if (optionIndex === -1) {
      item.selectedOptions.push(option);
    } else {
      item.selectedOptions.splice(optionIndex, 1);
    }

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const selectRadioOption = (
    itemIndex: number,
    value: string,
    type: "side" | "sauce" | "preference"
  ) => {
    const updatedCart = [...cartData];
    const item = updatedCart[itemIndex];

    if (type === "side") item.selectedSide = value;
    else if (type === "sauce") item.selectedSauce = value;
    else if (type === "preference") item.selectedPreference = value;

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateItemTotal = (item: CartItem) => {
    let total = item.price * (item.quantity || 1);

    // Add radio prices
    const selectedSide = sideOptions.find(
      (side) => side.name === item.selectedSide
    );
    if (selectedSide) total += selectedSide.price;

    const selectedSauce = sauceOptions.find(
      (sauce) => sauce.name === item.selectedSauce
    );
    if (selectedSauce) total += selectedSauce.price;

    // Add checkbox prices
    if (item.selectedOptions) {
      total += item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    }

    return total;
  };

  const calculateTotal = () => {
    return cartData.reduce((total, item) => {
      return total + calculateItemTotal(item);
    }, 0);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  return (
    <>
      <div className="flex justify-end items-center p-4 shadow-md-none">
        <div className="relative">
          <button onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg w-full max-w-4xl mx-4"
            style={{ width: "75%" }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {cartData.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                cartData.map((item, index) => (
                  <div key={index} className="p-4 border-b">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-full md:w-3/4 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-blue-600 font-bold">
                            AED {item.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(index, (item.quantity || 1) - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span>{item.quantity || 1}</span>
                            <button
                              onClick={() =>
                                updateQuantity(index, (item.quantity || 1) + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Add Side */}
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium flex items-center gap-1">
                            Add Sides
                          </h4>
                        </div>
                        {sideOptions.map((side) => (
                          <label
                            key={side.name}
                            className="flex items-center mb-1 mt-1 "
                          >
                            <input
                              type="checkbox"
                              checked={
                                item.selectedOptions?.some(
                                  (opt) =>
                                    opt.name === side.name &&
                                    opt.type === "side"
                                ) || false
                              }
                              onChange={() =>
                                toggleOption(index, { ...side, type: "side" })
                              }
                              className="mr-2"
                            />
                            {side.name} + AED {side.price}
                          </label>
                        ))}

                        {/* Add Sauce */}
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium flex items-center gap-1">
                            Add Sauce
                          </h4>
                        </div>
                        <div className="grid gap-2 mt-4 mb-4">
                          {sauceOptions.map((sauce) => (
                            <label
                              key={sauce.name}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  item.selectedOptions?.some(
                                    (opt) =>
                                      opt.name === sauce.name &&
                                      opt.type === "sauce"
                                  ) || false
                                }
                                onChange={() =>
                                  toggleOption(index, {
                                    ...sauce,
                                    type: "sauce",
                                  })
                                }
                                className="mr-2"
                              />
                              {sauce.name} + AED {sauce.price}
                            </label>
                          ))}
                        </div>

                        {/* Add a Glass */}
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium flex items-center gap-1">
                            Add Glass
                          </h4>
                        </div>
                        <div className="grid gap-2 mt-4 mb-4">
                          {glassOptions.map((glass) => (
                            <label
                              key={glass.name}
                              className="flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  item.selectedOptions?.some(
                                    (opt) =>
                                      opt.name === glass.name &&
                                      opt.type === "glass"
                                  ) || false
                                }
                                onChange={() =>
                                  toggleOption(index, {
                                    ...glass,
                                    type: "glass",
                                  })
                                }
                                className="mr-2"
                              />
                              {glass.name} + AED {glass.price}
                            </label>
                          ))}
                        </div>

                        {/* Choice of Side */}

                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium flex items-center gap-1">
                            Choice of Side{" "}
                            <span className="text-red-500 text-sm font-normal ml-auto font-mediu">
                              (Required)
                            </span>
                          </h4>
                        </div>
                        <div className="grid gap-2 mb-4 mt-4">
                          {sideOptions.map((side) => (
                            <label
                              key={side.name}
                              className="flex items-center"
                            >
                              <input
                                type="radio"
                                name={`side-${index}`}
                                checked={item.selectedSide === side.name}
                                onChange={() =>
                                  selectRadioOption(index, side.name, "side")
                                }
                                className="mr-2"
                              />
                              {side.name} + AED {side.price}
                            </label>
                          ))}
                        </div>

                        {/* Choice of Sauce */}
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium flex items-center gap-1">
                            Choice of Sauce{" "}
                            <span className="text-red-500 text-sm font-normal ml-auto font-mediu">
                              (Required)
                            </span>
                          </h4>
                        </div>
                        <div className="grid gap-2 mb-4 mt-4">
                          {sauceOptions.map((sauce) => (
                            <label
                              key={sauce.name}
                              className="flex items-center"
                            >
                              <input
                                type="radio"
                                name={`sauce-${index}`}
                                checked={item.selectedSauce === sauce.name}
                                onChange={() =>
                                  selectRadioOption(index, sauce.name, "sauce")
                                }
                                className="mr-2"
                              />
                              {sauce.name} + AED {sauce.price}
                            </label>
                          ))}
                        </div>

                        {/* Cooking Preference */}
                        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium flex items-center gap-1">
                            Cooking Preference{" "}
                            <span className="text-red-500 text-sm font-normal ml-auto font-mediu">
                              (Required)
                            </span>
                          </h4>
                        </div>
                        <div className="grid gap-2 mb-4 mt-4">
                          {cookingPreferences.map((pref) => (
                            <label key={pref} className="flex items-center">
                              <input
                                type="radio"
                                name={`pref-${index}`}
                                checked={item.selectedPreference === pref}
                                onChange={() =>
                                  selectRadioOption(index, pref, "preference")
                                }
                                className="mr-2"
                              />
                              {pref}
                            </label>
                          ))}
                        </div>

                        {/* Item Total */}
                        <div className="mt-4 flex justify-between items-center border-t pt-2">
                          <span className="font-medium">Item Total:</span>
                          <span className="text-blue-600 font-bold">
                            AED {calculateItemTotal(item)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartData.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total:</span>
                  <span className="text-blue-600 font-bold text-lg">
                    AED {calculateTotal()}
                  </span>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Proceed to Checkout (AED {calculateTotal()})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
