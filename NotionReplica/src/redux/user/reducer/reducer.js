const DEFAULT_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  errorLogin: null,
  errorRegister: null,
};

export default function userReducer(state = DEFAULT_STATE, { type, payload }) {
  switch (type) {
    case "USER/LOGIN/START":
      return { ...state, loading: true, errorLogin: null };
    case "USER/REGISTER/START":
      return { ...state, loading: true, errorRegister: null };
    case "USER/LOGIN/SUCCESS":
      return { ...state, loading: false, user: payload, errorLogin: null };
    case "USER/REGISTER/SUCCESS":
      return { ...state, loading: false, user: payload, errorRegister: null };
    case "USER/LOGIN/ERROR":
      return { ...state, loading: false, errorLogin: payload };
    case "USER/REGISTER/ERROR":
      return { ...state, loading: false, errorRegister: payload };
    case "USER/LOGOUT":
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
}
