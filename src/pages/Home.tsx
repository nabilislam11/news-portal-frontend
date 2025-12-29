import EveryDay from "../components/everyday/EveryDay";
import Banner from "../components/banner/Banner";
import FavoriteNews from "../favoritenews/FavoriteNews";
import Ads from "../components/ads/Ads";
import NewsItems from "@/components/newsitems/NewsItems";
import MarqueeTag from "@/components/marqueetag/MarqueeTag";
import AdsTop from "@/components/ads/AdsTop";

const Home = () => {
  return (
    <>
      <div className="bg-white pt-[126px]">
        <AdsTop />
        <MarqueeTag></MarqueeTag>
        <Banner></Banner>
        <EveryDay></EveryDay>
        <Ads></Ads>
        <FavoriteNews></FavoriteNews>
        <NewsItems></NewsItems>
      </div>
    </>
  );
};

export default Home;
