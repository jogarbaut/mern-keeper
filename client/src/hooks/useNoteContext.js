import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw Error(
      "useNoteContext must be used inside a NoteContextProvider"
    );
  }
  return context;
};
