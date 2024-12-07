// import React, { createContext, useEffect, useState } from "react";
// export const UserContext = createContext(null);
// import { useSelector, useDispatch } from "react-redux";
// import {fetchUserById} from '../redux/user/actions/actions'
// function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const dispatch = useDispatch();
//   const { users } = useSelector((store) => store)
  
//   useEffect(() => {
//     const fetchUser = async () => {
//       const id = localStorage.getItem("userId");
//       if (id) {
//         try {
//           dispatch(fetchUserById(id))
//           setUser(user);
//         } catch (err) {
//           console.error("Error fetching user", err);
//         }
//       }

//       setLoading(false);
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (user?.id) {
//       localStorage.setItem("userId", user.id);
//     }
//   }, [user?.id]);

//   return <UserContext.Provider value={{ user, onChange: setUser, loading }}>{children}</UserContext.Provider>;
// }

// export default UserContextProvider;
