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
import CoinRetrieval from "./components/CoinRetriever";
import CoinSearchWhere from "./components/CoinSearchWhere";

function App() {
  const { _dataResults } = useContext(appContext);

  const { results } = useMatches();

  return (
    <>
      <ArchiveInfo />
      <SyncBlocksWithMySQL />
      <IntegrityCheck />
      <CoinRetrieval />

      <Login />
      <ErrorDialog />
      <PendingDialog />
      <ReadModeDialog />

      <div className="grid grid-cols-1 grid-rows-[56px_1fr]">
        <header className="flex justify-between items-center">
          <div>
            <ProfileHeader />
          </div>
          <div className="flex gap-2 items-center">
            <SearchBar />
          </div>
        </header>
        <main className="max-w-md mx-auto grid grid-cols-[1fr_minmax(0,_800px)_1fr] grid-rows-1 h-[calc(100vh_-_56px_-_16px)]">
          <div />
          <section className="grid grid-cols-1 grid-rows-[1fr_2fr]">
            <div className="py-8">
              <CoinSearchWhere />
            </div>
            <div className="max-w-md mx-auto">
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
                  <p className="text-teal-500 font-mono">No data queried</p>
                  <div className="flex">
                    <CommandKay pulse />
                  </div>
                  <p className="text-teal-500 font-mono">
                    to begin, or tap the search above
                  </p>
                </div>
              )}
              {_dataResults && (
                <div>
                  {_dataResults.map((coin) => (
                    <p>{coin.address}</p>
                  ))}
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
