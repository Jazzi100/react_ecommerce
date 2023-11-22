import React, { createContext, useState, useEffect } from "react";

const CurrentUserContext = createContext();

const CurrentUserState = (props) => {
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current-user"));
    if (user) setCurrentUser(user);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserState, CurrentUserContext };
