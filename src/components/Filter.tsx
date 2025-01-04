import React from "react";
import { Dropdown, Space, message } from "antd";
import type { MenuProps } from "antd";
import { RiFilter2Fill } from "react-icons/ri";

const Filter: React.FC<{
  noteCategories: string[];
  setNotes: React.Dispatch<React.SetStateAction<any[]>>;
  copiedNotes: any[];
}> = ({ noteCategories, setNotes, copiedNotes }) => {
  // Create the dropdown menu items
  const items: MenuProps["items"] = [
    ...noteCategories.map((category, index) => ({
      label: category,
      key: index.toString(),
    })),
    { type: "divider" },
    { label: "Reset Filter", key: "reset" },
  ];

  // Handle filtering by category
  const filterByCategory = (category: string) => {
    const filteredNotes = copiedNotes.filter(
      (note) => note.category === category
    );

    if (filteredNotes.length === 0) {
      // Notify the user if no matches found
      message.warning(`No notes found for the category: "${category}"`);
    } else {
      setNotes(filteredNotes); // Update the current notes
    }
  };

  // Handle resetting to original notes
  const resetFilter = () => {
    setNotes(copiedNotes); // Reset notes to the original state
    message.success("Filter reset. Showing all notes."); // Notify the user
  };

  // Handle dropdown menu clicks
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "reset") {
      resetFilter(); // Call the reset function
      return;
    }

    const selectedCategory = noteCategories[parseInt(key)];
    filterByCategory(selectedCategory); // Call the filter function
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <div onClick={(e) => e.preventDefault()}>
        <Space
          style={{
            marginTop: 5,
            marginBottom: 5,
            textDecoration: "underline",
            columnGap: 2,
            color: "rgba(68, 67, 67, 0.77)",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Filter <RiFilter2Fill style={{ marginTop: 8 }} />
        </Space>
      </div>
    </Dropdown>
  );
};

export default Filter;
