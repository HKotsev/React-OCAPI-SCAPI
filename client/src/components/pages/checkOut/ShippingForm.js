import { useEffect, useRef } from "react";
import "./shippingForm.css";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import Loader from "../../UI/Loader";
const ShippingForm = () => {
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket.basket);
  const firstName = useRef();
  const lastName = useRef();
  const address = useRef();
  const postcode = useRef();
  const city = useRef();
  const phone = useRef();
  const { requestHandler, isLoading, error } = useHttp();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (
      !firstName.current.value ||
      !lastName.current.value ||
      !address.current.value ||
      !postcode.current.value ||
      !city.current.value ||
      !phone.current.value
    )
      return;
    requestHandler(
      {
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets/${basket.basket_id}/shipments/${basket.shipments[0].shipment_id}/shipping_address`,
        method: "PUT",
        body: {
          address1: address.current.value,
          city: city.current.value,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          phone: phone.current.value,
          postal_code: postcode.current.value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      (data) => {
        navigate("billing");
      }
    );
  };
  return (
    <>
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <div className="container">
        <h1>Shipping</h1>
        <p>Please enter your shipping details.</p>
        <hr />
        <form onSubmit={formSubmitHandler} className="form">
          <div className="fields fields--2">
            <label className="field">
              <span className="field__label" htmlFor="firstname">
                First name
              </span>
              <input
                required
                className="field__input"
                type="text"
                id="firstname"
                ref={firstName}
              />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="lastname">
                Last name
              </span>
              <input
                required
                className="field__input"
                type="text"
                id="lastname"
                ref={lastName}
              />
            </label>
          </div>
          <label className="field">
            <span className="field__label" htmlFor="address">
              Address
            </span>
            <input
              ref={address}
              required
              className="field__input"
              type="text"
              id="address"
            />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="phone">
              City
            </span>
            <input
              ref={city}
              required
              className="field__input"
              type="text"
              id="phone"
            />
          </label>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="postcode">
                post code
              </span>
              <input
                required
                className="field__input"
                type="text"
                id="postcode"
                ref={postcode}
              />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="city">
                Phone
              </span>
              <input
                ref={phone}
                required
                className="field__input"
                type="text"
                id="city"
              />
            </label>
          </div>
          <button className="button">Continue</button>
        </form>
      </div>
    </>
  );
};
export default ShippingForm;
