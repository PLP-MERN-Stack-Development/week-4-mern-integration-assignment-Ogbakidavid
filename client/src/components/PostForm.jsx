import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

const PostForm = () => {
    const { currentPost, addPost, updatePost } = usePosts();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [featuredImage, setFeaturedImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id && currentPost) {
            setFormData({
                title: currentPost.title,
                content: currentPost.content,
                category: currentPost.category?._id || ''
            });
        }
    }, [id, currentPost]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setFeaturedImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('category', formData.category);
        if (featuredImage) {
            formDataToSend.append('featuredImage', featuredImage);
        }

        try {
            if (id) {
                await updatePost(id, formDataToSend);
            } else {
                await addPost(formDataToSend);
            }
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    rows="6"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Featured Image</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {id ? 'Update Post' : 'Create Post'}
            </button>
        </form>
    );
};

export default PostForm;