import { useKBar } from "kbar";
import CommandKay from "../CommandKay";

const SearchBar = () => {
  const { query } = useKBar();

  return (
    <div
      onClick={query.toggle}
      className="bg-white hover:shadow-inner hover:shadow-teal-500 dark:text-black hover:outline-teal-500 hover:cursor-pointer outline rounded-full px-2 py-3 font-bold flex"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      Search
      <CommandKay />
    </div>
  );
};

export default SearchBar;
