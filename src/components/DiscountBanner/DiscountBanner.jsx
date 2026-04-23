import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";
import styles from "./DiscountBanner.module.css";
import petsImg from "../../assets/images/discount-pets.png";

function DiscountBanner() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/sale/send", data);
      setIsSuccess(true);
      reset();
    } catch {}
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.banner}>
          <h2 className={styles.title}>5% off on the first order</h2>

          <div className={styles.content}>
            <div className={styles.imageWrapper}>
              <img src={petsImg} alt="Pets" className={styles.image} />
            </div>

            <div className={styles.formWrapper}>
              {isSuccess ? (
                <div className={styles.successBox}>
                  <p className={styles.successTitle}>
                    Request sent successfully!
                  </p>
                  <p className={styles.successText}>
                    We will contact you soon and send your discount details.
                  </p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.field}>
                    <input
                      type="text"
                      placeholder="Name"
                      className={styles.input}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <span className={styles.error}>
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className={styles.input}
                      {...register("phone", {
                        required: "Phone number is required",
                        minLength: {
                          value: 5,
                          message: "Phone number is too short",
                        },
                      })}
                    />
                    {errors.phone && (
                      <span className={styles.error}>
                        {errors.phone.message}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <input
                      type="email"
                      placeholder="Email"
                      className={styles.input}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className={styles.error}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Get a discount"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscountBanner;
