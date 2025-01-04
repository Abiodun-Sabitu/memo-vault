import { RiStickyNoteAddFill } from "react-icons/ri";

const Header: React.FC<{
  notes: any[];
}> = ({ notes }) => {
  return (
    <header id="header">
      <div className="logo">
        <i>Cabinote </i> &nbsp;
        <RiStickyNoteAddFill fill="#E8505B" />
      </div>

      <span
        style={{
          marginTop: 5,
          marginLeft: 5,
          color: "rgba(68, 67, 67, 0.77)",
          fontWeight: "bold",
        }}
      >
        <small>
          {notes ? notes.length + " notes created" : "0 notes created"}
        </small>
      </span>
    </header>
  );
};

export default Header;
