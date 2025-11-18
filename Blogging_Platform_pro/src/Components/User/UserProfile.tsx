import { Avatar, Button, Card, Modal, Upload } from "antd";
import { EditOutlined, LockOutlined, CameraOutlined } from "@ant-design/icons";
import useAuth from "../Context/AuthContext";
import { useEffect, useState } from "react";
import useUserProfile from "../Context/UserProfileContext";
import EditprofileModal from "./EditprofileModal";
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const { CurrentUser } = useAuth();
  const {
    FetchProfliledata,
    isProfilemodelOpen,
    setisProfilemodelOpen,
    AddUserProfile,
    FetchUserPosts,
  } = useUserProfile();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  const location = useLocation();
  const state = location.state as { userId?: string };
  const profileUserId = state?.userId || CurrentUser?.Id; // Use clicked user or current user
// const profileUsername = state?.username || CurrentUser?.Username;
  const uploadProps = {
    beforeUpload: (file: any) => {
      setImageFile(file);
      return false; // prevent auto upload
    },
    showUploadList: false,
    maxCount: 1,
    accept: "image/*",
  };

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // Fetch user profile & posts based on profileUserId
  useEffect(() => {
    if (profileUserId) {
      const profile = FetchProfliledata(profileUserId);
      setUserDetails(profile);
      const posts = FetchUserPosts(profileUserId);
      setUserPosts(posts);
    }
  }, [profileUserId]);

  // Upload profile image (only works for the owner)
  useEffect(() => {
    if (imageFile && profileUserId === CurrentUser?.Id) {
      const uploadImage = async () => {
        let imageUrl = "";
        if (imageFile) imageUrl = await fileToBase64(imageFile);

        AddUserProfile({
          fullName: userDetails.fullName,
          bio: userDetails.bio,
          profilePic: imageUrl,
          accountType: userDetails.accountType,
          username: userDetails.username,
        });

        setImageFile(null);
      };
      uploadImage();
    }
  }, [imageFile, profileUserId, CurrentUser, userDetails, AddUserProfile]);

  if (!CurrentUser) return <div className="text-white text-center mt-10">Please login.</div>;
  if (!userDetails) return null;

  const isPrivate = userDetails.accountType === "private";
  const isOwner = CurrentUser.Id === profileUserId;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 lg:ml-25 md:ml-25">
      <div className="min-h-screen bg-black text-white px-4 py-8">
        {/* TOP SECTION */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <Avatar
              size={110}
              src={userDetails.profilePic}
              className="border-4 border-gray-700"
            />
            {isOwner && (
              <div className="text-center mt-3">
                <Upload {...uploadProps}>
                  <Button
                    icon={<CameraOutlined />}
                    shape="circle"
                    className="text-white !p-0 !m-0 !border-0 !hover:bg-transparent"
                  />
                </Upload>
              </div>
            )}
          </div>

          <div>
           {isOwner ? (<h1 className="text-2xl font-semibold">{CurrentUser.Username}</h1>) : (
            <h1 className="text-2xl font-semibold">{"----"}</h1>
           )}

            <p className="text-gray-400">{userDetails.fullName}</p>

            <div className="flex gap-8 mt-6 text-lg">
              <span><b>{userPosts.length}</b> Posts</span>
              <span><b>0</b> Followers</span>
              <span><b>0</b> Following</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="flex gap-8 mt-6 text-lg">
          <p className="mt-2 text-gray-300">{userDetails.bio}</p>
        </div>

        {/* Edit / Follow Button */}
        <div className="flex gap-8 mt-6 text-lg">
          {isOwner ? (
            <Button
              type="default"
              className="mt-2 bg-gray-800 text-white border-gray-700"
              icon={<EditOutlined />}
              onClick={() => setisProfilemodelOpen(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <Button type="primary" className="mt-2">Follow</Button>
          )}
        </div>

        <hr className="border-gray-700 my-6" />

        {/* PRIVATE BLOCK */}
        {!isOwner && isPrivate ? (
          <div className="flex flex-col items-center mt-20">
            <LockOutlined className="text-5xl text-gray-600" />
            <h2 className="text-2xl mt-4">This Account is Private</h2>
            <p className="text-gray-400 mt-2">Follow to see their photos and videos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 mt-4">
            {userPosts.length === 0 ? (
              <p className="text-gray-500 col-span-3 text-center">No posts yet.</p>
            ) : (
              userPosts.map(post => (
                <div key={post.postId} className="relative group cursor-pointer">
                  <img src={post.imageUrl} className="w-full h-32 object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
                    ❤️ {post.likes || 0}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {isOwner && <EditprofileModal />}
      </div>
    </div>
  );
}
