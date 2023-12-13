import { useContext, useEffect } from "react";
import { appContext } from "../../AppContext";

import { useSpring, animated } from "react-spring";

const ErrorDialog = () => {
  const { _error, _promptErrorDialog, promptErrorDialog } =
    useContext(appContext);

  const props = useSpring({
    opacity: _promptErrorDialog ? 1 : 0,
    transform: _promptErrorDialog ? "translateY(0)" : "translateY(-50px)",
    from: {
      opacity: 0,
      transform: "translateY(-50px)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
  });

  if (!_promptErrorDialog) {
    return null;
  }

  return (
    <>
      <animated.div
        style={props}
        onClick={promptErrorDialog}
        className="z-[26] absolute left-0 right-0 top-0 bottom-0 max-w-sm md:max-w-md mx-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 dark:text-slate-300 text-center  bg-red-400 py-3 px-1"
        >
          <h3 className="font-bold">Hmm, something went wrong.</h3>
          {_error && <p>{_error}</p>}
        </div>
      </animated.div>
    </>
  );
};

export default ErrorDialog;
