import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import type { InputRef } from "antd";

interface AppProps {
  categories: string[];
  onCategoriesChange: (updatedCategories: string[]) => void;
  onCategorySelect: (selectedCategory: string) => void;
}

const CustomSelect: React.FC<AppProps> = ({
  categories,
  onCategoriesChange,
  onCategorySelect,
}) => {
  const [localCategories, setLocalCategories] = useState<string[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    const storedCategories = localStorage.getItem("dropdownItems");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      setLocalCategories(parsedCategories);
      onCategoriesChange(parsedCategories);
    }
  }, [onCategoriesChange]);

  // Optimized useEffect to avoid redundant updates
  // useEffect(() => {
  //   const storedCategories = localStorage.getItem("dropdownItems");
  //   if (storedCategories) {
  //     const parsedCategories = JSON.parse(storedCategories);

  //     // Update only if the stored categories differ from the current state
  //     if (
  //       JSON.stringify(parsedCategories) !== JSON.stringify(localCategories)
  //     ) {
  //       setLocalCategories(parsedCategories);
  //       onCategoriesChange(parsedCategories);
  //     }
  //   }
  // }, [localCategories, onCategoriesChange]);

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
  };

  return (
    <Select
      placeholder="Select a category"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Add a category"
              ref={inputRef}
              value={customCategory}
              onChange={onAdditionOfCustomCategory}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add Custom Category
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
