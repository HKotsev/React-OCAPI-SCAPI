import ColorVariations from "./variations/ColorVariations";
import VariationAttrute from "./variations/VariationAttribute";
import AddToCartButton from "./AddToCartButton";
import useHttp from "../../../hooks/use-http";
import { basketActions } from "../../../store/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../UI/Loader";
import React, { useState } from "react";
const DetailsForm = (props) => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const { requestHandler, isLoading, error } = useHttp();
  const [quantity, setQuantity] = useState("");
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (
      !props.productDetails ||
      props.productDetails.type.master ||
      props.productDetails.type.variation_group
    )
      return;

    if (!basket) {
      requestHandler(
        {
          url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
        (data) => {
          addItemToBasket(data);
        }
      );
    } else {
      addItemToBasket();
    }
  };

  const addItemToBasket = (basketInfo) => {
    requestHandler(
      {
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets/${
          basketInfo ? basketInfo.basket_id : basket.basket_id
        }/items`,
        method: "POST",
        body: [
          {
            product_id: props.productDetails.id,
            quantity: +quantity,
          },
        ],
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      (data) => {
        dispatch(basketActions.createBasket(data));
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={formSubmitHandler}>
        {props.variationAttributes && props.variationAttributes.color && (
          <ColorVariations
            productAttributesHanlder={props.productAttributesHanlder}
            variationAttributes={props.variationAttributes}
          />
        )}
        {props.variationAttributes && (
          <VariationAttrute
            productDetails={props.productDetails}
            productAttributesHanlder={props.productAttributesHanlder}
            variationAttributes={props.variationAttributes}
          />
        )}
        <div>{props.productDetails.short_description}</div>
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        >
          {Array.from({ length: 5 }, (_, index) => index + 1).map((num, i) => {
            if (i === 0) {
              return (
                <React.Fragment key={i}>
                  <option value="">Select an option</option>
                  <option
                    disabled={num > props.productDetails.inventory.stock_level}
                    value={num}
                  >
                    {num}
                  </option>
                </React.Fragment>
              );
            }
            return (
              <option
                disabled={num > props.productDetails.inventory.stock_level}
                value={num}
              >
                {num}
              </option>
            );
          })}
        </select>
        <AddToCartButton />
      </form>
    </>
  );
};
export default DetailsForm;
