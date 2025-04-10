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
  const pageTurnSound = new Audio("/src/assets/Page_turn_sound.mp3");
  pageTurnSound.playbackRate = 1.3;

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
    pageTurnSound.play();
    navigate(`/section/${link.section}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div class="page">
      <div class="firstPage">
        <h1>{currentSection?.title}</h1>
        <hr />
        {currentSection?.content?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <div className="navigation">
          <div class="backwardLink">
            {currentSection?.navigation?.map(
              (link, index) =>
                link.text?.includes("Return") && (
                  <a key={index} onClick={() => handleClick(link)}>
                    {link.text}
                  </a>
                )
            )}
          </div>
          <div class="forwardLinks">
            {currentSection?.navigation?.map(
              (link, index) =>
                !link.text?.includes("Return") && (
                  <a key={index} onClick={() => handleClick(link)}>
                    {link.text}
                  </a>
                )
            )}
          </div>
        </div>
      </div>
      <div class="secondPage"></div>
    </div>
  );
}

export default Section;
