import { Button, Input, message, Modal } from "antd";
import React, { useEffect } from "react";

function SectionFormModal({
  showSectionFormModal,
  setShowSectionFormModal,
  type = "add",
  setSections,
  selectedSection,
  sectionIndex,
}: {
  showSectionFormModal: boolean;
  setShowSectionFormModal: (showSectionFormModal: boolean) => void;
  type?: "add" | "edit";
  setSections: (sections: any) => void;
  selectedSection?: any;
  sectionIndex?: number;
}) {
  const [name, setName] = React.useState("");

  const handleSave = () => {
    try {
      if (type === "add") {
        setSections((prev: any) => [...prev, { name, lessons: [] }]);
      } else {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex!] = {
            ...updatedSections[sectionIndex!],
            name,
          };
          return updatedSections;
        });
      }

      setName("");
      setShowSectionFormModal(false);
      message.success(type === "add" ? "Section added" : "Section updated");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (type === "edit") {
      setName(selectedSection?.name);
    }
  }, []);

  return (
    <Modal
      title={type === "add" ? "ADD SECTION" : "EDIT SECTION"}
      open={showSectionFormModal}
      onCancel={() => setShowSectionFormModal(false)}
      centered
      footer={null}
    >
      <div>
        <label htmlFor="name">Section Name</label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex justify-end mt-5 gap-5">
        <Button
          onClick={() => {
            setShowSectionFormModal(false);
            setName("");
          }}
        >
          Cancel
        </Button>
        <Button disabled={!name} type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default SectionFormModal;
