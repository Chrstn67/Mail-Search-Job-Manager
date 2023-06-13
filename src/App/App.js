import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MailForm from "../Components/MailForm/MailForm";
import MailList from "../Components/MailList/MailList";
import MentionsLegales from "../Components/MentionsLegales/MentionsLegales";
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

  const updateStatus = (index, key, value) => {
    const updatedMails = [...mails];
    updatedMails[index][key] = value;
    setMails(updatedMails);
  };

  return (
    <Router>
      <div>
        <h1>Gestion de courrier de candidature</h1>

        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/mentions-legales">Mentions légales</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MailForm addMail={addMail} />}>
            <Route
              index
              element={
                <MailList
                  mails={mails}
                  deleteMail={deleteMail}
                  updateStatus={updateStatus}
                />
              }
            />
          </Route>
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
