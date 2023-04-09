import { Status } from "./constants";

export interface IError {
  errorMessage: string;
  statusCode: number;
}

export interface ISynonyms {
  word: string;
  synonyms: string[];
  transitiveSynonyms: string[];
}

export interface ISynonymsSlice {
  createdSynonyms?: ICreatedSynonyms;
  error?: IError;
  status: Status;
  synonyms?: ISynonyms;
  words?: string[];
}

export interface IWordNode {
  word: string;
  synonyms: string[];
}

export interface ICreatedSynonyms {
  status: string;
  url: string;
}
