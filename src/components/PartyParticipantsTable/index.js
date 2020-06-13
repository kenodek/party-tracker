import React from "react";
import "./index.scss";
import { SORT_BY } from "../../utils/constants";

const PartyParticipantsTable = ({
  partyParticipants,
  sortPartyParticpants,
  removeParticipant,
  changeName,
  changeStatus,
  changeIsMature,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nr</th>
          <th onClick={() => sortPartyParticpants(SORT_BY.NAME)}>Uczestnik</th>
          <th onClick={() => sortPartyParticpants(SORT_BY.IS_MATURE)}>
            Dorosły
          </th>
          <th onClick={() => sortPartyParticpants(SORT_BY.STATUS)}>Status</th>
        </tr>
      </thead>

      <tbody>
        {partyParticipants.map(({ name, isMature, status }, index) => (
          <tr key={index}>
            <td className="table-cell__number">{index + 1}</td>
            <td>
              <input
                value={name}
                onChange={(event) => changeName(event.target.value, index)}
              />
            </td>
            <td>
              <select
                value={isMature}
                onChange={(event) => changeIsMature(event.target.value, index)}
              >
                <option value={true}>TAK</option>
                <option value={false}>NIE</option>
              </select>
            </td>
            <td>
              <select
                value={status}
                onChange={(event) => changeStatus(event.target.value, index)}
              >
                <option value="Przyjdzie">Przyjdzie</option>
                <option value="Nie odpisał">Nie odpisał</option>
                <option value="Nie wie">Nie wie</option>
                <option value="Nie przyjdzie">Nie przyjdzie</option>
              </select>

              <button
                className="button-delete"
                onClick={() => removeParticipant(index)}
              >
                <span
                  style={{ marginLeft: "20px" }}
                  role="img"
                  aria-label="Usuń"
                >
                  &#10060;
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PartyParticipantsTable;
