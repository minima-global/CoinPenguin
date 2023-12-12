import { useContext, useState } from "react";
import { appContext } from "../../AppContext";
import Dialog from "../Dialog";

const ArchiveInfo = () => {
  const {
    _promptArchiveInfo,
    promptArchiveInfo,
    _archiveInfo,
    setArchiveInfo,
  } = useContext(appContext);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<false | string>(false);
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
    // Access form data in the state object (formData)
    (window as any).MDS.cmd(
      `mysql action:info host:${formData.host} database:${formData.database} user:${formData.user} password:${formData.password}`,
      (response: any) => {
        console.log(response);
        const { pending, status, error } = response;
        if (pending) {
          return setStep(2);
        }

        if (!status && !pending) {
          return setError(error as string);
        }

        setArchiveInfo(response.response);
        return setStep(1);
      }
    );
    // You can perform further actions, such as sending data to a server
  };

  if (!_promptArchiveInfo) {
    return null;
  }

  return (
    <Dialog dismiss={promptArchiveInfo}>
      <div className="h-full grid items-center">
        <div className="bg-white rounded-lg mx-4 md:mx-0 min-h-[40vh] p-4 dark:bg-black text-left">
          <div className="grid grid-cols-[1fr_auto] items-center">
            <h1 className="text-lg text-black dark:text-white font-bold">
              Archive Information
            </h1>
            <a
              href="https://docs.minima.global/docs/runanode/archivenodes#update-mysql"
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
                Running{" "}
                <code className="bg-teal-500 text-[14px] px-2 rounded-full dark:text-black text-white">
                  mysql action: info
                </code>{" "}
                with your login details will get you the current status.
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

                  <button className="mt-3 w-full">Submit</button>
                  <button
                    className="mt-2 w-full mx-auto"
                    onClick={promptArchiveInfo}
                  >
                    Dismiss
                  </button>
                </form>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="max-w-md mt-4 mx-auto bg-white dark:bg-black dark:text-slate-300">
                <table className="w-full border">
                  <thead>
                    <tr className="font-bold">
                      <th className="border p-2"></th>
                      <th className="border p-2">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-archive inline"
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
                            <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                            <path d="M10 12l4 0" />
                          </svg>
                          Archive
                        </div>
                      </th>
                      <th className="border p-2">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-database"
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
                            <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" />
                            <path d="M4 6v6a8 3 0 0 0 16 0v-6" />
                            <path d="M4 12v6a8 3 0 0 0 16 0v-6" />
                          </svg>
                          MySQL
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold">Start</td>
                      <td className="border p-2">
                        {_archiveInfo.archive.archivestart}
                      </td>
                      <td className="border p-2">
                        {_archiveInfo.mysql.mysqlstart}
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold">End</td>
                      <td className="border p-2">
                        {_archiveInfo.archive.archiveend}
                      </td>
                      <td className="border p-2">
                        {_archiveInfo.mysql.mysqlend}
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold">Total</td>
                      <td className="border p-2">
                        {_archiveInfo.archive.archivetotal}
                      </td>
                      <td className="border p-2">
                        {_archiveInfo.mysql.mysqltotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                // TODO
                onClick={() => console.log("Open security")}
                className="max-w-md mx-auto mt-4 bg-black dark:bg-white text-black dark:text-slate-300 flex justify-between items-center px-4 py-4"
              >
                <div className="flex items-center gap-1">
                  <svg
                    className="fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                  </svg>
                  <h6 className="text-white dark:text-black font-bold">
                    Auto-backup
                  </h6>
                </div>
                <p>
                  {_archiveInfo.autobackup ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="green"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M9 12l2 2l4 -4" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="red"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" />
                      <path d="M9 8l6 8" />
                      <path d="M15 8l-6 8" />
                    </svg>
                  )}
                </p>
              </div>

              <button
                className="mt-4 w-full mx-auto"
                onClick={() => {
                  setArchiveInfo(null);
                  setStep(0);
                }}
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ArchiveInfo;
