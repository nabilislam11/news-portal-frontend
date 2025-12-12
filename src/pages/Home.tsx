import EveryDay from "../components/everyday/EveryDay";

import Trending from "../components/trending/Trending";
import FavoriteNews from "../favoritenews/FavoriteNews";
import Footer from "../components/footer/Footer";
const Home = () => {
  return (
    <>
      <div className="bg-white pt-40">
        <Trending></Trending>
        <FavoriteNews></FavoriteNews>
        <EveryDay></EveryDay>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
