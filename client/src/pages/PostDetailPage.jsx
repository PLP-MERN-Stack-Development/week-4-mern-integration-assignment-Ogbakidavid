import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

const PostDetailPage = () => {
    const { id } = useParams();
    const { currentPost, setCurrentPost } = usePosts();

    useEffect(() => {
        setCurrentPost(id);
    }, [id]);

    if (!currentPost) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
            <div className="flex items-center mb-6">
                <span className="text-gray-600 mr-4">
                    Posted on {new Date(currentPost.createdAt).toLocaleDateString()}
                </span>
                {currentPost.category && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {currentPost.category.name}
                    </span>
                )}
            </div>
            {currentPost.featuredImage && (
                <img
                    src={`/uploads/${currentPost.featuredImage}`}
                    alt={currentPost.title}
                    className="w-full h-64 object-cover mb-6 rounded"
                />
            )}
            <div className="prose max-w-none">
                <p>{currentPost.content}</p>
            </div>
        </div>
    );
};

export default PostDetailPage;