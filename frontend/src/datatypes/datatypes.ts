import { Dispatch } from "react";

//*Notes
export interface Note {
  id: string;
  title: string;
  body: string;
  date: Date;
  formattedDate: string;
}
//*Outlet Context
export interface OutletContext {
  notes: Note[];
  setNotes: Dispatch<React.SetStateAction<Note[]>>;
  currentNote: Note;
  setCurrentNote: Dispatch<React.SetStateAction<Note>>;
}
//*Form Props
export interface FormProps {
  action: string;
}

//*CustomAlert Props
export interface AlertProps {
  message: string;
  type: string; //"success" | "danger" | "warning" | "info";
  duration: number; // ms
}

//*Alert State
export interface AlertState {
  on: boolean;
  message: string;
  type: string;
}
