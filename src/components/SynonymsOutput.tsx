import { Status } from "../constants";
import { useAppSelector } from "../hooks";
import { selectError, selectStatus, selectSynonyms } from "../store";

export const SynonymsOutput = (): JSX.Element => {
  const status = useAppSelector(selectStatus);
  const synonymsData = useAppSelector(selectSynonyms);
  const errorData = useAppSelector(selectError);

  const dynamicClass = synonymsData ? "expand" : "";

  const setOutputContent = (): JSX.Element => {
    if (status === Status.LOADING) {
      return <p className="status-text">Loading...</p>;
    }

    if (status === Status.IDLE && synonymsData) {
      return (
        <div className="output-content">
          <p className="word">Word: {synonymsData.word}</p>
          <p className="synonyms-header">Synonyms</p>
          <div className="synonyms">
            {synonymsData.synonyms.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <p className="synonyms-header">Transitive synonyms</p>
          {synonymsData.transitiveSynonyms.length > 0 ? (
            <div className="transitive-synonyms">
              {synonymsData.transitiveSynonyms.map((ts) => (
                <span key={ts}>{ts}</span>
              ))}
            </div>
          ) : (
            <p className="transitive-synonyms">No transitive synonyms found...</p>
          )}
        </div>
      );
    }

    if (status === Status.IDLE && errorData) {
      return <p className="status-text">{errorData.errorMessage}...</p>;
    }

    return <p className="status-text">Results here...</p>;
  };

  return <div className={`synonyms-output ${dynamicClass}`}>{setOutputContent()}</div>;
};
