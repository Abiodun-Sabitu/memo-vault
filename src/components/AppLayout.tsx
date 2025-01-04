import FloatingMenu from "./FloatingMenu";
import Header from "./Header";
import { useState } from "react";

const AppLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMenuOpen, setMenu] = useState<boolean>(true);

  return (
    <>
      <Header />
      <FloatingMenu isMenuOpen={isMenuOpen} setMenu={setMenu} />
      <div
        onClick={() => {
          setMenu(true);
        }}
        className={!isMenuOpen ? "overlay show" : "overlay hide"}
      ></div>
      {children}
    </>
  );
};

export default AppLayout;
