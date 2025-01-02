import { Button, Divider } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDragIndicator } from "react-icons/md";

export const CustomCard: React.FC<{
  title: string;
  content: string;
  labelColor: string;
  tag: string;
  id: number;
  onDelete: (id: number) => void;
  onDragStart: (id: number) => void;
  getNoteToEdit: (id: number) => void;
  setIsModalOpen: (value: boolean) => void;
}> = ({
  title,
  content,
  labelColor,
  tag,
  id,
  onDelete,
  getNoteToEdit,
  setIsModalOpen,
  onDragStart,
}) => {
  const onEditNote = () => {
    setIsModalOpen(true);
    getNoteToEdit(id);
  };

  return (
    <>
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 10px",
          }}
        >
          <div
            draggable
            onDragStart={() => onDragStart(id)}
            style={{ cursor: "grab", display: "flex", alignItems: "center" }}
          >
            <MdDragIndicator />
            <figcaption>{title} </figcaption>
          </div>
          <RiEdit2Fill
            style={{ cursor: "pointer", marginTop: 8 }}
            onClick={onEditNote}
          />
        </div>
        <div style={{ padding: "0px 15px" }}>
          <span
            style={{
              backgroundColor: labelColor,
              marginRight: 12,
            }}
            className="tag_category"
          >
            {tag}
          </span>
          <Divider style={{ marginTop: 10 }}></Divider>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <figure>
              <article>{content}</article>
            </figure>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              onClick={() => onDelete(id)}
              variant="solid"
              style={{
                backgroundColor: "#a713f6",
                color: "white",
                borderRadius: 5,
                fontSize: "small",
              }}
              size="small"
            >
              {" "}
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
