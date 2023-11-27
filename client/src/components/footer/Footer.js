import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./footer.module.css";
import useHttp from "../../hooks/use-http";
const Footer = () => {
  const { requestHandler } = useHttp();
  const [footerAsset, setFooterAsset] = useState("");
  const contentAssetHandler = (data) => {
    const modifiedContent = data.c_body.replace(
      /<ul class="socialIcons-asset">/g,
      '<ul class="socialIcons-asset ' + classes.socialIcons + '">'
    );
    setFooterAsset(modifiedContent);
  };
  useEffect(() => {
    requestHandler(
      {
        url: "https://zydc-006.dx.commercecloud.salesforce.com/s/Sites-RefArch-Site/dw/shop/v21_10/content/react-footer?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        headers: { "Content-Type": "application/json" },
      },
      contentAssetHandler
    );
  }, []);
  return (
    <>
      <footer className={classes.footerConatiner}>
        <nav
          className={classes.socialIcons}
          dangerouslySetInnerHTML={{ __html: footerAsset }}
        ></nav>
        <nav className={classes.footerNav}>
          <ul>
            <li>
              <NavLink>Home</NavLink>
            </li>
            <li>
              <NavLink>New</NavLink>
            </li>
            <li>
              <NavLink>About</NavLink>
            </li>
            <li>
              <NavLink>Contact us</NavLink>
            </li>
            <li>
              <NavLink>Our Team</NavLink>
            </li>
          </ul>
        </nav>
      </footer>
      <div className={classes.footerBottom}>
        <p>
          Copyright &copy;{new Date().getFullYear()}; Designed by{" "}
          <span className={classes.designer}>Hristian</span>
        </p>
      </div>
    </>
  );
};
export default Footer;
