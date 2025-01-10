import React, { useState } from "react";
import "./About.css";
import { Button, CircularProgress } from "@mui/material";

interface Content {
  title: string;
  description: string;
  featuresTitle: string;
  features: string[];
  techTitle: string;
  techDescription: string;
}

type Language = "en" | "hu";

const content: Record<Language, Content> = {
  en: {
    title: "📋 About This App",
    description:
      "This is a simple ToDo app to help you stay organized and boost productivity. ✨",
    featuresTitle: "🌟 Key Features:",
    features: [
      "📝 Add, edit, and delete tasks.",
      "✅ Mark tasks as completed or pending.",
      "🔍 Filter tasks by status.",
      "📱 Fully responsive design.",
    ],
    techTitle: "💻 Technologies Used:",
    techDescription: "Built with React.js and styled with CSS.",
  },
  hu: {
    title: "📋 Az alkalmazásról",
    description:
      "Ez egy egyszerű ToDo alkalmazás, amely segít rendszerezni a feladataidat és növelni a hatékonyságot. ✨",
    featuresTitle: "🌟 Főbb funkciók:",
    features: [
      "📝 Feladatok hozzáadása, szerkesztése és törlése.",
      "✅ Feladatok jelölése késznek vagy függőben lévőnek.",
      "🔍 Feladatok szűrése állapot szerint.",
      "📱 Teljesen reszponzív design.",
    ],
    techTitle: "💻 Használt technológiák:",
    techDescription: "React.js segítségével készült, CSS-sel formázva.",
  },
};

/**
 * This component displays information about the app.
 * Allows users to switch between English and Hungarian languages.
 * Also fetches and displays random facts on demand.
 * @returns {JSX.Element} The rendered About component.
 */
const About: React.FC = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [fact, setFact] = useState<string | null>(null);
  const [loadingFact, setLoadingFact] = useState<boolean>(false);

  const currentContent = content[language];

  // Fetch a random fact
  const fetchRandomFact = async () => {
    setLoadingFact(true);
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error("Error fetching fact:", error);
      setFact("Failed to load a random fact. Please try again.");
    } finally {
      setLoadingFact(false);
    }
  };

  return (
    <div className="about-container">
      {/* Language selector */}
      <div className="language-switcher">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLanguage("en")}
          className={language === "en" ? "active" : ""}
        >
          English
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLanguage("hu")}
          className={language === "hu" ? "active" : ""}
        >
          Magyar
        </Button>
      </div>
      {/* Content */}
      <h1>{currentContent.title}</h1>
      <p>{currentContent.description}</p>
      <h2>{currentContent.featuresTitle}</h2>
      <ul>
        {currentContent.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h2>{currentContent.techTitle}</h2>
      <p>{currentContent.techDescription}</p>

      {/* Random Fact Section */}
      <div className="random-fact">
        <h2>💡 Random Fact</h2>
        {loadingFact ? (
          <CircularProgress />
        ) : (
          <p>{fact || "Click the button to fetch a random fact!"}</p>
        )}
        <Button className="mdc-button--outlined" color='primary' onClick={fetchRandomFact}>
          Get Random Fact
        </Button>
      </div>
    </div>
  );
};

export default About;