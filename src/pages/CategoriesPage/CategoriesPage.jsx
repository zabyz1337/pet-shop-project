import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./CategoriesPage.module.css";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className={styles.categoriesPage}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumb}>
            Main page
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Categories</span>
        </div>

        <h1 className={styles.title}>Categories</h1>

        <div className={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={`http://localhost:3333/${category.image}`}
                  alt={category.title}
                  className={styles.image}
                />
              </div>
              <p className={styles.name}>{category.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
