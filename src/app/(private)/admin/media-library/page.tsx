"use client";
import PageTitle from "@/components/page-title";
import { Button, message, Table, Tooltip } from "antd";
import React from "react";
import MediaUploadModal from "./_components/media-upload-modal";
import { IMedia } from "@/interfaces";
import { deleteMedia, getAllMedia } from "@/server-actions/media-library";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { PlayCircle, Trash2 } from "lucide-react";
import PreviewMediaModal from "./_components/preview-media-modal";

function MediaLibrary() {
  const [showMediaUploadModal, setShowMediaUploadModal] = React.useState(false);
  const [media, setMedia] = React.useState<IMedia[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);
  const [selectedMedia, setSelectedMedia] = React.useState<IMedia | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllMedia();
      if (response.success) {
        setMedia(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaHanlder = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteMedia(id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Uploaded At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text: string, record: IMedia) => (
        <div className="flex gap-5">
          <Button size="small" onClick={() => deleteMediaHanlder(record._id)}>
            <Trash2 size={14} />
          </Button>

          <Tooltip title="Preview">
            <Button
              size="small"
              onClick={() => {
                setSelectedMedia(record);
                setShowPreviewModal(true);
              }}
            >
              <PlayCircle size={14} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Media Library" />
        <Button onClick={() => setShowMediaUploadModal(true)}>
          UPLOAD NEW MEDIA
        </Button>
      </div>

      <Table dataSource={media} columns={columns} loading={loading} />

      {showMediaUploadModal && (
        <MediaUploadModal
          showMediaUploadModal={showMediaUploadModal}
          setShowMediaUploadModal={setShowMediaUploadModal}
          reloadData={getData}
        />
      )}

      {showPreviewModal && selectedMedia && (
        <PreviewMediaModal
          selectedMedia={selectedMedia!}
          showPreviewModal={showPreviewModal}
          setShowPreviewModal={setShowPreviewModal}
        />
      )}
    </div>
  );
}

export default MediaLibrary;
