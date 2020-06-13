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
  const [isMature, setIsMature] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [partyParticipants, setPartyParticipants] = useState(getInitialState);
  const [sortBy, setSortBy] = useState(undefined);

  useEffect(() => {
    console.log("PP: ", partyParticipants);

    localStorage.setItem(
      "partyParticipants",
      JSON.stringify(partyParticipants)
    );
  }, [partyParticipants]);

  useEffect(() => {
    console.log("IS MATURE: ", typeof isMature);
  }, [isMature]);

  const sortPartyParticpants = (nextSortBy) => {
    setPartyParticipants((unupdatedPartyParticipants) => {
      let copiedPartyParticipants = [...unupdatedPartyParticipants];

      if (nextSortBy === sortBy) {
        return copiedPartyParticipants.reverse();
      }

      switch (nextSortBy) {
        case SORT_BY.NAME:
          return copiedPartyParticipants.sort(compareByName);

        case SORT_BY.IS_MATURE:
          return copiedPartyParticipants.sort(compareByIsMature);

        case SORT_BY.STATUS:
          return copiedPartyParticipants.sort(compareByStatus);

        default:
          return unupdatedPartyParticipants;
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
      return prevState.map((participant, idx) => {
        if (idx === index) {
          participant.isMature = isMature;
        }

        return participant;
      });
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
