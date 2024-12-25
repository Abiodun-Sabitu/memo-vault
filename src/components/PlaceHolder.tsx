import { MdNoteAdd } from "react-icons/md";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

export const PlaceHolder = () => {
  const navigate = useNavigate();

  const navigateToCreateNote = () => {
    navigate("/create-note");
  };
  return (
    <>
      <div className="placeholder">
        <div>
          <CustomButton
            label={
              <>
                <div className="menu_items_icons">
                  Create Note &nbsp;{" "}
                  <MdNoteAdd fill="white" style={{ marginTop: 2 }} />
                </div>
              </>
            }
            color="#9d4edd"
            onClick={navigateToCreateNote}
            htmlType="button"
          />
        </div>
      </div>
    </>
  );
};
