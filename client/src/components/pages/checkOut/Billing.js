import { useRef, useState } from "react";
import "./shippingForm.css";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import Loader from "../../UI/Loader";
const Billing = () => {
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket.basket);
  const [cardNumber, setCardNumber] = useState("");
  const firstName = useRef();
  const lastName = useRef();
  const address = useRef();
  const postcode = useRef();
  const city = useRef();
  const phone = useRef();
  const { requestHandler, isLoading, error } = useHttp();

  const handleCardNumberChange = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    input = input.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(input);
  };
  const handleSubmit = async (event) => {
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
        url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets/${basket.basket_id}/payment_instruments`,
        method: "POST",
        body: {
          payment_card: {
            card_type: "Visa",
            number: "4444333322221111",
            security_code: "123",
            expiration_month: 3,
            expiration_year: 2021,
          },
          payment_method_id: "CREDIT_CARD",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      (data) => {
        requestHandler(
          {
            url: `https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/baskets/${basket.basket_id}/billing_address`,
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
            navigate("/checkout/order");
          }
        );
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <div className="container">
        <h1>Billing</h1>
        <p>Please enter your Billing details.</p>
        <hr />
        <form onSubmit={handleSubmit} className="form">
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
          <span>Card details</span>
          <div className="fields fields--1">
            <label className="field">
              <span className="field__label" htmlFor="postcode">
                card number
              </span>
              <input
                maxLength={19}
                onChange={handleCardNumberChange}
                required
                className="field__input"
                type="text"
                id="postcode"
                value={cardNumber}
              />
            </label>
          </div>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="postcode">
                Expiration Month
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
              <span className="field__label" htmlFor="postcode">
                Expiration Year
              </span>
              <input
                max={2028}
                required
                className="field__input"
                type="number"
                id="postcode"
                ref={postcode}
              />
            </label>
          </div>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="postcode">
                Security Code
              </span>
              <input
                maxLength={3}
                required
                className="field__input"
                type="text"
                id="postcode"
                ref={postcode}
              />
            </label>
          </div>
          <button className="button">Continue</button>
        </form>
      </div>
    </>
  );
};
export default Billing;
