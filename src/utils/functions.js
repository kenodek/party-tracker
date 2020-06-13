export const compareByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const compareByIsMature = (a, b) => {
  return a.isMature === b.isMature ? 0 : a.isMature ? -1 : 1;
};

export const compareByStatus = (a, b) => {
  if (a.status < b.status) {
    return -1;
  }
  if (a.status > b.status) {
    return 1;
  }
  return 0;
};

export const getText = (number) => {
  switch (number) {
    case 1:
      return "1 osoba";

    case 2:
    case 3:
    case 4:
      return `${number} osoby`;

    default:
      return `${number} osób`;
  }
};
