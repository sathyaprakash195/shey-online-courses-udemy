import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function DescriptionTab({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={description}
        onChange={(newValue) => {
          setDescription(newValue);
        }}
      />
    </div>
  );
}

export default DescriptionTab;
