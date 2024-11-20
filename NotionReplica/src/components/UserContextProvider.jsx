import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const id = localStorage.getItem("userId");

      if (id) {
        try {
          const response = await fetch(`http://localhost:5001/users?id=${id}`);
          const users = await response.json();
          const user = users[0];
          setUser(user);
        } catch (err) {
          console.error("Error fetching user", err);
        }
      }

      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
    }
  }, [user?.id]);

  return <UserContext.Provider value={{ user, onChange: setUser, loading }}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
