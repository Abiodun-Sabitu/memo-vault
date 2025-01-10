import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Form, Input, Select, Space } from "antd";
import type { InputRef } from "antd";

interface AppProps {
  categories: string[];
  onCategoriesChange: (updatedCategories: string[]) => void;
  onCategorySelect: (selectedCategory: string) => void;
  value?: string | null;
}

const CustomSelect: React.FC<AppProps> = ({
  categories,
  onCategoriesChange,
  onCategorySelect,
  value,
}) => {
  const [localCategories, setLocalCategories] = useState<string[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [customCategory, setCustomCategory] = useState<any>("");
  const inputRef = useRef<InputRef>(null);
  // console.log("value + ", value);

  useEffect(() => {
    const storedCategories = localStorage.getItem("dropdownItems");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setLocalCategories(parsedCategories);
      onCategoriesChange(parsedCategories);
    }
  }, [onCategoriesChange]);

  const onAdditionOfCustomCategory = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomCategory(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const trimmedCategory = customCategory.trim();
    const newItem =
      trimmedCategory.charAt(0).toUpperCase() +
      trimmedCategory.slice(1).toLowerCase();

    if (newItem && !localCategories.includes(newItem)) {
      const updatedCategories = [...localCategories, newItem];
      setLocalCategories(updatedCategories);
      onCategoriesChange(updatedCategories);
      localStorage.setItem("dropdownItems", JSON.stringify(updatedCategories));
    }
    setCustomCategory("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);
    onCategorySelect(value);
    console.log(selectedCategory);
  };

  return (
    <Select
      className="user_entries"
      value={value}
      size="large"
      placeholder="Select a category"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space
            style={{
              padding: "0 8px 4px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Input
              placeholder="Add a category"
              ref={inputRef}
              value={customCategory}
              onChange={onAdditionOfCustomCategory}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button
              type="text"
              onClick={addItem}
              disabled={customCategory.length < 1}
              style={
                customCategory.length < 1
                  ? { color: "gray", border: " #d699ff 1px solid" }
                  : { backgroundColor: "#d699ff", color: "white" }
              }
            >
              Add Category
            </Button>
          </Space>
        </>
      )}
      options={localCategories.map((item) => ({ label: item, value: item }))}
      onChange={handleSelectChange}
    />
  );
};

export default CustomSelect;
