const CommandKay = ({ pulse }: any) => {
  return (
    <>
      <span
        className={`shadow-sm py-[0.5px] shadow-teal-500 ml-2 ${
          pulse ? "animate-pulse" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10" />
        </svg>
      </span>
      <span
        className={`shadow-sm py-[0.5px] shadow-teal-500 ml-2 ${
          pulse ? "animate-pulse" : ""
        }`}
      >
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
          <path d="M7 4l0 16" />
          <path d="M7 12h2l8 -8" />
          <path d="M9 12l8 8" />
        </svg>
      </span>
    </>
  );
};

export default CommandKay;
