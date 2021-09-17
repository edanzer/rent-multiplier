import { createSlice, PayloadAction} from "@reduxjs/toolkit"

interface ResultsState {
    value: string[]
}

interface Location {
    id: number,
    location: string,
    averageHomeValue: string,
    averageRent: string,
    grossRentMultiplier: string
}

const initialState: ResultsState = {
    value: []
}

export const resultsSlice = createSlice({
    name: "results",
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        }
    }
});

// Export action creators (created for you by toolkit) like this
export const { addLocation } = resultsSlice.actions

// Export reducer like this
export default resultsSlice.reducer;