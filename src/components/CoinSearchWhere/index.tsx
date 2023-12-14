import { useContext, useState } from "react";
import { appContext } from "../../AppContext";

import { useSpring, animated } from "react-spring";

const CoinSearchWhere = () => {
  const {
    _sqlProfile,
    _promptCoinSearchWhere,
    loading,
    setLoading,
    promptErrorDialog,
    _dataResults,
    setDataResults,
  } = useContext(appContext);

  const props = useSpring({
    opacity: _promptCoinSearchWhere ? 1 : 0,
    transform: _promptCoinSearchWhere ? "translateY(0)" : "translateY(-50px)",
    from: {
      opacity: 0,
      transform: "translateY(-50px)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
  });

  const [formData, setFormData] = useState({
    address: "",
  });

  const [count, setCount] = useState<false | number>(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding property in the state object
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCount(false);
    setLoading(true);
    setDataResults([]);
    // Access form data in the state object (formData)
    (window as any).MDS.cmd(
      `mysqlcoins action:search address:${formData.address} host:${_sqlProfile.host} database:${_sqlProfile.database} user:${_sqlProfile.user} password:${_sqlProfile.password}`,
      (response: any) => {
        console.log(response);
        const { status, error } = response;

        if (!status) {
          setLoading(false);

          return promptErrorDialog(error as string);
        }

        setLoading(false);
        setCount(response.response.count);
        setDataResults(response.response.rows);
      }
    );
    // You can perform further actions, such as sending data to a server
  };

  if (!_promptCoinSearchWhere) {
    return null;
  }

  return (
    <animated.div style={props}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search by 0x or Mx address..."
          className="w-full p-6 rounded-full font-mono focus:outline-teal-500"
          name="address"
          id="address"
          onChange={handleInputChange}
        />
        <div className="max-w-md flex justify-center gap-2 mt-2">
          {_dataResults && (
            <button
              onClick={() => setDataResults(null)}
              className="flex gap-1 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 6h12" />
                <path d="M6 12h12" />
                <path d="M4 18h12" />
              </svg>
              Clear
            </button>
          )}
          <button className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M18.5 18.5l2.5 2.5" />
              <path d="M4 6h16" />
              <path d="M4 12h4" />
              <path d="M4 18h4" />
            </svg>
            Browse
          </button>
          <button
            disabled={loading}
            className="flex gap-1 items-center bg-teal-500 text-black font-bold"
          >
            <svg
              className={`${loading ? "animate-pulse" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </animated.div>
  );
};

export default CoinSearchWhere;
