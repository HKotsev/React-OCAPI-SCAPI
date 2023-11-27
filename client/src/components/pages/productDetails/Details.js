import { useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import DetailsForm from "./DetailsForm";
import Loader from "../../UI/Loader";
const Details = (props) => {
  const [variationAttributes, setVariationAttributes] = useState("");
  const [currentProductsAttributes, setCurrentProductAttributes] = useState({});
  const { requestHandler, isLoading, error } = useHttp();

  useEffect(() => {
    if (Object.keys(currentProductsAttributes).length === 0) return;
    const timer = setTimeout(() => {
      const filteredProduct = props.productDetails.variants.filter(
        (variant) => {
          const keys = Object.keys(currentProductsAttributes);
          for (const key of keys) {
            if (
              variant.variation_values[key] !== currentProductsAttributes[key]
            ) {
              return false;
            }
          }
          return true;
        }
      );

      if (!filteredProduct || filteredProduct.length === 0) {
        return;
      } else if (
        filteredProduct.length === 1 &&
        Object.keys(currentProductsAttributes).length ===
          Object.keys(filteredProduct[0].variation_values).length
      ) {
        requestHandler(
          {
            url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/products/${filteredProduct[0].product_id}?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&expand=images,variations,prices,options,availability`,
            headers: { "Content-Type": "application/json" },
          },
          (data) => {
            props.productDataHandler(data);
          }
        );
        return;
      } else {
        requestHandler(
          {
            url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/products/${filteredProduct[0].product_id}/variations?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
            headers: { "Content-Type": "application/json" },
          },
          helper
        );
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [currentProductsAttributes]);

  useEffect(() => {
    helper(props.productDetails);
  }, [props]);

  const helper = (productVariationAttributes) => {
    if (!productVariationAttributes.variation_attributes) return;
    let variationAttrObject = {};
    productVariationAttributes.variation_attributes.forEach((attr) => {
      variationAttrObject[attr.name.toLowerCase()] = attr.values.map(
        (value) => {
          return {
            name: value.name,
            value: value.value,
            orderable: value.orderable,
          };
        }
      );
    });

    setVariationAttributes(variationAttrObject);
  };

  const productAttributesHanlder = (attribute, option) => {
    setCurrentProductAttributes((prev) => {
      return { ...prev, [attribute]: option };
    });
  };

  return (
    <section>
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <h1>{props.productDetails.name}</h1>
      <span>{props.productDetails.id}</span>
      <DetailsForm
        variationAttributes={variationAttributes}
        currentProductsAttributes={currentProductsAttributes}
        productDetails={props.productDetails}
        productAttributesHanlder={productAttributesHanlder}
      />
      <span>{props.productDetails.price}</span>
    </section>
  );
};
export default Details;
