import { useContext } from "react";
import "./App.css";
import ArchiveInfo from "./components/ArchiveInfo";
import { appContext } from "./AppContext";
import SyncBlocksWithMySQL from "./components/SyncBlocksWithMySQL";
import IntegrityCheck from "./components/IntegrityCheck";
import Login from "./components/Login";

import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import SearchBar from "./components/SearchBar";
import CommandKay from "./components/CommandKay";
import ProfileHeader from "./components/ProfileHeader";
import ErrorDialog from "./components/ErrorDialog";
import PendingDialog from "./components/PendingDialog";
import ReadModeDialog from "./components/ReadMode";

function App() {
  const {
    _dataResults,
    _sqlProfile,
    promptArchiveInfo,
    promptSyncBlocks,
    promptIntegrityCheck,
    promptSQLProfileSetup,
  } = useContext(appContext);

  const { results } = useMatches();

  // console.log(_sqlProfile);
  return (
    <>
      <ArchiveInfo />
      <SyncBlocksWithMySQL />
      <IntegrityCheck />

      <Login />
      <ErrorDialog />
      <PendingDialog />
      <ReadModeDialog />

      {/* <button onClick={promptArchiveInfo}>Info</button>
      <button onClick={promptSyncBlocks}>Sync blocks</button>
      <button onClick={promptIntegrityCheck}>Integrity</button> */}
      <div className="grid grid-cols-1 grid-rows-[56px_1fr]">
        <header className="flex justify-between items-center">
          <div />
          <div className="flex gap-2 items-center">
            <ProfileHeader />

            <SearchBar />
          </div>
        </header>
        <main className="max-w-md mx-auto grid grid-cols-[1fr_minmax(0,_800px)_1fr] grid-rows-1 h-[calc(100vh_-_56px_-_16px)]">
          <div />
          <section className="grid grid-cols-1 grid-rows-[1fr_2fr]">
            <div />
            <div className="max-w-md">
              <KBarPortal>
                <KBarPositioner>
                  <KBarAnimator>
                    <KBarSearch className="p-4 w-[75vw] lg:w-[50vw] font-mono focus:outline-teal-600 dark:bg-black" />
                    <div className="bg-slate-50">
                      <KBarResults
                        items={results}
                        onRender={({ item, active }) =>
                          typeof item === "string" ? (
                            <div className="px-2">{item}</div>
                          ) : (
                            <div
                              className={`${
                                active
                                  ? "bg-teal-500 text-white dark:text-black"
                                  : ""
                              } px-2 py-2 dark:text-black hover:cursor-pointer`}
                            >
                              <div className="flex gap-3 items-center">
                                {item.icon}
                                <div>
                                  <h2>{item.name}</h2>
                                  <p className="text-sm">{item.subtitle}</p>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      />
                    </div>
                  </KBarAnimator>
                </KBarPositioner>
              </KBarPortal>

              {!_dataResults && (
                <div className="text-center max-w-sm mx-auto flex justify-center flex-col items-center gap-2">
                  <p className="text-slate-400 font-mono">No data queried</p>
                  <div className="flex">
                    <CommandKay pulse />
                  </div>
                  <p className="text-slate-400 font-mono">
                    to begin, or tap the search above
                  </p>
                </div>
              )}
            </div>
          </section>
          <div />
        </main>
      </div>
    </>
  );
}

export default App;
