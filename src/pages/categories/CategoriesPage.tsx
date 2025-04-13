import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../data/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesSelector } from "../../data/redux/selectors";
import CategoryCard from "../../components/cards/CategoryCard";

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesSelector);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        await dispatch(getAllCategories() as any);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const filteredCategories = categories.filter((category: any) =>
    category.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 mx-auto max-w-7xl"> {/* Added max-width container */}
      {/* Centered Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search For Categories..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // Grid with tighter spacing
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0"> {/* Adjusted columns and gap */}
          {filteredCategories.map((category: any) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;