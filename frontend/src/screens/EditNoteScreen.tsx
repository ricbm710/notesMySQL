//rrd
import { useOutletContext } from "react-router-dom";
//datatypes
//import { OutletContext } from "../datatypes/datatypes";
import { OutletContextDb } from "../datatypes/datatypesDb";
//bootstrap
import { Container } from "react-bootstrap";
//components
import NoteForm from "../components/NoteForm";

const EditNoteScreen = () => {
  //*Retrieve props
  const {} = useOutletContext<OutletContextDb>();

  return (
    <Container>
      <h1 className="text-center mt-2">Editar Nota</h1>
      <NoteForm action="edit" />
    </Container>
  );
};

export default EditNoteScreen;
