import { Note } from "../datatypes/datatypes";
const storageKey: string = "notes2";

//get all notes
export const getNotes = (): Note[] => {
  const notes = localStorage.getItem(storageKey);
  return notes ? JSON.parse(notes) : [];
};

//generate id
export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

//save updated list of notes
export const saveUpdatedNotes = (updatedNotes: Note[]) => {
  localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
};

//remove note
export const removeNote = (id: string) => {
  const notes = localStorage.getItem(storageKey);
  if (!notes) {
    return null;
  }

  const jsonNotes: Note[] = JSON.parse(notes);

  const updatedNotes = jsonNotes.filter((note) => note.id !== id);

  const jsonUpdatedNotes = JSON.stringify(updatedNotes);

  localStorage.setItem(storageKey, jsonUpdatedNotes);
};

//get note by id
export const getNoteById = (id: string): Note | null => {
  // Retrieve notes from LocalStorage
  const storedNotes = localStorage.getItem(storageKey);

  if (storedNotes) {
    // Parse stored JSON into an array of Note objects
    const parsedNotes: Note[] = JSON.parse(storedNotes);

    // Find the note with the given id
    const note = parsedNotes.find((note) => note.id === id);

    return note || null; // Return the found note or null if not found
  }

  return null; // Return null if no notes are stored
};

//Initialize New Note
export const initCurrentNote = () => ({
  id: generateRandomId(),
  title: "",
  body: "",
  date: new Date(),
  formattedDate: formatDate(new Date()),
});

//Date Formatter
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} at ${hours}:${minutes}`;
}

//Title Duplicate Finder
export const duplicateFinder = (notes: Note[], title: string): boolean => {
  const duplicate = notes.find((note) => note.title === title);
  return duplicate ? true : false;
};
