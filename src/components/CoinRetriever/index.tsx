import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../Dialog";
import Logs from "../Logs";
import FormError from "../FormError";

const CoinRetrieval = () => {
  const {
    _sqlProfile,
    _promptCoinRetrieval,
    promptCoinRetrieval,
    _archiveInfo,
    _updateCoins,
    setCoinsUpdate,
    _currentBlock,
    setLogs,
    _promptErrorDialog,
    retrieveCoins,
  } = useContext(appContext);

  console.log(_updateCoins);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    maxcoins: 0,
  });
  const [loading, setLoading] = useState(false);

  const isValidInput = () => {
    if (formData.maxcoins === 0 || formData.maxcoins.toString() === "") {
      return true;
    }

    const isInteger = /^\d+$/.test(formData.maxcoins.toString());
    return isInteger;
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding property in the state object
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep(1);
    setLogs([]);
    setLoading(true);

    try {
      const results = await retrieveCoins(formData.maxcoins);

      console.log(results);
      setLoading(false);
      setStep(3);
      setCoinsUpdate(results.response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!_promptCoinRetrieval) {
    return null;
  }

  return (
    <Dialog dismiss={() => (!loading ? promptCoinRetrieval : null)}>
      <div className="h-full grid items-center">
        <div className="bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4 dark:bg-black text-left grid grid-cols-1 grid-rows-[auto_1fr]">
          <div className="grid grid-cols-[1fr_auto] items-center">
            <h1 className="text-lg text-black dark:text-white font-bold">
              Coin Retrieval
            </h1>
            <a
              href="https://docs.minima.global/docs/runanode/archivenodes#update-mysql"
              target="_blank"
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
                <path
                  d="M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                  strokeWidth="0"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          {step === 0 && (
            <>
              <p className="text-sm mt-4">
                Retrieve spent and unspent coins from the syncblock table.{" "}
                <b>Leave empty if you want to pull max available amount.</b>
              </p>

              {loading && (
                <div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="animate-spin"
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
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    <p className="text-sm font-bold animate-pulse">
                      Retrieving coins...
                    </p>
                  </div>
                  <p className="text-sm">
                    Please be patient, should be done soon.
                  </p>
                </div>
              )}
              {!loading && !_promptErrorDialog && (
                <div className="mt-4">
                  <form className="grid gap-1" onSubmit={handleSubmit}>
                    <label className="grid">
                      <span className="mb-1 font-bold">Amount</span>
                      <input
                        step="1"
                        max={1000000000}
                        type="number"
                        className="bg-slate-200 text-black p-2 rounded-lg invalid:outline-red-500 invalid:outline invalid:shadow-inner invalid:shadow-red-500"
                        placeholder="Max"
                        name="maxcoins"
                        onChange={handleInputChange}
                        value={formData.maxcoins === 0 ? "" : formData.maxcoins}
                      />
                    </label>
                    <FormError
                      message="Only integer values are allowed. (e.g. 1, 2, 500, 300)"
                      visible={!isValidInput()}
                    />

                    <button
                      disabled={!isValidInput()}
                      type="submit"
                      className="mt-3 w-full disabled:bg-opacity-50 disabled:cursor-notallowed disabled:hover:outline-none disabled:cursor-not-allowed bg-teal-500 font-bold text-white"
                    >
                      Retrieve Coins
                    </button>

                    <button
                      className="mt-2 w-full mx-auto"
                      onClick={promptCoinRetrieval}
                    >
                      Dismiss
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
          {step === 1 && (
            <>
              <div className="mt-4 bg-white dark:bg-black dark:text-slate-300">
                <Logs />
              </div>

              {loading && (
                <div className="my-4">
                  <div className="flex items-center gap-1">
                    <svg
                      className="animate-spin"
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
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>
                    <p className="text-sm font-bold animate-pulse">
                      Syncing up your blocks...
                    </p>
                  </div>
                  <p className="text-sm">
                    Please be patient, should be done soon.
                  </p>
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <div className="mt-4 bg-white dark:bg-black dark:text-slate-300">
                <h3>Updated!</h3>

                <div className="mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
                    <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
                    <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
                    <path d="M3 6v10c0 .888 .772 1.45 2 2" />
                    <path d="M3 11c0 .888 .772 1.45 2 2" />
                  </svg>
                  <div className="flex gap-[0.5px] items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                    <p>
                      {_updateCoins && "coinsadded" in _updateCoins
                        ? _updateCoins.coinsadded
                        : "N/A"}
                    </p>
                  </div>
                  <p>
                    {_updateCoins && "firstblock" in _updateCoins
                      ? "First block: " + _updateCoins.firstblock
                      : "N/A"}
                  </p>
                  <p>
                    {_updateCoins && "lastblock" in _updateCoins
                      ? "Last block: " + _updateCoins.lastblock
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
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
                    <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
                  </svg>
                  {_updateCoins && "duration" in _updateCoins && (
                    <p className="text-sm font-bold text-teal-500">
                      {"Ran for " + _updateCoins.duration}
                    </p>
                  )}
                </div>
                <button
                  className="mt-4 w-full mx-auto"
                  onClick={() => {
                    setStep(0);
                    promptCoinRetrieval();
                  }}
                >
                  Back to dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default CoinRetrieval;
