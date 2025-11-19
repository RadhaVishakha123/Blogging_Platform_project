
import { useEffect, useState } from "react";
import { Avatar, Card, Button, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  HeartOutlined,
  CommentOutlined
} from "@ant-design/icons";
import Default_User from "../../assets/Default_User.jpg";
import useUserProfile from "../Context/UserProfileContext";

export default function Home() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const {UserProfiledata,UserPostdata}=useUserProfile();

  // 🔹 Load posts + merge with user profiles
  useEffect(() => {
    

    // Merge post with its user details
    if (UserPostdata===undefined || UserProfiledata===undefined) return;
    const merged = UserPostdata
      .map((post: any) => {
        const user = UserProfiledata.find((u: any) => u.userId === post.userId);
        if (!user) return null;

        return {
          ...post,
          fullName: user.fullName || "Unknown User", 
          profilePic: user.profilePic || null,
          accountType: user.accountType || "public",
        };
      })
      .filter(Boolean);

    // Only public accounts posts visible
    const publicPosts = merged.filter((p: any) => p.accountType === "public");

    // Sort by latest post
    publicPosts.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setAllPosts(publicPosts);
    setVisiblePosts(publicPosts.slice(0, 5)); // Show first 5
  }, []);

  // 🔹 Load more posts on scroll
  const loadMore = () => {
    if (visiblePosts.length >= allPosts.length) {
      setHasMore(false);
      return;
    }
    setVisiblePosts((prev) => [
      ...prev,
      ...allPosts.slice(prev.length, prev.length + 5),
    ]);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 py-8 lg:ml-25 md:ml-25">
        <h1 className="text-3xl font-bold mb-6">ShareMind Feed</h1>

        {/* Infinite Scroll Section */}
        <InfiniteScroll
          dataLength={visiblePosts.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="text-center py-4">
              <Spin />
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 py-4">
              No more posts to show
            </p>
          }
        >
          <div className="flex flex-col gap-6 lg:w-100 md:w-100 mx-auto">
            {visiblePosts.map((post) => (
              <Card
                key={post.postId}
                className="bg-[#111] border border-gray-800 text-white"
              >
                {/* User info row */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    src={post.profilePic || Default_User}
                    size={48}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{post.fullName}</h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Post Image */}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="rounded-lg w-full max-h-[450px] object-cover mb-4"
                  />
                )}

                {/* Post Content */}
                <p className="text-gray-200 mb-4">{post.content}</p>

                {/* Like / Comment Area */}
                <div className="flex gap-4">
                  <Button
                    icon={<HeartOutlined />}
                    type="default"
                    className="bg-gray-800 text-white"
                  >
                    Like
                  </Button>

                  <Button
                    icon={<CommentOutlined />}
                    type="default"
                    className="bg-gray-800 text-white"
                  >
                    Comment
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
