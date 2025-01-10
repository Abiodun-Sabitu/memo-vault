import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { RiStickyNoteAddFill } from "react-icons/ri";

const Header: React.FC<{}> = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Determine the new theme
    setTheme(newTheme); // Update the state with the new theme
    document.body.className = newTheme + "-mode"; // Apply the class to the <body>
  };

  // Apply the current theme when the component mounts or when the theme state changes
  useEffect(() => {
    document.body.className = theme + "-mode";
  }, [theme]);

  return (
    <header id="header">
      <div>
        <div className="logo" style={{ padding: 0, margin: 0 }}>
          <i>Cabinote </i> &nbsp;
          <RiStickyNoteAddFill fill="#E8505B" />
          <br />
        </div>
        <div
          style={{
            padding: 0,
            marginBottom: 15,
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          Big ideas start small
        </div>
      </div>

      <div
        style={{
          marginTop: 5,
          marginLeft: 5,
          color: "rgba(68, 67, 67, 0.77)",
          fontWeight: "bold",
        }}
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <MdDarkMode size={24} cursor="pointer" />
        ) : (
          <MdOutlineDarkMode fill="white" size={24} cursor="pointer" />
        )}
      </div>
    </header>
  );
};

export default Header;
