import { Avatar, Button, Card, Modal } from "antd";
import { EditOutlined, LockOutlined,CameraOutlined } from "@ant-design/icons";
import useAuth from "../Context/AuthContext";
import { useEffect, useState } from "react";
import useUserProfile from "../Context/UserProfileContext";
import type { UserProfile } from "../Helper/Type";
import EditprofileModal from "./EditprofileModal";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";

export default function UserProfile() {
  const { CurrentUser } = useAuth();
  const { FetchProfliledata,isProfilemodelOpen,setisProfilemodelOpen,AddUserProfile,FetchUserPosts,AddPost} = useUserProfile();
const [imageFile,setImageFile]=useState<File|null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const uploadProps = {
        beforeUpload: (file: any) => {
          setImageFile(file);
          return false; // prevent auto upload
        },
        showUploadList: false,
        maxCount: 1,
        accept: "image/*",  
      };
      
  // Load profile when CurrentUser is available
  useEffect(() => {
    if (CurrentUser) {
      const profile = FetchProfliledata(CurrentUser.Id);

      setUserDetails(profile);
      const posts = FetchUserPosts(CurrentUser.Id);
    setUserPosts(posts);
  }}, [CurrentUser,setisProfilemodelOpen,isProfilemodelOpen,setImageFile,imageFile,AddPost]);
  useEffect(() => {
    if (CurrentUser && imageFile) {
      // Here you would normally upload the image and get the URL
      const imageUrl = URL.createObjectURL(imageFile);

      // Update user profile with new image URL
      AddUserProfile({
        fullName: userDetails.fullName,
        bio: userDetails.bio,
        profilePic: imageUrl,
        accountType: userDetails.accountType,
        username: userDetails.username,
      });

      // Clear selected file
      setImageFile(null);
    }
  }, [imageFile, CurrentUser, userDetails, AddUserProfile]);

  // If not logged in
  if (!CurrentUser) {
    return <div className="text-white text-center mt-10">Please login.</div>;
  }

  // Wait for profile load
  if (!userDetails) return null;

  const isPrivate = userDetails.accountType === "private";
  const isOwner = CurrentUser.Id === userDetails.userId;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 lg:ml-25 md:ml-25">
      <div
        className="
  min-h-screen bg-black text-white px-4 py-8
     /* when screen ≥ 1024px → push right because header is vertical */
"
      >
        {/* TOP SECTION */}
        <div className="flex items-center gap-6">
          <div className=" flex flex-col">
          <div><Avatar
            size={110}
            src={userDetails.profilePic}
            className="border-4 border-gray-700"
          /></div>
          { isOwner &&
          <div className="text-center mt-3">
            <Upload {...uploadProps}>
        <Button icon={<CameraOutlined />} shape="circle" className="text-white !p-0 !m-0 !border-0 !hover:bg-transparent"></Button>
        </Upload></div>
}
</div>
          <div>
            <h1 className="text-2xl font-semibold">{CurrentUser.Username}</h1>
            <p className="text-gray-400">{userDetails.fullName}</p>

            <div className="flex gap-8 mt-6 text-lg">
              <span>
                <b>0</b> Posts
              </span>
              <span>
                <b>0</b> Followers
              </span>
              <span>
                <b>0</b> Following
              </span>
            </div>
          </div>
        </div>
        {/* bio show */}
        <div className="flex gap-8 mt-6 text-lg">
          <p className="mt-2 text-gray-300">{userDetails.bio}</p>
        </div>
        {/* Button for follow or Edit*/}
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
            <Button type="primary" className="mt-2">
              Follow
            </Button>
          )}
        </div>

        <hr className="border-gray-700 my-6" />

        {/* PRIVATE BLOCK */}
        {!isOwner && isPrivate ? (
          <div className="flex flex-col items-center mt-20">
            <LockOutlined className="text-5xl text-gray-600" />
            <h2 className="text-2xl mt-4">This Account is Private</h2>
            <p className="text-gray-400 mt-2">
              Follow to see their photos and videos.
            </p>
          </div>
        ) : (
          <>
            {/* POSTS */}
            <div className="grid grid-cols-3 gap-1 mt-4">
  {userPosts.length === 0 ? (
    <p className="text-gray-500 col-span-3 text-center">No posts yet.</p>
  ) : (
    userPosts.map((post) => (
      <div key={post.postId} className="relative group cursor-pointer">
        <img
          src={post.imageUrl}
          className="w-full h-32 object-cover"
          alt=""
        />

        {/* Hover Overlay Like Instagram */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
          ❤️ {post.likes || 0}
        </div>
      </div>
    ))
  )}
</div>

          </>
        )}

        {isOwner && (
         <EditprofileModal />)}
      </div>
    </div>
  );
}

