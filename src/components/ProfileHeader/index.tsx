import { useContext } from "react";
import { appContext } from "../../AppContext";

interface IProps {
  readOnly?: boolean;
}
const ProfileHeader = ({ readOnly = false }: IProps) => {
  const { _sqlProfile, promptSQLProfileSetup } = useContext(appContext);

  return (
    <>
      {!_sqlProfile ? (
        <button onClick={promptSQLProfileSetup}>Set</button>
      ) : (
        <div
          className="text-center"
          onClick={readOnly ? null : promptSQLProfileSetup}
        >
          {_sqlProfile && (
            <div className="flex shadow-inner shadow-teal-500 outline-teal-500 outline px-2 py-1  gap-1 hover:bg-opacity-50 hover:cursor-pointer w-max">
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
