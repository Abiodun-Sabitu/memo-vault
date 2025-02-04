import { ColorPicker, Flex, Form, Input, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomButton from "./CustomButton";
import { IoIosSave } from "react-icons/io";
import useNotes from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";
const NewNotes: React.FC = () => {
  const { TextArea } = Input;
  const [categories, setCategories] = useState<string[]>([]); // Pre-saved items
  const [category, setCategory] = useState<string | null>(null); // Selected category
  const [color, setColor] = useState<string>("#ffffff"); // Selected color
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = useNotes();
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

  const navigate = useNavigate();

  const createNewNote = () => {
    const createdNote = {
      id: Date.now(),
      title,
      content,
      category, // User-selected category
      color, // User-selected color
    };
    if (!title || !content || !category) {
      message.warning("Title, content, and category are required fields!");
    } else {
      addNote(createdNote);
      navigate("/all-notes");
    }
  };

  // Memoize the callback function to avoid re-creating it on every render
  const onCategoriesChange = useCallback((updatedCategories: string[]) => {
    setCategories(updatedCategories);
  }, []);

  return (
    <>
      <Flex
        justify="center"
        style={{ padding: 20, marginTop: 20 }}
        vertical
        align="center"
      >
        <Form
          className="form"
          name="newNoteForm"
          layout="vertical"
          onFinish={createNewNote}
        >
          <h3
            style={{
              textAlign: "center",
              color: "#9d4edd",
              fontWeight: "bold",
            }}
          >
            Create New Note
          </h3>
          <Form.Item label="Title" layout="vertical">
            <Input
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item label="Note Category" layout="vertical">
            <CustomSelect
              categories={categories}
              onCategoriesChange={onCategoriesChange}
              onCategorySelect={(selectedCategory: string) =>
                setCategory(selectedCategory)
              }
            />
          </Form.Item>
          <Form.Item label="Content" layout="vertical">
            <TextArea
              rows={5}
              placeholder="Type your note here..."
              onChange={(e) => setContent(e.target.value)}
              name="content"
              className="user_entries"
            />
          </Form.Item>
          <Form.Item label="Color Label">
            {/* Color Picker */}
            <ColorPicker
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

export default NewNotes;
