import { useContext, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../Dialog";
import ProfileHeader from "../ProfileHeader";

const Login = () => {
  const {
    _sqlProfile,
    _promptSQLProfile,
    setSQLProfile,
    promptSQLProfileSetup,
    promptErrorDialog,
  } = useContext(appContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  // Initialize state with an object containing properties for each form input
  const [formData, setFormData] = useState({
    host: "minimysql",
    database: "archivedb",
    user: "archiveuser",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding property in the state object
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Access form data in the state object (formData)
    (window as any).MDS.cmd(
      `mysqlcoins action:info host:${formData.host} database:${formData.database} user:${formData.user} password:${formData.password}`,
      (response: any) => {
        console.log(response);
        const { pending, status, error } = response;
        if (pending) {
          setLoading(false);

          return setStep(2);
        }

        if (!status && !pending) {
          setLoading(false);

          return promptErrorDialog(error as string);
        }

        setLoading(false);
        setSQLProfile({
          database: formData.database,
          host: formData.host,
          password: formData.password,
          user: formData.user,
        });
        return setStep(1);
      }
    );
    // You can perform further actions, such as sending data to a server
  };

  if (!_promptSQLProfile) {
    return null;
  }

  return (
    <Dialog>
      <div className="h-full grid items-center">
        <div className="bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4 dark:bg-black text-left grid grid-cols-1 grid-rows-[auto_1fr]">
          <div className="grid grid-cols-[1fr_auto] items-center">
            <h1 className="text-lg text-black dark:text-white font-bold">
              {step === 0 ? "Setup MySQL Profile" : "Profile Setup!"}
            </h1>
            <a
              href="https://docs.minima.global/docs/runanode/archivenodes/"
              target="_blank"
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
                <path
                  d="M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                  strokeWidth="0"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
          {step === 0 && (
            <>
              <p className="text-sm mt-4">
                Login to your Archive Database MySQL Profile to interact with
                your archive data.
              </p>
              <div className="mt-4">
                <form className="grid gap-1" onSubmit={handleSubmit}>
                  <label className="grid">
                    <span className="mb-1 font-bold">Host</span>
                    <input
                      className="bg-slate-200 text-black p-2 rounded-lg"
                      placeholder="Enter host"
                      name="host"
                      onChange={handleInputChange}
                      value={formData.host}
                    />
                  </label>
                  <label className="grid">
                    <span className="mb-1 font-bold">Database</span>
                    <input
                      className="bg-slate-200 text-black p-2 rounded-lg"
                      placeholder="Enter db name"
                      name="database"
                      onChange={handleInputChange}
                      value={formData.database}
                    />
                  </label>
                  <label className="grid">
                    <span className="mb-1 font-bold">User</span>
                    <input
                      className="bg-slate-200 text-black p-2 rounded-lg"
                      placeholder="Enter username"
                      name="user"
                      onChange={handleInputChange}
                      value={formData.user}
                    />
                  </label>
                  <label className="grid">
                    <span className="mb-1 font-bold">Password</span>
                    <input
                      className="bg-slate-200 text-black p-2 rounded-lg"
                      type={passwordVisibility ? "text" : "password"}
                      placeholder="Enter password"
                      name="password"
                      onChange={handleInputChange}
                      value={formData.password}
                    />
                  </label>

                  <button className="mt-3 w-full bg-black text-white font-bold">
                    {!_sqlProfile ? "Set" : "Change"}
                  </button>
                  {_sqlProfile && (
                    <button
                      onClick={promptSQLProfileSetup}
                      className="mt-1 w-full"
                    >
                      Dismiss
                    </button>
                  )}
                </form>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="mt-4 bg-white dark:bg-black dark:text-slate-300">
                <p className="mb-2">
                  You can change your profile by clicking on
                </p>
                <span>
                  <ProfileHeader readOnly />
                </span>
                <p className="mt-2">on your header section on the dashboard.</p>
              </div>

              <button
                className="mt-4 w-full bg-teal-500"
                onClick={() => {
                  promptSQLProfileSetup();
                  setStep(0);
                }}
              >
                Go to dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Login;
