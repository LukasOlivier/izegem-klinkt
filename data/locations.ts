export interface LocationCoordinates {
  name: string;
  latitude: number;
  longitude: number;
}

export const locationCoordinates: Record<string, LocationCoordinates> = {
  "grote markt": {
    name: "Grote Markt",
    latitude: 50.92013753067656,
    longitude: 3.215729371811189,
  },
  "lagaar": {
    name: "Lagaar",
    latitude: 50.92083174959434,
    longitude: 3.2144484173704195,
  },
  "koornmarkt": {
    name: "Koornmarkt",
    latitude: 50.92050213256955,
    longitude: 3.214323382498255,
  },
  "de vagant": {
    name: "De Vagant",
    latitude: 50.920056541878964,
    longitude: 3.2149106506686573,
  },
  "plectrum": {
    name: "Plectrum",
    latitude: 50.919617882668554,
    longitude: 3.2149896962256665,
  },
  "vlaams huis": {
    name: "Vlaams Huis",
    latitude: 50.919859524759424,
    longitude: 3.215297418758955,
  },
  "t doolkruyt": {
    name: "'t Doolkruyt",
    latitude: 50.91618607914018,
    longitude: 3.2146269079046097,
  },
  "in de oude sint-pieter": {
    name: "In de Oude Sint-Pieter",
    latitude: 50.91606856892797,
    longitude: 3.2151358224626323,
  },
  "t damberd": {
    name: "Damberd",
    latitude: 50.91763419348052,
    longitude: 3.215860061086875,
  },
  "playa": {
    name: "Playa",
    latitude: 50.91992316892668,
    longitude: 3.2151784482815984,
  },
  "leute's": {
    name: "Leute's",
    latitude: 50.92010154138819,
    longitude: 3.2152573356750516,
  },
  "ariba": {
    name: "Ariba",
    latitude: 50.91613499696677,
    longitude: 3.214882655530985,
  },
};
