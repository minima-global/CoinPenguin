import {
  createContext,
  useRef,
  useEffect,
  ReactElement,
  useState,
} from "react";

export const appContext = createContext({} as any);

interface IProps {
  children: ReactElement;
}
const AppProvider = ({ children }: IProps) => {
  const loaded = useRef(false);

  /** Minima stuff */
  const [_logs, setLogs] = useState<string[]>([]);
  const [_sqlProfile, setSQLProfile] = useState(null);
  const [_promptArchiveInfo, setPromptArchiveInfo] = useState(false);
  const [_promptSyncBlocks, setPromptSyncBlocks] = useState(false);
  const [_promptIntegrityCheck, setPromptIntegrityCheck] = useState(false);
  const [_promptSQLProfile, setPromptSQLProfile] = useState(false);

  const [_archiveInfo, setArchiveInfo] = useState(null);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      (window as any).MDS.init((msg: any) => {
        if (msg.event === "inited") {
          // do something Minim-y

          if (!_sqlProfile) {
            promptSQLProfileSetup();
          }
        }

        if (msg.event === "MINIMALOG") {
          const log = msg.data.message;
          setLogs((prevState) => [...prevState, log]);
        }
      });
    }
  }, [loaded]);

  const promptArchiveInfo = () => {
    setPromptArchiveInfo((prevState) => !prevState);
  };

  const promptSyncBlocks = () => {
    setPromptSyncBlocks((prevState) => !prevState);
  };

  const promptIntegrityCheck = () => {
    setPromptIntegrityCheck((prevState) => !prevState);
  };

  const promptSQLProfileSetup = () => {
    setPromptSQLProfile((prevState) => !prevState);
  };

  return (
    <appContext.Provider
      value={{
        _promptArchiveInfo,
        promptArchiveInfo,

        _promptSyncBlocks,
        promptSyncBlocks,

        _promptIntegrityCheck,
        promptIntegrityCheck,

        _promptSQLProfile,
        promptSQLProfileSetup,

        _archiveInfo,
        setArchiveInfo,

        _sqlProfile,
        setSQLProfile,

        _logs,
        setLogs,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
