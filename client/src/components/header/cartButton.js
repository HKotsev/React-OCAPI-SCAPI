// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import CartIcon from "../../assets/icons/cartIcon";
import classes from "./cartButton.module.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const CartButton = (props) => {
  const [btnBump, setBtnBump] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const basket = useSelector((state) => state.basket.basket);
  const [opacity, setOpacity] = useState({ opacity: 0 });
  useEffect(() => {
    setBtnBump(true);

    setTimeout(() => {
      setBtnBump(false);
    }, 300);
  }, [itemsCount]);
  useEffect(() => {
    if (!basket || !basket.product_items) {
      setOpacity({ opacity: 0 });
      setItemsCount(0);
      return;
    }
    const count = basket.product_items
      .map((item) => {
        return item.quantity;
      })
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    setItemsCount(count);
    setOpacity({ opacity: 1 });
  }, [basket]);

  return (
    <NavLink
      className={({ isActive }) =>
        [
          btnBump && classes.bump,
          classes.button,
          isActive ? classes.active : null,
        ].join(" ")
      }
      to="checkout"
    >
      <span className={classes.amount}>
        <span style={opacity} className={classes.badge}>
          {itemsCount}
        </span>
        <CartIcon />
      </span>
    </NavLink>
  );
};
export default CartButton;
