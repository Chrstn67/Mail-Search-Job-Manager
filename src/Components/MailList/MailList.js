import React, { useState } from "react";
import "./MailList.scss";

const MailList = ({
  mails,
  deleteMail,
  updateMailStatus,
  updateMailDetails,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedContractType, setEditedContractType] = useState("");

  const handleEditClick = (index) => {
    const contractType = mails[index].contractType;
    setEditIndex(index);
    setEditedContractType(contractType);
  };

  const handleSaveClick = (index) => {
    updateMailDetails(index, {
      ...mails[index],
      contractType: editedContractType,
    });
    setEditIndex(null);
    setEditedContractType("");
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditedContractType("");
  };

  const handleStatusChange = (index, e) => {
    const newStatus = e.target.value;
    updateMailStatus(index, newStatus);

    // Mise à jour du localStorage
    const updatedMails = JSON.parse(localStorage.getItem("mails")) || [];
    updatedMails[index].status = newStatus;
    localStorage.setItem("mails", JSON.stringify(updatedMails));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "contractType") {
      setEditedContractType(value);
    } else {
      updateMailDetails(index, { ...mails[index], [name]: value });
    }
  };

  return (
    <div className="list-container">
      <h2>Liste des courriers envoyés:</h2>
      {mails.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Métier recherché</th>
              <th>Lieu de l'entreprise</th>
              <th>Destinataire</th>
              <th>Date d'envoi</th>
              <th>Type de contrat</th>
              <th>Horaires</th>
              <th>Réponse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail, index) => (
              <tr
                key={index}
                className={`status-${mail.status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={mail.job}
                      onChange={(e) => handleInputChange(e, index)}
                      name="job"
                    />
                  ) : (
                    mail.job
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={mail.location}
                      onChange={(e) => handleInputChange(e, index)}
                      name="location"
                    />
                  ) : (
                    mail.location
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={mail.recipient}
                      onChange={(e) => handleInputChange(e, index)}
                      name="recipient"
                    />
                  ) : (
                    mail.recipient
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="date"
                      value={mail.sendDate}
                      onChange={(e) => handleInputChange(e, index)}
                      name="sendDate"
                    />
                  ) : (
                    mail.sendDate
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      value={editedContractType}
                      onChange={(e) => handleInputChange(e, index)}
                      name="contractType"
                    >
                      <option value="">Sélectionnez le type de contrat</option>
                      <option value="Alternance">Alternance</option>
                      <option value="CDD">CDD</option>
                      <option value="CDI">CDI</option>
                      <option value="Intérim">Intérim</option>
                      <option value="Stage">Stage</option>
                      {/* Ajoutez d'autres options de contrat si nécessaire */}
                    </select>
                  ) : (
                    mail.contractType
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      value={mail.workingHours}
                      onChange={(e) => handleInputChange(e, index)}
                      name="workingHours"
                    >
                      <option value="">Sélectionnez le type d'horaires</option>
                      <option value="Mi-temps">Mi-temps</option>
                      <option value="Temps partiel">Temps partiel</option>
                      <option value="Temps plein">Temps plein</option>
                    </select>
                  ) : (
                    mail.workingHours
                  )}
                </td>
                <td>
                  <select
                    value={mail.status}
                    onChange={(e) => handleStatusChange(index, e)}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Positive">Positive</option>
                    <option value="Négative">Négative</option>
                    {/* Ajoutez d'autres options de statut si nécessaire */}
                  </select>
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <button onClick={() => handleSaveClick(index)}>
                        Enregistrer
                      </button>
                      <button onClick={handleCancelClick}>Annuler</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(index)}>
                      Modifier
                    </button>
                  )}
                  <button onClick={() => deleteMail(index)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun courrier trouvé.</p>
      )}
    </div>
  );
};

export default MailList;
