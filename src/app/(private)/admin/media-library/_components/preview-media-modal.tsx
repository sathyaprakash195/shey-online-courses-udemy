import { IMedia } from "@/interfaces";
import { Modal } from "antd";
import React from "react";

function PreviewMediaModal({
  selectedMedia,
  showPreviewModal,
  setShowPreviewModal,
}: {
  selectedMedia: IMedia;
  showPreviewModal: boolean;
  setShowPreviewModal: (show: boolean) => void;
}) {
  return (
    <Modal
      title={
        <h1 className="uppercase">
          Preview {selectedMedia.type === "image" ? "IMAGE" : "VIDEO"}
        </h1>
      }
      open={showPreviewModal}
      onCancel={() => setShowPreviewModal(false)}
      centered
      footer={null}
    >
      <div className="mt-5">
        {selectedMedia.type === "image" ? (
          <img src={selectedMedia.url} alt={selectedMedia.name} />
        ) : (
          <video controls>
            <source src={selectedMedia.url} type="video/mp4" />
          </video>
        )}
      </div>
    </Modal>
  );
}

export default PreviewMediaModal;
