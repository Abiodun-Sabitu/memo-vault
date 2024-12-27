export const CustomCard: React.FC<{
  title: string;
  content: string;
  labelColor: string;
  tag: string;
}> = ({ title, content, labelColor, tag }) => {
  return (
    <>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <figcaption>{title}</figcaption>
          <span style={{ backgroundColor: labelColor }}>{tag}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <figure>
            <p>{content}</p>
          </figure>
          <div style={{ display: "flex", gap: 25 }}>
            <span>View</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </>
  );
};
