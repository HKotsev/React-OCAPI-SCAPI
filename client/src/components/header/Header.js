import { Link } from "react-router-dom";
import classes from "./header.module.css";
import logo from "../../assets/images/logo.png";

import CartButton from "./cartButton";

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navigationContainer}>
        <Link to="">
          <img className={classes.image} src={logo} />
        </Link>
        <div className={classes.buttonContainer}></div>
        <CartButton />
      </nav>
    </header>
  );
};
export default Header;
