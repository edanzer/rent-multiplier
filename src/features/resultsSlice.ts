import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { LocationCard, Results} from "../types/types";

const initialState: Results = {
    value: []
}

export const resultsSlice = createSlice({
    name: "results",
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<LocationCard>) => {
            state.value.push(action.payload);
        },
        removeLocation: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(item => item.id !== action.payload);
        }
    }
});

export const { addLocation, removeLocation } = resultsSlice.actions;
export default resultsSlice.reducer;