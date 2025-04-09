import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { GetSection } from "./services/apiService";

function Section() {
  const [currentSection, setCurrentSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const sectionName = location.pathname.split("/").pop();

  console.log(sectionName);

  const fetchSection = async () => {
    const data = await GetSection(sectionName);
    setCurrentSection(data);
  };

  useEffect(() => {
    fetchSection();
  }, [sectionName]);

  function handleClick(link) {
    navigate(`/section/${link.section}`);
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="section/preface" replace />} />
      <Route path="/section/:sectionName" element={<Section />} />
    </Routes>
  );
}
export default App;
