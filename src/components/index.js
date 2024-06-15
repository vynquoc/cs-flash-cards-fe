import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ImageUpload = ({ onSetImage }) => {
  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      onSetImage(data.image_url);
      message.success("Upload successful");
    } catch (error) {
      message.error("Upload failed");
      console.error("Error:", error);
    }
  };

  return (
    <Upload customRequest={handleUpload} showUploadList={false}>
      <Button
        icon={<UploadOutlined />}
        className="text-xs !w-8"
        size="small"
      ></Button>
    </Upload>
  );
};

export default ImageUpload;
