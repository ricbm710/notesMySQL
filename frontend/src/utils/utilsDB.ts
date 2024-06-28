import { NoteDb } from "../datatypes/datatypesDb";

//CRUD OPERATIONS
//Get All Notes
export const getNotesDb = async () => {
  try {
    const response = await fetch("http://localhost:3000/notes");
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch notes");
  }
};
//Create Note
export const createNoteDb = async (note: NoteDb) => {
  try {
    //console.log("Request Payload:", note); // Log the payload

    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    //console.log("Response:", response); // Log the response

    if (!response.ok) {
      const errorText = await response.text();
      //console.error("Error Response Text:", errorText); // Log error response text
      throw new Error("Failed to create note: " + errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    //console.error("Error:", error); // Log the caught error
    throw new Error("Failed to create note");
  }
};

//get note by id
export const getNoteByIdDb = async (id: string) => {
  try {
    const response = await fetch(`${"http://localhost:3000/notes"}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch note");
  }
};

// misc
//Date Formatter
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} at ${hours}:${minutes}`;
}

//Initialize New Note
export const initCurrentNote = () => ({
  id: generateRandomId(),
  title: "",
  body: "",
  date_formatted: formatDate(new Date()),
  user_owner: "default",
});

//generate id
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

//Title Duplicate Finder
export const duplicateFinder = (notes: NoteDb[], title: string): boolean => {
  const duplicate = notes.find((note) => note.title === title);
  return duplicate ? true : false;
};

//*Get user from LocalStorage
export const getUser = (): string | null => {
  const user = localStorage.getItem("user");
  return user;
};
//*Set user on LS
export const setUser = (user: string) => {
  localStorage.setItem("user", user);
};
