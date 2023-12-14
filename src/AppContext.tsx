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
  const [_loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | false>(false);
  const [_updateCoins, setCoinsUpdate] = useState(null);
  const [_coinsInfo, setCoinsInfo] = useState(null);
  const [_currentBlock, setCurrentBlock] = useState(null);
  const [_sqlProfile, setSQLProfile] = useState<{
    host: "";
    database: "";
    password: "";
    user: "";
  } | null>(null);
  const [_promptCoinRetrieval, setPromptCoinRetrieval] = useState(false);
  const [_promptAddressList, setPromptAddressList] = useState(false);
  const [_promptReadMode, setPromptReadMode] = useState(false);
  const [_promptErrorDialog, setPromptErrorDialog] = useState(false);
  const [_promptCoinSearchWhere, setPromptCoinSearchWhere] = useState(false);
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

  const retrieveCoins = (maxcoins?: number, docker = false): Promise<void> => {
    return new Promise((resolve, reject) => {
      (window as any).MDS.cmd(
        `mysqlcoins action:update ${
          maxcoins ? `maxcoins:${maxcoins}` : ""
        } host:${_sqlProfile!.host} database:${_sqlProfile!.database} user:${
          _sqlProfile!.user
        } password:${_sqlProfile!.password} maxcoins:${maxcoins}`,
        (response: any) => {
          console.log(response);
          const { pending, status, error } = response;
          if (pending) {
            promptPendingDialog();
            resolve();
          }

          if (!status && !pending) {
            promptErrorDialog(error as string);
            reject();
          }

          setCoinsUpdate(response.response);
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

  const promptAddressList = () => {
    setPromptAddressList((prevState) => !prevState);
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

  const promptCoinRetrieval = () => {
    setPromptCoinRetrieval((prevState) => !prevState);
  };

  const promptCoinSearchWhere = () => {
    setPromptCoinSearchWhere((prevState) => !prevState);
  };

  const promptErrorDialog = (message: string) => {
    const clean = message.includes("java.lang.NumberFormatException:")
      ? message.split("java.lang.NumberFormatException:")[1]
      : message;

    setPromptErrorDialog((prevState) => !prevState);
    setError((prevState) => (typeof prevState !== "string" ? clean : false));
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

        _promptAddressList,
        promptAddressList,

        _promptCoinSearchWhere,
        promptCoinSearchWhere,

        _promptArchiveInfo,
        promptArchiveInfo,

        _promptSyncBlocks,
        promptSyncBlocks,

        _promptIntegrityCheck,
        promptIntegrityCheck,

        _promptSQLProfile,
        promptSQLProfileSetup,

        _promptCoinRetrieval,
        promptCoinRetrieval,

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

        _updateCoins,
        retrieveCoins,
        setCoinsUpdate,

        _loading,
        setLoading,

        _logs,
        setLogs,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
