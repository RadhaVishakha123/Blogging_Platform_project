import { createContext } from "react";
import { useState, useEffect } from "react";
import type { User, UserContextInterface } from "../Helper/Type";
export const UserContext = createContext<UserContextInterface>({
  currentLoggedInUserData: null,
  setCurrentLoggedInUserData: () => {},
});
export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [currentLoggedInUserData, setCurrentLoggedInUserData] =
    useState<User | null>(() => {
      return (
        JSON.parse(localStorage.getItem("currentLoggedInUserData") ?? "null") ||
        null
      );
    });
  
  useEffect(() => {
    localStorage.setItem(
      "currentLoggedInUserData",
      JSON.stringify(currentLoggedInUserData)
    );
  }, [currentLoggedInUserData]);

  return (
    <>
      <UserContext.Provider
        value={{
          currentLoggedInUserData,
          setCurrentLoggedInUserData,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
}
