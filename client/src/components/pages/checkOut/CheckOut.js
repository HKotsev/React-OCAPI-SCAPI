import { useEffect, useRef, useState } from "react";
import ShippingForm from "./ShippingForm";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useHttp from "../../../hooks/use-http";
import { useDispatch } from "react-redux";
import { basketActions } from "../../../store/basketSlice";
import React from "react";
import classes from "./checkout.module.css";
import Loader from "../../UI/Loader";
const CheckOut = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingMethodes, setShippingMethodes] = useState("");
  const [shippmentId, setShippmentId] = useState("");
  const { requestHandler, isLoading, error } = useHttp();

  useEffect(() => {
    if (!basket) return;
    requestHandler(
      {
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets/${basket.basket_id}/shipments/me/shipping_methods`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      (data) => {
        setShippingMethodes(data.applicable_shipping_methods);
      }
    );
  }, []);
  const proceedButtonHandler = (event) => {
    event.preventDefault();
    requestHandler(
      {
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets/${basket.basket_id}/shipments/${basket.shipments[0].shipment_id}/shipping_method`,
        method: "PUT",
        body: { id: shippmentId },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      (data) => {
        setShowShippingForm(true);
      }
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <div className={classes["shipping-method-container"]}>
        <h1>Shippment Method</h1>
        {shippingMethodes && (
          <form onSubmit={proceedButtonHandler}>
            <select
              value={shippmentId}
              required
              onChange={(e) => setShippmentId(e.target.value)}
            >
              {shippingMethodes.map((method, i) => {
                if (i === 0) {
                  return (
                    <React.Fragment key={i}>
                      <option disabled value="">
                        Select an option
                      </option>
                      <option value={method.id}>{method.name}</option>
                    </React.Fragment>
                  );
                }
                return (
                  <option key={i} value={method.id}>
                    {method.name}
                  </option>
                );
              })}
            </select>
            <button>Proceed</button>
          </form>
        )}
        {showShippingForm && <ShippingForm />}
      </div>
    </>
  );
};
export default CheckOut;
