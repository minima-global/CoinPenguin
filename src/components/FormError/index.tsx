import { useSpring, animated } from "react-spring";

interface IProps {
  visible: boolean;
  message: string;
}
const FormError = ({ visible, message }: IProps) => {
  const props = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(-50px)",
    from: {
      opacity: 0,
      transform: "translateY(-50px)",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <>
      <animated.div style={props}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-4 dark:text-slate-300 text-left  bg-red-400 p-2"
        >
          {message && <p className="text-sm">{message}</p>}
        </div>
      </animated.div>
    </>
  );
};

export default FormError;
