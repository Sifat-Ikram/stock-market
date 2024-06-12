import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Sidebar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="h-screen fixed top-20 w-20 border-r-2 border-primary">
      <div className="flex flex-col justify-start items-center gap-10 h-full py-5">
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full border-2 border-solid">
            <img
              alt=""
              src={
                user
                  ? user.photoURL
                  : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
            />
          </div>
        </div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group bg-primary text-white cursor-pointer transition-all"
          }
        >
          <div className="tooltip tooltip-right" data-tip="Home">
            <IoIosHome className="h-7 w-7 group-hover:text-white" />
          </div>
        </NavLink>

        {user && (
          <>
            <button className="bg-primary p-2 text-white rounded-2xl ">
              <div className="tooltip tooltip-right" data-tip="Sign Out">
                <VscSignOut
                  onClick={handleSignOut}
                  className="h-7 w-7 group-hover:text-white "
                />
              </div>
            </button>
          </>
        )}

        {!user && (
          <>
            <NavLink
              to="/signUp"
              className={({ isActive }) =>
                isActive
                  ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
                  : "p-2 rounded-2xl group bg-primary text-white cursor-pointer transition-all"
              }
            >
              <div className="tooltip tooltip-right" data-tip="SignUp">
                <BsFillPersonPlusFill className="h-7 w-7 group-hover:text-white " />
              </div>
            </NavLink>
            <NavLink
              to="/signIn"
              className={({ isActive }) =>
                isActive
                  ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
                  : "p-2 rounded-2xl group bg-primary text-white cursor-pointer transition-all"
              }
            >
              <div className="tooltip tooltip-right" data-tip="SignIn">
                <VscSignIn className="h-7 w-7 group-hover:text-white " />
              </div>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
