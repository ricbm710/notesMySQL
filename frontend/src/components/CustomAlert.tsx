//hooks
import { useEffect, useState } from "react";
//bootstrap
import { Alert } from "react-bootstrap";
//datatypes
import { AlertProps } from "../datatypes/datatypes";

const CustomAlert = ({ message, type, duration }: AlertProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [duration]);

  if (!show) {
    return null;
  }

  return (
    <Alert variant={type} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  );
};

export default CustomAlert;
