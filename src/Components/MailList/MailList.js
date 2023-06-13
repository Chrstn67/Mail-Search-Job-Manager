import React from "react";
import "./MailList.scss";

const MailList = ({ mails, deleteMail, updateStatus }) => {
  const handleStatusChange = (index, e) => {
    const newStatus = e.target.value;
    updateStatus(index, "status", newStatus);

    // Mise à jour du localStorage
    const updatedMails = JSON.parse(localStorage.getItem("mails")) || [];
    updatedMails[index].status = newStatus;
    localStorage.setItem("mails", JSON.stringify(updatedMails));
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
                <td>{mail.job}</td>
                <td>{mail.location}</td>
                <td>{mail.recipient}</td>
                <td>{mail.sendDate}</td>
                <td>{mail.contractType}</td>
                <td>{mail.workingHours}</td>
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
