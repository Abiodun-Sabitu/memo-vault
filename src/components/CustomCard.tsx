import { Button, Divider } from "antd";
import { RiEdit2Fill } from "react-icons/ri";

export const CustomCard: React.FC<{
  title: string;
  content: string;
  labelColor: string;
  tag: string;
  id: number;
  onDelete: (id: number) => void;
}> = ({ title, content, labelColor, tag, id, onDelete }) => {
  // console.log("id", id);

  // let existingNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
  // const onDelete = () => {
  //   existingNotes = existingNotes.filter((note: any) => note.id !== id);
  //   const allNotes = [...existingNotes];
  //   localStorage.setItem("allNotes", JSON.stringify(allNotes));
  //   console.log("clicked me!");
  // };

  return (
    <>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <figcaption>
            {title}{" "}
            <span
              style={{
                backgroundColor: labelColor,
                marginRight: 12,
              }}
              className="tag_category"
            >
              {tag}
            </span>
          </figcaption>
          <RiEdit2Fill style={{ cursor: "pointer" }} />
        </div>
        <Divider style={{ marginTop: 10 }}></Divider>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <figure>
            <article>{content}</article>
          </figure>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              view
            </span>
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
