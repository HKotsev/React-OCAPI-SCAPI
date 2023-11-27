import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import ImageSection from "./ImageSection";
import classes from "./productDetails.module.css";
import Details from "./Details";
const ProductDetails = () => {
  const [productsData, setProductsData] = useState(useLoaderData());
  const { requestHandler } = useHttp();

  const authenticationHandler = (data, response) => {
    if (!response || !data) return;
    localStorage.setItem(
      "token",
      response.headers.get("Authorization").substring(7)
    );
  };

  useEffect(() => {
    requestHandler(
      {
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/customers/auth`,
        method: "POST",
        body: { type: "guest" },
        headers: {
          "Content-Type": "application/json",
          "x-dw-client-id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
      },
      authenticationHandler
    );
  }, []);
  const productDataHandler = (data) => {
    setProductsData(data);
  };

  return (
    <>
      {productsData.isError ? (
        <div style={{ textAlign: "center" }}>{productsData.errorMessage}</div>
      ) : (
        <>
          <section className={classes["product-details-container"]}>
            <ImageSection productImages={productsData.image_groups[0].images} />
            <Details
              productDetails={productsData}
              productDataHandler={productDataHandler}
            />
          </section>
          {productsData.type.bundle &&
            productsData.bundled_products.map((product) => {
              return (
                <section className={classes["product-details-container"]}>
                  <ImageSection
                    productImages={product.product.image_groups[0].images}
                  />
                  <Details
                    productDetails={product.product}
                    productDataHandler={productDataHandler}
                  />
                </section>
              );
            })}
        </>
      )}
    </>
  );
};

export default ProductDetails;

export async function loader({ params }) {
  const { pid } = params;

  const response = await fetch(
    `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/products/${pid}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&expand=images,variations,prices,options,bundled_products,availability`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    return {
      isError: true,
      errorMessage: "Could not fetch product data",
    };
  }
  const data = response.json();
  return data;
}
