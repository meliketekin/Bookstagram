import {createSlice} from '@reduxjs/toolkit';
import {authApi} from '../../Service/AuthService';
export type IFallowing = {
  readonly userId: string;
  readonly img: string;
  readonly name: string;
};
export type IUser = {
  id: string;
  name: string;
  lastName: string;
  fallowers: string[];
  fallowing: string[];
  email: string;
  birth: string;
  books: string[];
  gender: string;
  username: string;
  imageUrl: string;
} | null;
interface UserState {
  user: IUser;
  isInBookTab: boolean;
}
const initialState: UserState = {
  user: null,
  isInBookTab: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, {payload}) => {
      state.user = payload;
    },
    setCurrentTab: (state, {payload}) => {
      state.isInBookTab = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.getUserDataById.matchFulfilled,
      (state, {payload}) => {
        state.user = payload;
      },
    );
  },
});
export const {setUserData, setCurrentTab} = userSlice.actions;
export default userSlice.reducer;
