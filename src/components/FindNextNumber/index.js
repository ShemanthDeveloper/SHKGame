import React, { useState } from "react";
import Home from "../Home";
import { HiMiniLockClosed ,HiMiniLockOpen } from "react-icons/hi2";
import "./indexFindNumber.css";

const FindNumbersHomePage = () => {
  const initialLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
  const [level, setLevel] = useState();
  const [page, setPage] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);

  const changePage = () => {
    setPage(true);
    if(currentLevel===initialLevel){
      localStorage.setItem("currentLevel", currentLevel + 1)
    }
    
      setCurrentLevel(currentLevel+1)
    
    
  };

  const renderHomePage = () => {
    const renderLevelButton = (level, label) => {
      return (
        <button
          className="levels-button"
          onClick={() => {
            setCurrentLevel(level);
            setPage(false);
            setLevel(level * 10);
          }}
          disabled={level > initialLevel}
          key={level}
        >
          {label}<HiMiniLockClosed className="lock-icon-find-number"/> <HiMiniLockOpen className="unlock-icon-find-number" />
        </button>
      );
    };

    const levels = Array.from({ length: 10 }, (_, i) => i + 1); // Generate levels from 1 to 10
  
    return (
      <div className="Find-next-number-home-container">
        <h1 className="levels-heading-findnextnum">Levels</h1>
        {levels.map((level) =>
          renderLevelButton(level, `Level ${level}`)
        )}
      </div>
    );
  };

  

  return (
    <div>
      {page ? (
        renderHomePage()
      ) : (
        <Home changePage={changePage} level={level} />
      )}
    </div>
  );
};

export default FindNumbersHomePage;
