import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  avatar: "",
  phone: "",
  token: "",
  role: "",
  student: {},
  teacher: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.address = action.payload.address;
      state.avatar = action.payload.avatar;
      state.phone = action.payload.phone;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.student = action.payload.student;
      state.teacher = action.payload.teacher;
    },
    logout: (state, action) => {
      state.userName = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.address = "";
      state.avatar = "";
      state.phone = "";
      state.token = "";
      state.role = "";
      state.student = {};
      state.teacher = {};
    },
    addCart: (state, action) => {
      state.student.cart.push(action.payload.course._id);
      state.student.cartTotal = state.student.cartTotal + action.payload.price;
    },
    removeCart: (state, action) => {
      state.student.cart = state.student.cart.filter(
        (course) => course != action.payload.course
      );
      state.student.cartTotal = state.student.cartTotal - action.payload.price;
    },
    emptyCart: (state, action) => {
      state.student.cart = [];
      state.student.cartTotal = 0;
    },
    addToWishlist: (state, action) => {
      state.student.wishlist.push(action.payload.course._id);
    },
    removeFromWishlist: (state, action) => {
      state.student.wishlist = state.student.wishlist.filter(
        (course) => course != action.payload.course
      );
    },
    updateStudent: (state, action) => {
      state.student = action.payload;
    },
    updateTeacher: (state, action) => {
      state.teacher = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  logout,
  addCart,
  removeCart,
  emptyCart,
  addToWishlist,
  removeFromWishlist,
  updateStudent,
  updateTeacher,
} = userSlice.actions;

export default userSlice.reducer;
