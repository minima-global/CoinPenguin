import { useContext } from "react";
import { appContext } from "../../AppContext";

const ProfileHeader = () => {
  const { _sqlProfile, promptSQLProfileSetup } = useContext(appContext);

  return (
    <>
      {!_sqlProfile ? (
        <button onClick={promptSQLProfileSetup}>Set</button>
      ) : (
        <div onClick={promptSQLProfileSetup}>
          {_sqlProfile && (
            <div className="flex  hover:outline-teal-500 outline px-2 py-1  gap-1 hover:bg-opacity-50 hover:cursor-pointer">
              <div>
                <h3 className="text-inherit dark:text-teal-500 font-semibold text-sm">
                  {_sqlProfile.user}
                </h3>
                <p className="text-[9px] dark:text-slate-300">
                  Click to change
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileHeader;
