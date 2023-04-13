import React, { useState } from 'react';

function MovieFilter({ genres, languages, onFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    onFilter({ genre, language: selectedLanguage });
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onFilter({ genre: selectedGenre, language });
  };

  return (
    <div style={{ position: "absolute" }}>
      <button style={{ position: "absolute", top: "10px", left: "10px", padding: "10px", borderRadius: "5px", backgroundColor: isOpen ? "gray" : "lightgray", color: "white", border: "none", outline: "none", cursor: "pointer", width: "100px" }} onClick={toggleFilter}>
  {isOpen ? "Close Filter" : "Open Filter"}
</button>
      {isOpen && (
        <div style={{ position: "absolute", top: "50px",left: "10px", backgroundColor: "white", padding: "10px", borderRadius: "5px", boxShadow: "0 0 5px gray" }}>
          <h3 style={{ marginBottom: "5px" ,color:"black"}}>Genres</h3>
          
            <button
             
              style={{
                backgroundColor: "blue" ,
                color:  "white" ,
                margin: "5px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                borderRadius: "5px",
                padding: "5px"
              }}
            >
           jadkjjhjhf
            </button>
       
          <h3 style={{ marginBottom: "5px",color:"black" }}>Languages</h3>
         
            <button
            
              style={{
                backgroundColor: "blue",
                color: "white" ,
                margin: "5px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                borderRadius: "5px",
                padding: "5px"
              }}
            >
              malssdj
            </button>
        
        </div>
      )}
    </div>
  );
}

export default MovieFilter;
