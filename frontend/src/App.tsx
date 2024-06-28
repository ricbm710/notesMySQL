import "bootstrap/dist/css/bootstrap.min.css";

//hooks
import { useEffect, useState } from "react";
//rrd
import { Outlet } from "react-router-dom";
//components
import NavBar from "./components/NavBar";
//datatypes
//import { Note, OutletContext } from "./datatypes/datatypes";
import { NoteDb, OutletContextDb, User } from "./datatypes/datatypesDb";
//utils
//import { getNotes } from "./utils/utils";
import { getNotesDb, getUser, initCurrentNote } from "./utils/utilsDB";

function App() {
  //*Get all notes when initializing
  const [notes, setNotes] = useState<NoteDb[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotesDb();
        setNotes(data);
      } catch (err) {
        console.log("error fetching data from MySQL db");
      }
    };

    fetchNotes();
    //console.log(notes);
  }, []);

  //*Set state for Current Note
  const [currentNote, setCurrentNote] = useState<NoteDb>(initCurrentNote());

  //*Set state for user
  const [currentUser, setCurrentUser] = useState<User>({ name: "" });

  useEffect(() => {
    const fetchUser = () => {
      const user = getUser();
      setCurrentUser(user === null ? { name: "" } : { name: user });
    };
    fetchUser();
  }, []);

  //*Set context for passing props to Outlet
  const contextValue: OutletContextDb = {
    notes,
    setNotes,
    currentNote,
    setCurrentNote,
    currentUser,
    setCurrentUser,
  };

  return (
    <>
      <NavBar />
      <Outlet context={contextValue} />
    </>
  );
}

export default App;
