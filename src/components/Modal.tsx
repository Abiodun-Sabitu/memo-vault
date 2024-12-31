import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import EditNote from "./EditNote";

const ModalBox: React.FC<{
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onEdit: (id: number, editedNote: any) => void; // Add this prop
}> = ({ isModalOpen, setIsModalOpen, onEdit }) => {
  const [selectedNoteToEdit, setSelectedNoteToEdit] = useState<any>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      let selectedNote = JSON.parse(
        localStorage.getItem("noteToEdit") || "null"
      );
      setSelectedNoteToEdit(selectedNote);
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal
        style={{ top: 40 }}
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <EditNote
          selectedNoteToEdit={selectedNoteToEdit}
          setIsModalOpen={setIsModalOpen}
          onEdit={onEdit}
        />
      </Modal>
    </>
  );
};

export default ModalBox;
