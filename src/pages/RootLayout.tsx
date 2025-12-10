import Header from "../header/Header";
import { Outlet } from "react-router";
import Topheader from "../components/topheader/Topheader";

const RootLayout = () => {
  return (
    <div>
      <Topheader />
      <Header></Header>
      {/* <MarqueeTag></MarqueeTag> */}
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
