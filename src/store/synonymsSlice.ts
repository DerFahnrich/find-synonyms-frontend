import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../constants";
import { ICreatedSynonyms, IError, ISynonyms, ISynonymsSlice, IWordNode } from "../interfaces";
import { RootState } from "./store";

const initialState: ISynonymsSlice = {
  status: Status.IDLE,
};

export const fetchWords = createAsyncThunk("synonyms/fetchWords", async (searchTerm: string) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_WORD_URL}/?s=${searchTerm}`);
  return (await response.json()) as string[];
});

export const fetchSynonyms = createAsyncThunk(
  "synonyms/fetchSynonyms",
  async (word: string, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_WORD_URL}/${word}`);

    if (response.ok) {
      const synonyms = (await response.json()) as ISynonyms;
      return synonyms;
    }

    const error = (await response.json()) as IError;
    return rejectWithValue(error);
  }
);

export const addSynonyms = createAsyncThunk(
  "synonyms/addSynonyms",
  async (body: IWordNode, { rejectWithValue }) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_API_WORD_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const result = (await response.json()) as ICreatedSynonyms;
      return result;
    }

    const error = (await response.json()) as IError;
    return rejectWithValue(error);
  }
);

const synonymsSlice = createSlice({
  name: "synonyms",
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
    clearCreatedSynonyms: (state) => {
      state.createdSynonyms = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWords.fulfilled, (state, action) => {
      state.words = action.payload;
    });
    builder.addCase(fetchSynonyms.pending, (state) => {
      state.error = undefined;
      state.synonyms = undefined;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchSynonyms.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.synonyms = action.payload;
    });
    builder.addCase(fetchSynonyms.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload as IError;
    });
    builder.addCase(addSynonyms.pending, (state) => {
      state.error = undefined;
      state.createdSynonyms = undefined;
      state.status = Status.LOADING;
    });
    builder.addCase(addSynonyms.fulfilled, (state, action) => {
      state.status = Status.IDLE;
      state.createdSynonyms = action.payload;
    });
    builder.addCase(addSynonyms.rejected, (state, action) => {
      state.status = Status.IDLE;
      state.error = action.payload as IError;
    });
  },
});

export const { updateStatus, clearError, clearCreatedSynonyms } = synonymsSlice.actions;

export const selectCreatedSynonyms = (state: RootState) => state.synonyms.createdSynonyms;
export const selectError = (state: RootState) => state.synonyms.error;
export const selectStatus = (state: RootState) => state.synonyms.status;
export const selectSynonyms = (state: RootState) => state.synonyms.synonyms;
export const selectWords = (state: RootState) => state.synonyms.words;

export default synonymsSlice.reducer;
