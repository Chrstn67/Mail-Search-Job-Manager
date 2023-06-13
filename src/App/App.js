import React, { useState, useEffect } from "react";
import MailForm from "../Components/MailForm/MailForm";
import MailList from "../Components/MailList/MailList";
import "./App.scss";

const App = () => {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const storedMails = JSON.parse(localStorage.getItem("mails"));
    if (storedMails) {
      setMails(storedMails);
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem("mails", JSON.stringify(mails));
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [mails]);

  const addMail = (mail) => {
    const updatedMails = [...mails, mail];
    setMails(updatedMails);
  };

  const deleteMail = (index) => {
    const updatedMails = [...mails];
    updatedMails.splice(index, 1);
    setMails(updatedMails);
  };

  const updateMailStatus = (index, status) => {
    const updatedMails = [...mails];
    updatedMails[index].status = status;
    setMails(updatedMails);
  };

  const updateMailDetails = (index, updatedMail) => {
    const updatedMails = [...mails];
    updatedMails[index] = updatedMail;
    setMails(updatedMails);
  };

  return (
    <div>
      <h1>Gestion de courrier de candidature</h1>

      <MailForm addMail={addMail} />
      <MailList
        mails={mails}
        deleteMail={deleteMail}
        updateMailStatus={updateMailStatus}
        updateMailDetails={updateMailDetails}
      />
    </div>
  );
};

export default App;