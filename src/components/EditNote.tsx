import { ColorPicker, Flex, Form, Input, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomButton from "./CustomButton";
import { IoIosSave } from "react-icons/io";

const EditNote: React.FC<{
  selectedNoteToEdit: any;
  setIsModalOpen: (value: boolean) => void;
  onEdit: (id: number, editedNote: any) => void;
}> = ({ selectedNoteToEdit, setIsModalOpen, onEdit }) => {
  const { TextArea } = Input;
  const [categories, setCategories] = useState<string[]>([]); // Pre-saved items
  const [category, setCategory] = useState<string | null>(null); // Selected category
  const [color, setColor] = useState<string>("#ffffff"); // Selected color
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const { updateEditedNote } = useNotes();

  // Update state when `selectedNoteToEdit` changes
  useEffect(() => {
    if (selectedNoteToEdit) {
      setTitle(selectedNoteToEdit.title || "");
      setContent(selectedNoteToEdit.content || "");
      setCategory(selectedNoteToEdit.category || null);
      setColor(selectedNoteToEdit.color || "#ffffff");
    }
  }, [selectedNoteToEdit]); // Runs whenever `selectedNoteToEdit` changes

  // console.log("id selected is ", selectedNoteToEdit?.id);
  useEffect(() => {
    const defaultCategories: string[] = [
      "Idea",
      "School",
      "Spiritual",
      "To-do",
    ];
    const storedCategories = localStorage.getItem("dropdownItems");

    if (!storedCategories) {
      // Write default categories to localStorage if not already present
      localStorage.setItem("dropdownItems", JSON.stringify(defaultCategories));
      setCategories(defaultCategories); // Set state with default categories
    } else {
      // Load categories from localStorage
      const parsedCategories = JSON.parse(storedCategories);
      setCategories(parsedCategories);
    }
  }, []);

  const handleEditNote = () => {
    // Get the current notes from localStorage

    // pick selected note ID
    const editedNoteId = selectedNoteToEdit?.id;

    const editedNote = {
      id: editedNoteId,
      title,
      content,
      category, // User-selected category
      color, // User-selected color
    };

    if (!title || !content || !category) {
      message.warning("Title, content, and category are required fields!");
    } else {
      onEdit(editedNoteId, editedNote);
      setIsModalOpen(false);
    }

    // navigate("/all-notes");
  };

  // Memoize the callback function to avoid re-creating it on every render
  const onCategoriesChange = useCallback((updatedCategories: string[]) => {
    setCategories(updatedCategories);
  }, []);

  return (
    <>
      <Flex
        justify="center"
        style={{ padding: 10, marginTop: 20 }}
        vertical
        align="center"
      >
        <Form
          name="newNoteForm"
          layout="vertical"
          onFinish={handleEditNote}
          className="form"
        >
          <h3
            style={{
              textAlign: "center",
              color: "#9d4edd",
              fontWeight: "bold",
            }}
          >
            Edit Note
          </h3>
          <Form.Item label="Title" layout="vertical">
            <Input
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              size="large"
              value={title}
            />
          </Form.Item>

          <Form.Item label="Note Category" layout="vertical">
            <CustomSelect
              categories={categories}
              onCategoriesChange={onCategoriesChange}
              onCategorySelect={(selectedCategory: string) =>
                setCategory(selectedCategory)
              }
              value={category}
            />
          </Form.Item>
          <Form.Item label="Content" layout="vertical">
            <TextArea
              rows={5}
              placeholder="Type your note here..."
              onChange={(e) => setContent(e.target.value)}
              name="content"
              value={content}
              className="user_entries"
            />
          </Form.Item>
          <Form.Item label="Color Label">
            {/* Color Picker */}
            <ColorPicker
              value={color}
              defaultValue={color}
              showText
              onChange={(colorResult) => setColor(colorResult.toHexString())} // Update color
            />
          </Form.Item>
          <CustomButton
            label={
              <>
                <div className="menu_items_icons">
                  Save &nbsp;{" "}
                  <IoIosSave fill="white" style={{ marginTop: 2 }} />
                </div>
              </>
            }
            htmlType="submit"
            color="#9d4edd"
          />
        </Form>
      </Flex>
    </>
  );
};
export default EditNote;
