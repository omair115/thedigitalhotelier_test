import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../data/redux/actions";
import { getCategoriesById } from "../../data/redux/selectors";
import ItemCard from "../../components/itemsCard/ItemsCard";
import Topbar from "../../components/cart/Cart";

const CategoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const category = useSelector(getCategoriesById);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        if (id) {
          await dispatch(getCategoryById(id) as any);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [dispatch, id]);

  const filteredCategories = category?.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Centered Search Bar */}
      <div className="mb-6 flex justify-center items-center gap-x-4">
        <input
          type="text"
          placeholder="Search For Items..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Topbar />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : category?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((item: any) => (
            <ItemCard key={item.id} category={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
