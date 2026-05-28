import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserState } from '../../types/user-type';

interface InitialUserState {
    user: UserState | null;
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    } as InitialUserState,
    reducers: {
        setUser(state, action: PayloadAction<UserState | null>) {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;