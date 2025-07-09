import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import PostForm from './components/PostForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PostProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/create-post" element={
                  <PrivateRoute>
                    <PostForm />
                  </PrivateRoute>
                } />
                <Route path="/edit-post/:id" element={
                  <PrivateRoute>
                    <PostForm />
                  </PrivateRoute>
                } />
              </Routes>
            </div>
          </div>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;