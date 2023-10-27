import { useState, createContext } from "react";

const Notification = ({ message, severity, classes }) => {
  const notificationStyles = {
    position: "fixed",
    top: 100,
    right: 30,
    width: "auto",
    height: "auto",
    padding: "10px 25px",
    color: "white",
    backgroundColor: severity === "success" ? "green" : "red",
    borderRadius: "15px",
  };

  if (message === "") return;

  const config = true
    ? {
        style: notificationStyles,
      }
    : {};

  return <div {...config}>{message}</div>;
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const setNotification = (sev, msg, time = 2) => {
    setMessage(msg);
    setSeverity(sev);
    setTimeout(() => {
      setMessage("");
    }, time * 4000);
  };

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Notification
        message={message}
        severity={severity}
        classes={"otraClase"}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
