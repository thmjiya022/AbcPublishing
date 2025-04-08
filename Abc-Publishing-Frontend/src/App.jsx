import { useEffect, useState } from "react";
import "./App.css";
import { GetSection } from "./services/apiService";

function App() {
  const [currentSection, setCurrentSection] = useState(null);

  const fetchSection = async (sectionName = "preface") => {
    const data = await GetSection(sectionName);
    setCurrentSection(data);
  };

  useEffect(() => {
    fetchSection();
  }, []);

  function handleClick(link) {
    fetchSection(link.section);
  }

  const links = currentSection?.navigation;
  const content = currentSection?.content;

  return (
    <>
      <h1>{currentSection?.title}</h1>

      {content?.map((paragraph) => {
        return <p>{paragraph}</p>;
      })}
      {links?.map((link) => {
        return <a onClick={() => handleClick(link)}>{link.text}</a>;
      })}
    </>
  );
}

export default App;
