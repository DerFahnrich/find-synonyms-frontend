import { useState } from "react";
import { Button } from "./Button";
import { useAppDispatch } from "../hooks";
import { fetchSynonyms, updateStatus } from "../store";
import { Status } from "../constants";

export const SynonymsInput = (): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateStatus(Status.LOADING));

    setTimeout(() => {
      dispatch(fetchSynonyms(input));
      setInput("");
    }, 1000);
  };

  return (
    <div className="synonyms-input">
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="input-container">
          <input
            className="input"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for synonyms to..."
            type="text"
            value={input}
          />
        </div>
        <Button text="Search" />
      </form>
    </div>
  );
};
