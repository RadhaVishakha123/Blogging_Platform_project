import useUserProfile from "../Context/UserProfileContext";
import { Modal, Button, Form, Input, Checkbox } from "antd";
import useAuth from "../Context/AuthContext";
import { useEffect, useState } from "react";
import type { UserProfile } from "../Helper/Type";

export default function EditprofileModal() {
  const {
    FetchProfliledata,
    isProfilemodelOpen,
    setisProfilemodelOpen,
    AddUserProfile,
  } = useUserProfile();

  const { CurrentUser } = useAuth();

  // TEMP DATA (for input editing)
  const [tempData, setTempData] = useState<Omit<UserProfile, "userId">>({
    fullName: "",
    bio: "",
    profilePic: "",
    accountType: "public",
  });

  // LOAD USER DATA WHEN MODAL OPENS
  useEffect(() => {
    if (isProfilemodelOpen && CurrentUser) {
      const profile = FetchProfliledata(CurrentUser.Id);
      if (!profile) return;

      setTempData({
        fullName: profile.fullName,
        bio: profile.bio,
        profilePic: profile.profilePic,
        accountType: profile.accountType,
        
      });
    }
  }, [isProfilemodelOpen, CurrentUser]);

  // SAVE CHANGES
  function saveChanges() {
    if (!CurrentUser) return;

    AddUserProfile({
      fullName: tempData.fullName,
      bio: tempData.bio,
      profilePic: tempData.profilePic,
      accountType: tempData.accountType,
     
    });

    setisProfilemodelOpen(false);
  }

  return (
    <Modal
      open={isProfilemodelOpen}
      footer={null}
      centered
      onCancel={() => setisProfilemodelOpen(false)}
      rootClassName="custom-modal"
      modalRender={(content) => (
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          {content}
        </div>
      )}
    >
      <div className="text-white">
        <h2 className="text-xl mb-4">Edit Profile</h2>

        <Form layout="vertical">

          {/* Full Name */}
          <Form.Item label={<span className="text-white">Full Name</span>}>
            <Input
              value={tempData.fullName}
              onChange={(e) =>
                setTempData({ ...tempData, fullName: e.target.value })
              }
              placeholder="Enter your name"
            />
          </Form.Item>

          {/* Bio */}
          <Form.Item label={<span className="text-white">Bio</span>}>
            <Input.TextArea
              rows={3}
              value={tempData.bio}
              onChange={(e) =>
                setTempData({ ...tempData, bio: e.target.value })
              }
              placeholder="Tell something about yourself..."
            />
          </Form.Item >

          {/* Account Type */}
          <Form.Item label={<span className="text-white">Private</span>}>
            <Checkbox
              checked={tempData.accountType === "private"}
              onChange={(e) =>
                setTempData({
                  ...tempData,
                  accountType: e.target.checked ? "private" : "public",
                })
              }
            >
              Private Account
            </Checkbox>
          </Form.Item>

          <Button type="primary" block className="mt-4" onClick={saveChanges}>
            Save
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
