import { Button, Divider } from "antd";
// import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import useNotes from "../hooks/useNotes";

export const CustomCard: React.FC<{
  title: string;
  content: string;
  labelColor: string;
  tag: string;
  id: number;
  onDelete: (id: number) => void;
  setIsModalOpen: (value: boolean) => void;
}> = ({ title, content, labelColor, tag, id, onDelete, setIsModalOpen }) => {
  const { getNoteToEdit } = useNotes();

  const onEditNote = () => {
    setIsModalOpen(true);
    getNoteToEdit(id);
  };

  return (
    <>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <figcaption>{title} </figcaption>
          <RiEdit2Fill
            style={{ cursor: "pointer", marginTop: 8 }}
            onClick={onEditNote}
          />
        </div>
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
    </>
  );
};
