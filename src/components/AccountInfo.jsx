import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../store/features/currentUserSlice";
import {StyledButton, Container} from './AccountInfo.style'

export default function AccountInfo() {

  const user = useSelector(state => state.currentUser);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signOut());
  }


  return (
    <Container>
      <strong>Hi, {user.login}</strong>
      <span>|</span>
      <StyledButton color="danger" variant="solid" onClick={logout}>Sign out</StyledButton>
    </Container>
  )
}