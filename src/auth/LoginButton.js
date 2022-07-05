import { auth, provider, signInWithPopup } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogOutState,
  selectUserId,
} from "../sessiondata/userSlice";

export function LoginButton() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setActiveUser({
            id: result.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUserLogOutState());
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <button
      disabled={true}
      className="bg-purple-300 login page rounded"
      onClick={userId ? handleSignOut : handleSignIn}
    >
      {!userId ? "Sign In Disabled" : "Sign Me Out"}
    </button>
  );
}
