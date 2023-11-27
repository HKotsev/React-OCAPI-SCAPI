import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/pages/roots/Root";
import ProductDetails, {
  loader as productLoader,
} from "./components/pages/productDetails/ProductDetails";
import CheckOut from "./components/pages/checkOut/CheckOut";
import Billing from "./components/pages/checkOut/Billing";
import CheckOutRoot from "./components/pages/roots/CheckoutRoot";
import Order from "./components/pages/checkOut/Order";
import ErrorPage from "./components/pages/errorPAge/ErrorPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":pid",
        element: <ProductDetails />,
        loader: productLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "checkout",
        element: <CheckOutRoot />,
        children: [
          { index: true, element: <CheckOut /> },
          { path: "billing", element: <Billing /> },
          { path: "order", element: <Order /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
