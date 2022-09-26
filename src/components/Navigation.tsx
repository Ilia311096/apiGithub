import { Link } from "react-router-dom";
export const Navigation = () => {
  return (
    <nav className="flex justify-between p-5 h-[-50px] bg-gray-500  text-white items-center shadow-md">
      <h3 className="font-bold">GitHub Search</h3>
      <span>
        <Link to={"/"} className="mr-2">
          Home
        </Link>
        <Link to={"/favorites"}>Favorites</Link>
      </span>
    </nav>
  );
};
