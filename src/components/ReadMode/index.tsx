import { useContext } from "react";
import { appContext } from "../../AppContext";

import { useSpring, animated } from "react-spring";

const ReadModeDialog = () => {
  const { _promptReadMode } = useContext(appContext);

  const props = useSpring({
    opacity: _promptReadMode ? 1 : 0,
    transform: _promptReadMode ? "translateY(0)" : "translateY(-50px)",
    from: {
      opacity: 0,
      transform: "translateY(-50px)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
  });

  if (!_promptReadMode) {
    return null;
  }

  return (
    <>
      <animated.div
        style={props}
        className="absolute left-0 right-0 top-0 bottom-0 mx-auto z-[35]"
      >
        <div className="absolute left-0 right-0 bottom-0 top-0 z-[36] backdrop-blur-sm" />
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 dark:text-slate-300 text-center bg-teal-400 py-3 px-1 z-[37] relative w-full md:max-w-md md:mx-auto shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-braille mx-auto transform mb-1"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
            <path d="M19 16h-12a2 2 0 0 0 -2 2" />
            <path d="M9 8h6" />
          </svg>
          <h3 className="font-bold">Your app is in read mode only.</h3>
          <p>Change it to write mode for better usage.</p>
        </div>
      </animated.div>
    </>
  );
};

export default ReadModeDialog;
