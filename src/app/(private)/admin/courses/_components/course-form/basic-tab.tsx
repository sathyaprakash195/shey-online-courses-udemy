import { Form, Input, Select, Upload } from "antd";
import React from "react";

export const categories = [
  { label: "Web Development", value: "web-development" },
  { label: "Mobile Development", value: "mobile-development" },
  { label: "Game Development", value: "game-development" },
  { label: "Data Science", value: "data-science" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Artificial Intelligence", value: "artificial-intelligence" },
];

function BasicTab({
  coverImage,
  setCoverImage,
  promoVideo,
  setPromoVideo,
}: {
  coverImage: File | null | string;
  setCoverImage: (file: File) => void;
  promoVideo: File | null | string;
  setPromoVideo: (file: File) => void;
}) {
  let fileListOfCoverImage: any[] = [];
  if (coverImage && typeof coverImage === "string") {
    fileListOfCoverImage = [
      {
        uid: coverImage,
        name: coverImage,
        url: coverImage,
        type: "image/jpeg",
      },
    ];
  }

  if (coverImage && typeof coverImage === "object") {
    fileListOfCoverImage = [
      {
        ...coverImage,
        url: URL.createObjectURL(coverImage),
      },
    ];
  }

  let fileListOfPromoVideo: any[] = [];
  if (promoVideo && typeof promoVideo === "string") {
    fileListOfPromoVideo = [
      {
        uid: promoVideo,
        name: 'video.mp4',
        url: promoVideo,
      },
    ];
  }

  if (promoVideo && typeof promoVideo === "object") {
    fileListOfPromoVideo = [
      {
        ...promoVideo,
        url: URL.createObjectURL(promoVideo),
      },
    ];
  }

  return (
    <div className="flex flex-col gap-5">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter course title" }]}
      >
        <Input placeholder="Enter course title" />
      </Form.Item>

      <Form.Item
        label="Subtitle"
        name="subTitle"
        rules={[{ required: true, message: "Please enter course subtitle" }]}
      >
        <Input.TextArea placeholder="Enter course subtitle" />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter course price" }]}
        >
          <Input placeholder="Enter course price" type="number" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select course category" }]}
        >
          <Select placeholder="Select course category">
            {categories.map((category) => (
              <Select.Option key={category.value} value={category.value}>
                {category.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item name="coverImage" label="Cover Image">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setCoverImage(file);
              return false;
            }}
            accept="image/*"
            fileList={fileListOfCoverImage}
          >
            <span className="text-sm">Upload a cover image</span>
          </Upload>
        </Form.Item>

        <Form.Item name="promoVideo" label="Promo Video">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setPromoVideo(file);
              return false;
            }}
            accept="video/*"
            fileList={fileListOfPromoVideo}
          >
            <span className="text-sm">Upload a video</span>
          </Upload>
        </Form.Item>
      </div>
    </div>
  );
}

export default BasicTab;
