import { CgMenuGridR } from "react-icons/cg";
import { ConfigProvider, FloatButton } from "antd";
import { MdMenuBook, MdNoteAdd } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const FloatingMenu: React.FC<{
  isMenuOpen: boolean;
  setMenu: (value: boolean) => void;
}> = ({ isMenuOpen, setMenu }) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#9d4edd", // Primary color
          // colorPrimaryHover: "#00000", // Hover color
        },
      }}
    >
      <FloatButton.Group
        onClick={() => setMenu(!isMenuOpen)}
        trigger="click"
        type="primary"
        style={{
          insetInlineEnd: 94,
          right: 40,

          zIndex: 1200,
        }}
        icon={<CgMenuGridR />}
        // open={isMenuOpen}
      >
        <Link to="/create-note">
          <FloatButton
            icon={<MdNoteAdd fill="#9d4edd" />}
            tooltip={<div>Add Note</div>}
          />
        </Link>
        <FloatButton
          icon={<MdMenuBook fill="#9d4edd" />}
          tooltip={<div>All Notes</div>}
        />
        <FloatButton
          icon={<RiMoonClearLine fill="#9d4edd" />}
          tooltip={<div>Theme</div>}
        />
      </FloatButton.Group>
    </ConfigProvider>
  </>
);

export default FloatingMenu;
