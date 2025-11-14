import { Drawer,Modal, Input, Upload, Button, List } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuth from "../Context/AuthContext";
export default function PostPopup(){
    const {
        isModalOpen,
        setIsModalOpen,
        imageFile,
        setImageFile,
        CurrentUser,
      } = useAuth();
    
      const uploadProps = {
        beforeUpload: (file: any) => {
          setImageFile(file);
          return false; // prevent auto upload
        },
        showUploadList: false,
        maxCount: 1,
        
      };
    return(<>
       
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={() => {
            setImageFile(null);
            setIsModalOpen(false);
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
        
            <Input.TextArea
              rows={4}
              placeholder="Share something..."
              className="!bg-black/40 !text-white border !border-white/20 rounded-xl mb-4 placeholder:!text-white"
            />
        
            <Upload {...uploadProps}>
              <Button
                icon={<UploadOutlined />}
                className="w-full !bg-white/10 !text-white border !border-white/20 mb-3"
              >
                Add Image
              </Button>
            </Upload>
        
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
        
            <Button type="primary" className="w-full py-2 bg-blue-600 rounded-xl hover:bg-blue-700">
              Submit
            </Button>
          </div>
        </Modal>
        </>
    )
}