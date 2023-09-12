import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegisterForm from './components/LoginRegisterForm';
import HomePage from './pages/HomePage';
import SubmitPage from './pages/SubmitPage';
import NotFoundPage from './pages/NotFoundPage';
import PostDetailPage from './pages/PostDetailPage';
import SubredditPage from './pages/SubredditPage';
import UserPage from './pages/UserPage';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PublicRoute from './utils/PublicRoute';



const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<PublicRoute><LoginRegisterForm /></PublicRoute> } />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/submit" element={<PrivateRoute><SubmitPage /></PrivateRoute>} />
          <Route path="/:subredditName/submit" element={<PrivateRoute><SubmitPage /></PrivateRoute>} />
          <Route path="/r/:subredditName/comments/:postId" element={<PrivateRoute> <PostDetailPage /></PrivateRoute>} />
          <Route path="/r/:subredditName" element={<PrivateRoute><SubredditPage /></PrivateRoute>} />
          <Route path="/u/:username" element={<PrivateRoute><UserPage /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
