import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    MERN Blog
                </Link>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/create-post" className="hover:text-blue-600">
                                Create Post
                            </Link>
                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-red-800"
                            >
                                Logout
                            </button>
                            <span className="text-gray-600">{user.username}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-600">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-blue-600">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;