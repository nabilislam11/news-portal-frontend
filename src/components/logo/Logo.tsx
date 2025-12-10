import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="text-2xl font-bold text-red-600 cursor-pointer">
        MyLogo
      </div>
    </Link>
  );
};

export default Logo;
