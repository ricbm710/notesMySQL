//rrd
import { FormProps, useOutletContext } from "react-router-dom";
//datatypes
import { AlertState } from "../datatypes/datatypes";
import { OutletContextDb } from "../datatypes/datatypesDb";
//bootstrap
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
//components
import CustomAlert from "./CustomAlert";
import {
  createNoteDb,
  duplicateFinder,
  formatDate,
  initCurrentNote,
} from "../utils/utilsDB";

const NoteForm = ({ action }: FormProps) => {
  //*Retrieve Context Props
  const { notes, setNotes, currentNote, setCurrentNote, currentUser } =
    useOutletContext<OutletContextDb>();

  //*For Initializing the NoteForm Component
  useEffect(() => {
    if (action === "new") {
      setCurrentNote(initCurrentNote());
    }
  }, []);

  //*is Id duplicate?
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  //*onChange input handler
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //*Checks if title input already exists in Local Storage
    if (e.target.name === "title" && duplicateFinder(notes, e.target.value)) {
      setIsDuplicate(true);
    } else {
      if (e.target.name === "title") {
        setIsDuplicate(false);
      }
    }

    setCurrentNote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
      date_formatted: formatDate(new Date()),
      user_owner: currentUser.name,
    }));

    // Alert State default
    alertState.on && setAlertState({ on: false, message: "", type: "" });
  };

  //*onClick button handler
  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (action === "new") {
      const updatedNotes = [...notes, currentNote];
      setNotes(updatedNotes);

      createNoteDb(currentNote);

      //*success message
      setAlertState({
        on: true,
        message: "Stored Successfully",
        type: "success",
      });

      //*set currentNote state to init
      setCurrentNote(initCurrentNote());
    }
  };

  //* Alert State default
  const [alertState, setAlertState] = useState<AlertState>({
    on: false,
    message: "",
    type: "",
  });

  //*blank input
  const [isBlank, setIsBlank] = useState<boolean>(
    currentNote.title === "" && currentNote.body === ""
  );

  useEffect(() => {
    setIsBlank(currentNote.title === "" || currentNote.body === "");
  }, [currentNote]);

  return (
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Col md={6}>
          {alertState.on && (
            <CustomAlert
              message={alertState.message}
              type={alertState.type}
              duration={3000}
            ></CustomAlert>
          )}
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={currentNote.title}
                onChange={inputChangeHandler}
                name="title"
              />
            </Form.Group>
            {isDuplicate && (
              <p style={{ color: "red", fontStyle: "italic" }}>
                * Title already exists
              </p>
            )}
            <Form.Group controlId="formBody">
              <Form.Label className="fw-bold">Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Body"
                value={currentNote.body}
                onChange={inputChangeHandler}
                name="body"
              />
            </Form.Group>
            {isBlank && (
              <p style={{ color: "red", fontStyle: "italic" }}>
                * Both inputs are required
              </p>
            )}
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                className="mt-2 mx-auto"
                onClick={buttonClickHandler}
                disabled={isBlank || isDuplicate}
              >
                {action === "new"
                  ? "Save New"
                  : action === "edit"
                  ? "Save Changes"
                  : "indefinido"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NoteForm;
