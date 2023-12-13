import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../Dialog";
import Logs from "../Logs";

const SyncBlocksWithMySQL = () => {
  const {
    _sqlProfile,
    _promptSyncBlocks,
    promptSyncBlocks,
    _archiveInfo,
    handleIntegrityCheck,
    setArchiveInfo,
    _currentBlock,
    getTopBlock,
    setLogs,
    promptPendingDialog,
  } = useContext(appContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    if (_sqlProfile && _promptSyncBlocks) {
      checkIntegrity();
    }
  }, [_sqlProfile, _promptSyncBlocks]);

  const checkIntegrity = async () => {
    setLoading(true);
    try {
      await handleIntegrityCheck();
      await getTopBlock();

      setLoading(false);
    } catch (error) {
      setError(error as string);
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(1);
    setLogs([]);
    setLoading(true);

    // Access form data in the state object (formData)
    (window as any).MDS.cmd(
      `mysql action:update host:${_sqlProfile.host} database:${_sqlProfile.database} user:${_sqlProfile.user} password:${_sqlProfile.password}`,
      (response: any) => {
        console.log(response);
        const { pending, status, error } = response;
        if (pending) {
          setLoading(false);
          return promptPendingDialog();
        }

        if (!status && !pending) {
          setLoading(false);

          return setError(error as string);
        }

        setLoading(false);
        setArchiveInfo(response.response);
        return setStep(3);
      }
    );
    // You can perform further actions, such as sending data to a server
  };

  if (!_promptSyncBlocks) {
    return null;
  }

  const canBeginSync =
    _archiveInfo &&
    "end" in _archiveInfo &&
    _currentBlock &&
    parseInt(_archiveInfo.end) !== parseInt(_currentBlock);

  return (
    <Dialog dismiss={() => (!loading ? promptSyncBlocks : null)}>
      <div className="h-full grid items-center">
        <div className="bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4 dark:bg-black text-left grid grid-cols-1 grid-rows-[auto_1fr]">
          <div className="grid grid-cols-[1fr_auto] items-center">
            <h1 className="text-lg text-black dark:text-white font-bold">
              Sync Blocks
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
                Sync block will sync up all your current archive blocks to your
                MySQL Archive database table (syncblocks).
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
                      Checking archive's integrity...
                    </p>
                  </div>
                  <p className="text-sm">
                    Please be patient, should be done soon.
                  </p>
                </div>
              )}
              {!loading && !error && (
                <div className="mt-4">
                  <form className="grid gap-1" onSubmit={handleSubmit}>
                    <div>
                      {_archiveInfo && "end" in _archiveInfo ? (
                        <p>Last synced block: {_archiveInfo.end}</p>
                      ) : (
                        <p>N/A</p>
                      )}
                    </div>
                    <div>{"Current block: " + _currentBlock}</div>
                    <button
                      disabled={!canBeginSync}
                      className="mt-3 w-full disabled:bg-opacity-50 disabled:cursor-notallowed disabled:hover:outline-none disabled:cursor-not-allowed bg-black text-white"
                    >
                      Begin Sync
                    </button>
                    <button
                      className="mt-2 w-full mx-auto"
                      onClick={promptSyncBlocks}
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
                <h3>Sync up completed!</h3>
              </div>
              <button
                className="mt-4 w-full mx-auto"
                onClick={() => {
                  setStep(0);
                  promptSyncBlocks();
                }}
              >
                Back to dashboard
              </button>
            </>
          )}

          {error && (
            <>
              <div className="mt-4 dark:text-slate-300 text-center  bg-red-50 py-3">
                <h3 className="font-bold">Hmm, something went wrong.</h3>
                <p>
                  {typeof error === "object" ? JSON.stringify(error) : error}
                </p>
              </div>
              <button
                className="mt-4 w-full mx-auto"
                onClick={() => {
                  setStep(0);
                  setError(false);
                  promptSyncBlocks();
                }}
              >
                Back to dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default SyncBlocksWithMySQL;
