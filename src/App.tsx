import { useContext } from "react";
import "./App.css";
import ArchiveInfo from "./components/ArchiveInfo";
import { appContext } from "./AppContext";
import SyncBlocksWithMySQL from "./components/SyncBlocksWithMySQL";
import IntegrityCheck from "./components/IntegrityCheck";

function App() {
  const { promptArchiveInfo, promptSyncBlocks, promptIntegrityCheck } =
    useContext(appContext);

  return (
    <>
      <ArchiveInfo />
      <SyncBlocksWithMySQL />
      <IntegrityCheck />

      <button onClick={promptArchiveInfo}>Info</button>
      <button onClick={promptSyncBlocks}>Sync blocks</button>
      <button onClick={promptIntegrityCheck}>Integrity</button>
    </>
  );
}

export default App;
