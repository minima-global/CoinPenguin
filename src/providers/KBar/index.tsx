import { Action, KBarProvider } from "kbar";
import { ReactElement, useContext } from "react";
import { appContext } from "../../AppContext";

interface IProps {
  children: ReactElement;
}
const KBar = ({ children }: IProps) => {
  const { promptSyncBlocks } = useContext(appContext);
  const actions: Action[] = [
    {
      id: "coinseaarch",
      name: "Coin Address",
      shortcut: ["c"],
      keywords: "searching coins at address",
      perform: () => (window.location.pathname = "coinsearch"),
      subtitle:
        "Search for a simple or smart contract address where a coin would be locked in",
      icon: (
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
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      ),
    },
    {
      id: "query",
      name: "Full Query",
      shortcut: ["q"],
      keywords: "query coin database",
      perform: () => (window.location.pathname = "query"),
      subtitle: "Search for a coin by performing a query on the coin database",
      icon: (
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
          <path d="M8.5 13.5l-1.5 -1.5l1.5 -1.5" />
          <path d="M15.5 10.5l1.5 1.5l-1.5 1.5" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M13 9.5l-2 5.5" />
        </svg>
      ),
    },
    {
      id: "where",
      name: "Where Query",
      shortcut: ["q"],
      keywords: "search a coin where...",
      perform: () => (window.location.pathname = "where"),
      subtitle: "Search a coin where... (you can use multiple parameters)",
      icon: (
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
          <path d="M8 9h8" />
          <path d="M8 13h6" />
          <path d="M11.012 19.193l-3.012 1.807v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6" />
          <path d="M20 21l2 -2l-2 -2" />
          <path d="M17 17l-2 2l2 2" />
        </svg>
      ),
    },
    {
      id: "sync",
      name: "Sync Blocks",
      shortcut: ["s"],
      keywords: "sync blocks",
      perform: () => promptSyncBlocks(),
      subtitle: "Sync archive blocks with MySQL Archive Database",
      icon: (
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
          <path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5" />
          <path d="M18.37 7.16l0 .01" />
          <path d="M13 19.94l0 .01" />
          <path d="M16.84 18.37l0 .01" />
          <path d="M19.37 15.1l0 .01" />
          <path d="M19.94 11l0 .01" />
        </svg>
      ),
    },
    {
      id: "tutorial",
      name: "Tutorial",
      shortcut: ["t"],
      keywords: "view tutorial",
      perform: () => (window.location.pathname = "tutorial"),
      icon: (
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
          <path d="M16.69 7.44a6.973 6.973 0 0 0 -1.69 4.56c0 1.747 .64 3.345 1.699 4.571" />
          <path d="M2 9.504c7.715 8.647 14.75 10.265 20 2.498c-5.25 -7.761 -12.285 -6.142 -20 2.504" />
          <path d="M18 11v.01" />
          <path d="M11.5 10.5c-.667 1 -.667 2 0 3" />
        </svg>
      ),
    },
    {
      id: "settings",
      name: "Settings",
      shortcut: ["s"],
      keywords: "view settings",
      perform: () => (window.location.pathname = "settings"),
      icon: (
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
          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        </svg>
      ),
    },
  ];

  return <KBarProvider actions={actions}>{children}</KBarProvider>;
};

export default KBar;
