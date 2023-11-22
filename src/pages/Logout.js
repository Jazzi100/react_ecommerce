import React from "react";
import { CurrentUserContext } from "../context/CurrentUserState";
const Logout = () => {
    const { logout } = useContext(CurrentUserContext);
    const u = useContext(CurrentUserContext);

}

export default Logout;