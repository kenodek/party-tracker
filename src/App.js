import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  compareByName,
  compareByIsMature,
  compareByStatus,
} from "./utils/functions";
import PartyParticipantsTable from "./components/PartyParticipantsTable";
import { SORT_BY } from "./utils/constants";
import Charts from "./components/Chart";
import Header from "./components/Header";

const initialState = [
  { name: "Dominik", isMature: true, status: "Przyjdzie" },
  { name: "Mateusz", isMature: true, status: "Przyjdzie" },
  { name: "Danuta", isMature: true, status: "Przyjdzie" },
  { name: "Marek", isMature: true, status: "Nie wie" },
  { name: "Wiktor", isMature: false, status: "Nie odpisał" },
];

const getInitialState = () => {
  return JSON.parse(localStorage.getItem("partyParticipants")) || [];
};

export default function App() {
  const [name, setName] = useState("");
  const [isMature, setIsMature] = useState("false");
  const [status, setStatus] = useState("Przyjdzie");
  const [partyParticipants, setPartyParticipants] = useState(getInitialState);
  const [sortBy, setSortBy] = useState(undefined);
  const [isReverse, setIsReverse] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "partyParticipants",
      JSON.stringify(partyParticipants)
    );
  }, [partyParticipants]);

  const sortPartyParticpants = (nextSortBy) => {
    setPartyParticipants((unupdatedPartyParticipants) => {
      console.log("UNUPDATED: ", unupdatedPartyParticipants);
      let copiedPartyParticipants = [...unupdatedPartyParticipants];

      switch (nextSortBy) {
        case SORT_BY.NAME:
          copiedPartyParticipants.sort(compareByName);
          break;

        case SORT_BY.IS_MATURE:
          copiedPartyParticipants.sort(compareByIsMature);
          break;

        case SORT_BY.STATUS:
          copiedPartyParticipants.sort(compareByStatus);
          console.log("SORT BY STATUS: ");
          break;

        default:
          break;
      }

      if (isReverse) {
        setIsReverse(false);
        return copiedPartyParticipants.reverse();
      } else {
        setIsReverse(true);
        return copiedPartyParticipants;
      }
    });

    setSortBy(nextSortBy);
  };

  const handleAddPartyParticipant = (event) => {
    event.preventDefault();
    setPartyParticipants((prevState) => [
      ...prevState,
      { name, isMature, status },
    ]);
    setName("");
  };

  const removeParticipant = (index) => {
    setPartyParticipants((prevState) => {
      const nextState = [...prevState];
      nextState.splice(index, 1);
      return nextState;
    });
  };

  const changeName = (name, index) => {
    setPartyParticipants((prevState) => {
      const nextState = [...prevState];
      nextState[index].name = name;
      return nextState;
    });
  };

  const changeStatus = (status, index) => {
    setPartyParticipants((prevState) => {
      const newState = [...prevState];
      newState[index].status = status;
      return newState;
    });
  };

  const changeIsMature = (isMature, index) => {
    setPartyParticipants((prevState) => {
      const newState = [...prevState];
      newState[index].isMature = isMature;
      return newState;
    });
  };

  return (
    <>
      <Header />
      <form id="form" onSubmit={(event) => handleAddPartyParticipant(event)}>
        <fieldset form="form">
          <legend>Dodaj nowego uczestnika 18 urodzin Sylwii </legend>

          <div id="flex-container">
            <label htmlFor="input-participant">Imię i nazwisko: </label>
            <input
              id="input-participant"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="select-isMature">Jest dorosły? </label>
            <select
              id="select-isMature"
              value={isMature}
              onChange={(event) => setIsMature(event.target.value)}
            >
              <option value={false}>NIE</option>
              <option value={true}>TAK</option>
            </select>

            <label htmlFor="select-status">Status </label>
            <select
              id="select-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Przyjdzie">Przyjdzie</option>
              <option value="Nie odpisał">Nie odpisał</option>
              <option value="Nie wie">Nie wie</option>
              <option value="Nie przyjdzie">Nie przyjdzie</option>
            </select>

            <input type="submit" value="Dodaj" />
          </div>
        </fieldset>
      </form>

      <div className="container-data">
        <PartyParticipantsTable
          partyParticipants={partyParticipants}
          sortPartyParticpants={sortPartyParticpants}
          removeParticipant={removeParticipant}
          changeName={changeName}
          changeStatus={changeStatus}
          changeIsMature={changeIsMature}
        />

        <Charts partyParticipants={partyParticipants} />
      </div>
    </>
  );
}
