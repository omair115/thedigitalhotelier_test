import "./App.css";
import AppMainLayout from "./components/layouts/AppLayout";
import CategoriesPage from "./pages/categories/CategoriesPage";
import { Route, Routes } from "react-router-dom";
import CategoryDetailPage from "./pages/categoryDetails/CategoryDetails";

function App() {
  return (
    <AppMainLayout>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:id" element={<CategoryDetailPage />} />
      </Routes>
    </AppMainLayout>
  );
}

export default App;
