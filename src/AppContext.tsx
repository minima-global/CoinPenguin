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
  const [_dataResults, setDataResults] = useState(null);
  const [_error, setError] = useState<string | false>(false);
  const [_coinsInfo, setCoinsInfo] = useState(null);
  const [_currentBlock, setCurrentBlock] = useState(null);
  const [_sqlProfile, setSQLProfile] = useState<{
    host: "";
    database: "";
    password: "";
    user: "";
  } | null>(null);
  const [_promptReadMode, setPromptReadMode] = useState(false);
  const [_promptErrorDialog, setPromptErrorDialog] = useState(false);
  const [_promptPendingDialog, setPromptPendingDialog] = useState(false);
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

          (window as any).MDS.cmd(`checkmode`, function (response: any) {
            console.log(response);
            if (response.status) {
              const readMode = response.response.mode === "READ";

              if (readMode) {
                promptReadMode();
              }
            }
          });

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

  const handleIntegrityCheck = (): Promise<void> => {
    setArchiveInfo(null);

    return new Promise((resolve, reject) => {
      (window as any).MDS.cmd(
        `mysql action:integrity host:${_sqlProfile!.host} database:${
          _sqlProfile!.database
        } user:${_sqlProfile!.user} password:${_sqlProfile!.password}`,
        (response: any) => {
          const { pending, status, error } = response;
          if (pending) {
            promptPendingDialog();
            resolve();
          }

          if (!status && !pending) {
            reject(error as string);
          }

          setArchiveInfo(response.response);
          resolve();
        }
      );
    });
  };

  const getTopBlock = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      (window as any).MDS.cmd(`block`, (response: any) => {
        const { pending, status, error } = response;

        if (!status && !pending) {
          reject(error as string);
        }

        setCurrentBlock(response.response.block);
        resolve();
      });
    });
  };

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

  const promptErrorDialog = (message: string) => {
    setPromptErrorDialog((prevState) => !prevState);
    setError((prevState) => (typeof prevState === "string" ? message : false));
  };

  const promptPendingDialog = () => {
    setPromptPendingDialog((prevState) => !prevState);
  };

  const promptReadMode = () => {
    setPromptReadMode(true);
  };

  return (
    <appContext.Provider
      value={{
        _promptReadMode,
        setPromptReadMode,

        _promptArchiveInfo,
        promptArchiveInfo,

        _promptSyncBlocks,
        promptSyncBlocks,

        _promptIntegrityCheck,
        promptIntegrityCheck,

        _promptSQLProfile,
        promptSQLProfileSetup,

        _error,
        _promptErrorDialog,
        promptErrorDialog,

        _promptPendingDialog,
        promptPendingDialog,

        _archiveInfo,
        setArchiveInfo,

        _sqlProfile,
        setSQLProfile,

        _dataResults,
        setDataResults,

        handleIntegrityCheck,

        _currentBlock,
        getTopBlock,

        _logs,
        setLogs,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
