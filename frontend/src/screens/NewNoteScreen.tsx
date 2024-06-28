//bootstrap
import { Container } from "react-bootstrap";
//rrd
import { useOutletContext } from "react-router-dom";
//datatypes
//import { OutletContext } from "../datatypes/datatypes";
import { OutletContextDb } from "../datatypes/datatypesDb";
//components
import NoteForm from "../components/NoteForm";

const NewNoteScreen = () => {
  //*Retrieve props
  const {} = useOutletContext<OutletContextDb>();

  return (
    <Container>
      <h1 className="text-center mt-2">New Note</h1>
      <NoteForm action="new" />
    </Container>
  );
};

export default NewNoteScreen;
