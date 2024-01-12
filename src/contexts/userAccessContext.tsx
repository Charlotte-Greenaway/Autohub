"use client"
import { createContext, useState } from "react";

// Define the type for the context value
type UserContextValue = {
  userAccess: string | null;
  setUserAccess: (access: string) => void;
};

// Provide an initial value that matches the type
export const UserContext = createContext<UserContextValue>({ userAccess: null, setUserAccess: () => {} });

function Context({ children }: any) {
  const [userAccess, setUserAccess] = useState<string|null>(null);

  return (
    <UserContext.Provider value={{ userAccess, setUserAccess }}>
      {children}
    </UserContext.Provider>
  );
}

export default Context;
