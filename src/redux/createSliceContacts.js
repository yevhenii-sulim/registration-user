import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialStates } from './initialState';
import { addContact, delContact, getContact } from './thunc';

const hendleGetContactThuncFulfilled = (state, { payload }) => {
  console.log(payload);
  return (state = payload);
};
const hendleAddContactThuncFulfilled = (state, { payload }) => {
  console.log(payload);
  return [payload, ...state];
};
const hendleThuncRejected = (state, { payload }) => {
  console.log(payload);
  return state;
};

const hendleDeleteContactThuncFulfilled = (state, { payload }) => {
  return state.filter(({ id }) => id !== payload.id);
};
export const contactSlise = createSlice({
  name: 'contacts',
  initialState: initialStates.contacts,
  extraReducers: builder => {
    builder
      .addCase(getContact.fulfilled, hendleGetContactThuncFulfilled)
      .addCase(addContact.fulfilled, hendleAddContactThuncFulfilled)
      .addCase(delContact.fulfilled, hendleDeleteContactThuncFulfilled)
      .addMatcher(
        isAnyOf(addContact, getContact, delContact),
        hendleThuncRejected
      );
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStates.filter,
  reducers: {
    filtered: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { addNewContact, deleteContact } = contactSlise.actions;
export const { filtered } = filterSlice.actions;