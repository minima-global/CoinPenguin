import { useContext } from "react";
import "./App.css";
import ArchiveInfo from "./components/ArchiveInfo";
import { appContext } from "./AppContext";
import SyncBlocksWithMySQL from "./components/SyncBlocksWithMySQL";
import IntegrityCheck from "./components/IntegrityCheck";
import Login from "./components/Login";

function App() {
  const {
    _sqlProfile,
    promptArchiveInfo,
    promptSyncBlocks,
    promptIntegrityCheck,
    promptSQLProfileSetup,
  } = useContext(appContext);

  console.log(_sqlProfile);
  return (
    <>
      <ArchiveInfo />
      <SyncBlocksWithMySQL />
      <IntegrityCheck />
      <Login />

      {/* <button onClick={promptArchiveInfo}>Info</button>
      <button onClick={promptSyncBlocks}>Sync blocks</button>
      <button onClick={promptIntegrityCheck}>Integrity</button> */}
      <div className="grid grid-cols-1 grid-rows-[56px_1fr]">
        <header className="flex justify-between items-center">
          <div />
          <div>
            {!_sqlProfile ? (
              <button onClick={promptSQLProfileSetup}>Set</button>
            ) : (
              <div onClick={promptSQLProfileSetup}>
                {_sqlProfile && (
                  <div className="flex items-center bg-black rounded-full p-2 px-3 gap-2 hover:bg-opacity-50 hover:cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="rgb(253 242 248)"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <p className="text-white dark:text-slate-200 font-semibold">
                      {_sqlProfile.user}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
        <main className="max-w-md mx-auto grid grid-cols-[1fr_minmax(0,_800px)_1fr] grid-rows-1 h-[calc(100vh_-_56px_-_16px)]">
          <div />
          <section className="grid grid-cols-1 grid-rows-[1fr_2fr]">
            <div />
            <input
              placeholder="Search"
              className="p-4 rounded-full w-full h-max"
            />
          </section>
          <div />
        </main>
      </div>
    </>
  );
}

export default App;
