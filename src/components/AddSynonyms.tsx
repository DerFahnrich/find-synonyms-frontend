import { useEffect, useState } from "react";
import { Button } from "./Button";
import { IWordNode } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addSynonyms,
  clearCreatedSynonyms,
  clearError,
  selectCreatedSynonyms,
  selectError,
} from "../store";

export const AddSynonyms = (): JSX.Element => {
  const [wordInput, setWordInput] = useState<string>("");
  const [synonymsInput, setSynonymsInput] = useState<string>("");
  const dispatch = useAppDispatch();
  const errorData = useAppSelector(selectError);
  const createdSynonymsData = useAppSelector(selectCreatedSynonyms);

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const synonyms = synonymsInput.replaceAll(" ", "").split(",");

    const newWordNode: IWordNode = {
      word: wordInput,
      synonyms,
    };

    setWordInput("");
    setSynonymsInput("");

    dispatch(addSynonyms(newWordNode));
  };

  useEffect(() => {
    if (errorData || createdSynonymsData) {
      setTimeout(() => {
        dispatch(clearError());
        dispatch(clearCreatedSynonyms());
      }, 3000);
    }
  }, [errorData, createdSynonymsData]);

  return (
    <div className="add-synonyms">
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="word-input-container">
          <input
            className="input"
            onChange={(e) => setWordInput(e.target.value)}
            placeholder="Type in the word..."
            required
            type="text"
            value={wordInput}
          />
        </div>

        <div className="synonyms-input-container">
          <input
            className="input"
            onChange={(e) => setSynonymsInput(e.target.value)}
            placeholder="Add synonyms, comma-seperated..."
            required
            type="text"
            value={synonymsInput}
          />
        </div>
        <Button text="Add" />
      </form>
      {errorData && <p className="feedback">{errorData.errorMessage}</p>}
      {createdSynonymsData && <p className="feedback">{createdSynonymsData.status}</p>}
    </div>
  );
};
