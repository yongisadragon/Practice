import { useState } from "react";
import "./App.css";

function App() {
  const [commitPrefix, setCommitPrefix] = useState(null);

  const commitPrefixHandler = ({ target: { value } }) => {
    setCommitPrefix(value);
  };

  return (
    <>
      <h1>hello commit filter</h1>
      <input
        type="text"
        name="commitFilterInput"
        id="commitFilterInput"
        onChange={commitPrefixHandler}
      />
      <h2>{commitPrefix}</h2>
    </>
  );
}

export default App;
