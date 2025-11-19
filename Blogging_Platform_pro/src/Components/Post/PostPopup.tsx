import { Modal, Input, Upload, Button } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuth from "../Context/AuthContext";
import useUserProfile from "../Context/UserProfileContext";
import { useState } from "react";

export default function PostPopup() {
  const {
    isModalOpen,
    setIsModalOpen,
    imageFile,
    setImageFile,
    CurrentUser,setActiveAction
  } = useAuth();

  const { AddPost } = useUserProfile();

  const [caption, setCaption] = useState("");

  const uploadProps = {
    beforeUpload: (file: any) => {
      setImageFile(file);
      return false; // prevent auto-upload
    },
    accept: "image/*",
    showUploadList: false,
    maxCount: 1,
  };
  function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}


  // ----------------- SUBMIT POST -----------------
  async function handleSubmit() {
  if (!CurrentUser) return;

  let imageUrl = "";

  if (imageFile) {
    imageUrl = await fileToBase64(imageFile);
  }

  AddPost({
    content: caption,
    imageUrl,
    userId: CurrentUser.Id,
  });
// setActiveAction("Profile");
  setCaption("");
  setImageFile(null);
  setIsModalOpen(false);
}


  return (
    <>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setImageFile(null);
          setCaption("");
          setIsModalOpen(false);
          // setActiveAction("Profile");
        }}
        centered
        rootClassName="custom-modal"
        modalRender={(content) => (
          <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            {content}
          </div>
        )}
      >
        <div className="text-white">

          <h2 className="text-lg font-bold mb-3">Create Post</h2>

          {/* CAPTION */}
          <Input.TextArea
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share something..."
            className="!bg-black/40 !text-white border !border-white/20 rounded-xl mb-4 placeholder:!text-white"
          />

          {/* UPLOAD BUTTON */}
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              className="w-full !bg-white/10 !text-white border !border-white/20 mb-3"
            >
              Add Image
            </Button>
          </Upload>

          {/* IMAGE PREVIEW */}
          {imageFile && (
            <div className="relative mb-4">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="preview"
                className="w-full h-64 object-contain rounded-xl border border-white/20"
              />

              <Button
                danger
                className="absolute top-3 right-3 !bg-black/70 !text-white !border-none !rounded-full"
                icon={<DeleteOutlined />}
                onClick={() => setImageFile(null)}
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <Button
            type="primary"
            className="w-full py-2 bg-blue-600 rounded-xl hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </Button>

        </div>
      </Modal>
    </>
  );
}
