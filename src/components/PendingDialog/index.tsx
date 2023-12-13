import { useContext } from "react";
import { appContext } from "../../AppContext";

import { useSpring, animated } from "react-spring";

const PendingDialog = () => {
  const { _promptPendingDialog, promptPendingDialog } = useContext(appContext);

  const props = useSpring({
    opacity: _promptPendingDialog ? 1 : 0,
    transform: _promptPendingDialog ? "translateY(0)" : "translateY(-50px)",
    from: {
      opacity: 0,
      transform: "translateY(-50px)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
  });

  if (!_promptPendingDialog) {
    return null;
  }

  return (
    <>
      <animated.div
        style={props}
        onClick={promptPendingDialog}
        className="z-[26] absolute left-0 right-0 top-0 bottom-0 max-w-sm md:max-w-md mx-auto"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 dark:text-slate-300 text-center  bg-teal-400 py-3 px-1"
        >
          <h3 className="font-bold">Your action is now pending!</h3>
          <p>You need to accept this action in the Pending MiniDapp.</p>
        </div>
      </animated.div>
    </>
  );
};

export default PendingDialog;
