import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
const Root = () => {
  return (
    <>
      <Header />
      <main
        style={{ minHeight: "100vh", maxWidth: "1440px", margin: "0 auto" }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Root;
