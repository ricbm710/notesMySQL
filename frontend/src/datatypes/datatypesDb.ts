export interface NoteDb {
  id: string;
  title: string;
  body: string;
  date_formatted: string;
  user_owner: string;
}
//*Outlet Context
export interface OutletContextDb {
  notes: NoteDb[];
  setNotes: React.Dispatch<React.SetStateAction<NoteDb[]>>;
  currentNote: NoteDb;
  setCurrentNote: React.Dispatch<React.SetStateAction<NoteDb>>;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

//*User
export interface User {
  name: string;
}
