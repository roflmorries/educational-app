import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../store/features/currentUserSlice";

export default function AccountInfo() {

  const user = useSelector(state => state.currentUser);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  }

  return (
    <div>
      <strong>Hi, {user.login}</strong>
      <Button color="danger" variant="solid" onClick={logout}>Sign out</Button>
    </div>
  )
}