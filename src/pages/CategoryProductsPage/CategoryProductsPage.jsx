import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./CategoryProductsPage.module.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductCard from "../../components/ProductCard/ProductCard";

function CategoryProductsPage() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${id}`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  if (!categoryData) {
    return (
      <section className={styles.page}>
        <div className="container">
          <p className={styles.loading}>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Main page", path: "/" },
            { label: "Categories", path: "/categories" },
            { label: categoryData?.category?.title || "Category" },
          ]}
        />

        <h1 className={styles.title}>{categoryData.category.title}</h1>

        <div className={styles.grid}>
          {categoryData.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryProductsPage;
