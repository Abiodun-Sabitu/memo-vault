import { RiStickyNoteAddFill } from "react-icons/ri";

const Header: React.FC<{}> = () => {
  return (
    <header id="header">
      <div className="logo">
        <i>Cabinote </i> &nbsp;
        <RiStickyNoteAddFill fill="#E8505B" />
      </div>

      <i
        style={{
          marginTop: 5,
          marginLeft: 5,
          color: "rgba(68, 67, 67, 0.77)",
          fontWeight: "bold",
        }}
      >
        <small>Big ideas start small</small>
      </i>
    </header>
  );
};

export default Header;
