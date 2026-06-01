import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Wrapped } from "../../types/wrapped-type";

type InitialWrappedState = {
    userWrapped: Wrapped[];
}

export const wrappedSlice = createSlice({
    name: 'wrapped',
    initialState: {
        userWrapped: []
    } as InitialWrappedState,
    reducers: {
        setUserWrapped(state, action: PayloadAction<Wrapped[]>) {
            state.userWrapped = action.payload;
        },
    }
});

export const { setUserWrapped } = wrappedSlice.actions;
export default wrappedSlice.reducer;