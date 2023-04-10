import { SynonymsInput } from ".";
import { SynonymsOutput } from ".";

export const Synonyms = (): JSX.Element => {
  return (
    <div className="synonyms-container">
      <SynonymsInput />
      <SynonymsOutput />
    </div>
  );
};
