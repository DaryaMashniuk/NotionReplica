import API from "../../../utils/API";
import bcrypt from "bcryptjs";


export const loginById = (id) => async (dispatch) => {
    dispatch({ type: "USER/LOGIN/START" });
    try {
      const user = await API.fetchUserById(id);
      console.log(user)
      if (!user) throw new Error("User not found");
      dispatch({ type: "USER/LOGIN/SUCCESS", payload: user });
      
    } catch (error) {
      dispatch({ type: "USER/LOGIN/ERROR", payload: error.message });
      
    }
  };
  


  export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: "USER/LOGIN/START" });
    try {
      const user = await API.fetchUserByEmail(email);
      if (!user) throw new Error("Пользователь не найден");
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error("Неверный пароль");
  
      dispatch({ type: "USER/LOGIN/SUCCESS", payload: user });
      localStorage.setItem("userId", user.id);
      return true;
    } catch (error) {
      dispatch({ type: "USER/LOGIN/ERROR", payload: error.message });
      return false;
    }
  };

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem(localStorage.userId); 
    dispatch({ type: "USER/LOGOUT" });
  };

  export const registerUser = (user) => async (dispatch) => {
    dispatch({ type: "USER/REGISTER/START" });
    try {
      const users = await API.fetchUsers();
      if (users.some((u) => u.email === user.email)) {
        throw new Error("Email уже используется");
      }
  
      await API.createUser(user);
  
      dispatch({ type: "USER/REGISTER/SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "USER/REGISTER/ERROR", payload: error.message });
    }
  };
