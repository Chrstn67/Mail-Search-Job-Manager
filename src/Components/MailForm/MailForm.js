// MailForm.js
import React, { useState } from "react";
import "./MailForm.scss";

const MailForm = ({ addMail }) => {
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sendDate, setSendDate] = useState("");

  const [contractType, setContractType] = useState("");
  const [workingHours, setWorkingHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailDetails = {
      job,
      location,
      recipient,
      sendDate,
      contractType,
      workingHours,
      status: "En attente",
    };
    addMail(mailDetails);
    setJob("");
    setLocation("");
    setRecipient("");
    setSendDate("");
    setContractType("");
    setWorkingHours("");

    // Mise à jour du localStorage
    const updatedMails = JSON.parse(localStorage.getItem("mails")) || [];
    updatedMails.push(mailDetails);
    localStorage.setItem("mails", JSON.stringify(updatedMails));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        placeholder="Métier recherché"
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Lieu de l'entreprise"
        required
      />
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Nom de l'entreprise"
        required
      />
      <input
        type="date"
        value={sendDate}
        onChange={(e) => setSendDate(e.target.value)}
        placeholder="Date d'envoi"
        required
      />
      <select
        value={contractType}
        onChange={(e) => setContractType(e.target.value)}
        required
      >
        <option value="">Sélectionnez le type de contrat</option>
        <option value="Alternance">Alternance</option>
        <option value="CDD">CDD</option>
        <option value="CDI">CDI</option>
        <option value="Intérim">Intérim</option>
        <option value="Stage">Stage</option>
        {/* Ajoutez d'autres options de contrat si nécessaire */}
      </select>
      <select
        value={workingHours}
        onChange={(e) => setWorkingHours(e.target.value)}
        required
      >
        <option value="">Sélectionnez les horaires</option>
        <option value="Mi-temps">Mi-temps</option>
        <option value="Temps partiel">Temps partiel</option>
        <option value="Temps plein">Temps plein</option>
        {/* Ajoutez d'autres options d'horaires si nécessaire */}
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default MailForm;
