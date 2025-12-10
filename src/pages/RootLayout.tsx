

import Header from "../header/Header";
import MarqueeTag from "../components/marqueetag/MarqueeTag";
import { Outlet } from "react-router";
import Topheader from "../components/topheader/Topheader";

const RootLayout = () => {
  return (
    <div>
      <Topheader/>
      <Header></Header>
      <MarqueeTag></MarqueeTag>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
