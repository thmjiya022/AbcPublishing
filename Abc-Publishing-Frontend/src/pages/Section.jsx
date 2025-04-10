import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetSection } from "../services/apiService";
import "../styles/Section.css";

function Section() {
  const [currentSection, setCurrentSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { sectionName } = useParams();

  const fetchSection = async () => {
    try {
      setLoading(true);
      const data = await GetSection(sectionName);
      if (!data) throw new Error("Section not found");
      setCurrentSection(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("This section does not exist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSection();
  }, [sectionName]);

  const handleClick = (link) => {
    navigate(`/section/${link.section}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div class="page">
      <div class="content">
        <h1>{currentSection?.title}</h1>
        <hr />
        {currentSection?.content?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div class="links">
        {currentSection?.navigation?.map((link, index) => (
          <button key={index} onClick={() => handleClick(link)}>
            {link.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Section;
