import { useEffect, useState } from "react";
import { getRecentPosts } from "../api/postApi";
import { PostList } from "../components/PostList";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getRecentPosts(3)
      .then(data => setPosts(data.posts))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Recent Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}
