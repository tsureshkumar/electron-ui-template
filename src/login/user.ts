import { User } from "./types";

import { useSelector } from "react-redux";

export function getUser(): User {
  const auth = useSelector(st => st.auth);
  return auth.user;
}

export function isAuthenticated(): boolean {
  const auth = useSelector(st => st.auth);
  return auth.authenticated;
}
