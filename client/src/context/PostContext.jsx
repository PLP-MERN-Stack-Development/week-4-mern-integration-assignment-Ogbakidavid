import { createContext, useContext, useState} from 'react';
import * as api from '../services/api';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPosts = async () => {
        setLoading(true);
        try {
            const { data } = await api.fetchPosts();
            setPosts(data);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    const addPost = async (newPost) => {
        try {
            const { data } = await api.createPost(newPost);
            setPosts([...posts, data]);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }

    const updatePost = async (id, updatedPost) => {
        try {
            const { data } = await api.updatePost(id, updatedPost);
            setPosts(posts.map(post => post._id === id ? data : post));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }

    const deletePost = async (id) => {
        try {
            await api.deletePost(id);
            setPosts(posts.filter(post => post._id !== id))
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <PostContext.Provider value={{
            posts,
            currentPost,
            setCurrentPost,
            loading,
            error,
            getPosts,
            addPost,
            updatePost,
            deletePost       
        }}
        >
            { children }
        </PostContext.Provider>
    )
};

export const usePosts = () => useContext(PostContext);