import { createSlice, PayloadAction} from "@reduxjs/toolkit"
import { LocationCard } from "../types/types";

interface ResultsState {
    value: LocationCard[]
}

const initialState: ResultsState = {
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
            state.value.filter((item) => item.id != action.payload);
        }
    }
});

// Export action creators (created for you by toolkit) like this
export const { addLocation, removeLocation } = resultsSlice.actions

// Export reducer like this
export default resultsSlice.reducer;