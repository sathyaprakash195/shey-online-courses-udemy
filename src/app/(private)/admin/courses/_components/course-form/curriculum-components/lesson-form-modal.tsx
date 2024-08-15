import mediaGlobalStore, { IMediaGlobalStore } from "@/store/media-store";
import { Button, Input, message, Modal, Select } from "antd";
import { Edit2, MoreVertical, PlusIcon, Trash2 } from "lucide-react";
import React, { useEffect } from "react";

function LessonFormModal({
  showLessonFormModal,
  setShowLessonFormModal,
  setSections,
  type,
  selectedLesson,
  lessonIndex,
  sectionIndex,
}: {
  showLessonFormModal: boolean;
  setShowLessonFormModal: (showLessonFormModal: boolean) => void;
  setSections: (sections: any) => void;
  type: "add" | "edit";
  selectedLesson?: any;
  lessonIndex?: number;
  sectionIndex: number;
}) {
  const [name, setName] = React.useState("");
  const [video, setVideo] = React.useState("");

  const { media } = mediaGlobalStore() as IMediaGlobalStore;

  const handleSave = () => {
    try {
      if (type === "add") {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex].lessons.push({
            name,
            video,
          });
          return updatedSections;
        });
      } else {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex].lessons[lessonIndex!] = {
            name,
            video,
          };

          return updatedSections;
        });
      }
      message.success("Lesson saved successfully");
      setShowLessonFormModal(false);
    } catch (error) {
      message.error("Failed to save lesson");
    }
  };

  useEffect(() => {
    if (type === "edit") {
      setName(selectedLesson.name);
      setVideo(selectedLesson.video);
    }
  }, []);

  return (
    <Modal
      open={showLessonFormModal}
      onCancel={() => setShowLessonFormModal(false)}
      title={type === "add" ? "ADD LESSON" : "EDIT LESSON"}
      centered
      footer={null}
    >
      <hr />
      <div className="mt-5">
        <label htmlFor="name">Lesson name</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter lesson name"
          required
        />
      </div>

      {/* todo */}
      <div className="mt-5 flex flex-col">
        <label htmlFor="name">Select video</label>
        <Select value={video} onChange={(value) => setVideo(value)}>
          {media.map((item: any) => (
            <Select.Option value={item.url} key={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end gap-5 mt-5">
        <Button>Cancel</Button>
        <Button type="primary" disabled={!name} onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default LessonFormModal;
