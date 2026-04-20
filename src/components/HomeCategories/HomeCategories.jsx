import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./HomeCategories.module.css";

function HomeCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories/all");
        setCategories(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className={styles.categories}>
      <div className="container">
        <div className={styles.top}>
          <h2 className={styles.title}>Categories</h2>
          <Link to="/categories" className={styles.link}>
            All categories
          </Link>
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={`http://localhost:3333${category.image}`}
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

export default HomeCategories;
