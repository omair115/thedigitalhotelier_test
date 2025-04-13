import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }: any) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg bg-cover bg-center cursor-pointer hover:shadow-xl transition-shadow duration-300" // Increased height
      style={{ backgroundImage: `url(${category.image})` }}
    >
      {category.opens_at && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Opens at: {category.opens_at}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white font-bold text-lg px-4 py-3">
        {category.display_name}
      </div>
    </div>
  );
};

export default CategoryCard;