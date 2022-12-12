import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = (s) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

export const addCartToDB = createAsyncThunk(
  "user/addCartToDB",
  async ({ userId, productId }) => {
    const response = await fetch("http://localhost:3001/carts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ISBN: productId,
        userId,
      }),
    });
    return await response.json();
  }
);

export const getCartFromDB = createAsyncThunk(
  "user/getCartFromDB",
  async (userId) => {
    const response = await fetch(
      "http://localhost:3001/carts?userId=" + userId
    );
    return await response.json();
  }
);

export const deleteCartFromDB = createAsyncThunk(
  "user/deleteCartFromDB",
  async ({ userId, productId, remove }) => {
    const response = await fetch("http://localhost:3001/carts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ISBN: productId,
        userId,
        remove,
      }),
    });
    return await response.json();
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null,
    carts: [],
    showCart: false,
    products: []
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    clearInfo: (state) => {
      state.info = null;
      state.carts = [];
    },
    setCart: (state, action) => {
      state.carts = action.payload;
    },
    updateShowCart: (state, action) => {
      state.showCart = action.payload; //true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartToDB.fulfilled, (state, action) => {});
    builder.addCase(getCartFromDB.fulfilled, (state, action) => {
      state.carts = action.payload;
    });
    builder.addCase(deleteCartFromDB.fulfilled, (state, action) => {});
  },
});

export const { setInfo, clearInfo, updateShowCart, setCart } =
  userSlice.actions;

export default userSlice.reducer;
