import { useEffect } from 'react';
import { usePosts } from '../context/PostContext';
import PostList from '../components/PostList';

const HomePage = () => {
    const { getPosts } = usePosts();

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
            <PostList />
        </div>
    );
};

export default HomePage;