import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "./CategoryProductsPage.module.css";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductCard from "../../components/ProductCard/ProductCard";

function CategoryProductsPage() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [sortType, setSortType] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${id}`);
        setCategoryData(response.data);
      } catch {}
    };

    fetchCategoryProducts();
  }, [id]);

  const filteredProducts = useMemo(() => {
    if (!categoryData) return [];

    let result = [...categoryData.data];

    result = result.filter((product) => {
      const actualPrice =
        product.discont_price !== null && product.discont_price !== undefined
          ? product.discont_price
          : product.price;

      const matchesMin = minPrice === "" || actualPrice >= Number(minPrice);
      const matchesMax = maxPrice === "" || actualPrice <= Number(maxPrice);

      return matchesMin && matchesMax;
    });

    if (sortType === "price-low-high") {
      result.sort((a, b) => {
        const aPrice =
          a.discont_price !== null && a.discont_price !== undefined
            ? a.discont_price
            : a.price;
        const bPrice =
          b.discont_price !== null && b.discont_price !== undefined
            ? b.discont_price
            : b.price;

        return aPrice - bPrice;
      });
    }

    if (sortType === "price-high-low") {
      result.sort((a, b) => {
        const aPrice =
          a.discont_price !== null && a.discont_price !== undefined
            ? a.discont_price
            : a.price;
        const bPrice =
          b.discont_price !== null && b.discont_price !== undefined
            ? b.discont_price
            : b.price;

        return bPrice - aPrice;
      });
    }

    if (sortType === "newest") {
      result.sort((a, b) => {
        const aValue = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
        const bValue = b.createdAt ? new Date(b.createdAt).getTime() : b.id;

        return bValue - aValue;
      });
    }

    return result;
  }, [categoryData, sortType, minPrice, maxPrice]);

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
            { label: categoryData.category.title },
          ]}
        />

        <h1 className={styles.title}>{categoryData.category.title}</h1>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Price</span>

            <input
              type="number"
              placeholder="from"
              className={styles.input}
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />

            <input
              type="number"
              placeholder="to"
              className={styles.input}
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Sorted</span>

            <select
              className={styles.select}
              value={sortType}
              onChange={(event) => setSortType(event.target.value)}
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-high-low">price: high-low</option>
              <option value="price-low-high">price: low-high</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryProductsPage;
