import { auth } from "./firebase";

export const getUser = () => auth.currentUser;
