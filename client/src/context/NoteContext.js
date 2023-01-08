import { createContext, useReducer } from "react";

export const NoteContext = createContext();

export const noteReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "FILTER_NOTES":
      const query = action.payload;
      if (!query) {
        return state;
      }
      return {
        notes: state.notes.filter(
          (note) =>
            note.body.toLowerCase().includes(query.toLowerCase()) ||
            note.title.toLowerCase().includes(query.toLowerCase())
        ),
      };
    case "CREATE_NOTE":
      return {
        notes: [action.payload, ...state.notes],
      };
    case "UPDATE_NOTE":
      const updatedNote = action.payload;
      const updatedNotes = state.notes.map((note) => {
        if (note._id === updatedNote._id) {
          return updatedNote;
        }
        return note;
      });
      return {
        ...state,
        notes: updatedNotes,
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const NoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, {
    notes: null,
  });

  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};
