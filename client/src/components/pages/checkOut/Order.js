import useHttp from "../../../hooks/use-http";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../../UI/Loader";
import classes from "./order.module.css";

const Order = () => {
  const [order, setOrder] = useState(null);
  const basket = useSelector((state) => state.basket.basket);
  const [contentAsset, setContentAsset] = useState("");
  const { requestHandler, isLoading, error } = useHttp();

  const submitOrder = () => {
    if (!basket) return;
    requestHandler(
      {
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/orders`,
        method: "POST",
        body: { basket_id: basket.basket_id },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      (data) => {
        setOrder(data);
        successfulOrderHandler(data);
      }
    );
  };

  const successfulOrderHandler = (orderInfo) => {
    if (!orderInfo) return;
    requestHandler(
      {
        url: "https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/content/successful-order?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        headers: { "Content-Type": "application/json" },
      },
      (data) => {
        const assetBody = data.c_body
          .toString()
          .replace("${order ID}", orderInfo.order_no);
        setContentAsset(assetBody);
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <div className={classes["order-container"]}>
        <button className={classes.btn} onClick={submitOrder}>
          Submit order
        </button>
        <p>{contentAsset && contentAsset}</p>
      </div>
    </>
  );
};
export default Order;
