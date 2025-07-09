import { useEffect } from "react";
import { usePosts } from '../context/PostContext';
import PostCard from './PostCard';

const PostList = () => {
    const { posts, getPosts, loading, error } = usePosts();

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!Array.isArray(posts)) return <div>No posts available</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            ) : (
                <div className="col-span-full text-center py-8">
                    No posts found
                </div>
            )}
        </div>
    )
};

export default PostList;