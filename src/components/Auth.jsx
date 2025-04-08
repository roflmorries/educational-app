import { useSelector } from "react-redux";
import AccountInfo from "./AccountInfo";
import LoginForm from "./LoginForm";

export default function Auth() {
  const user = useSelector(state => state.currentUser);

  return (
    <>
      {user.isAuth ? <AccountInfo /> : <LoginForm />}
    </>
  )
}