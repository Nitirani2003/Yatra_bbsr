import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //it modifies states to a diff state for a specific action
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setListings: (state, action) => {
            state.listings = action.payload.listings
        },
        setWishList: (state, action) => {
            state.user.wishList = action.payload
        }
    }

})
export const { setListings, setWishList } = userSlice.actions
export const { setLogout } = userSlice.actions
export const { setLogin } = userSlice.actions
export default userSlice.reducer