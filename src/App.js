import React from 'react';
import Blog from './containers/Blog/Blog';
import Home from './containers/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import './App.css';
import Edit from './component/Blogging/Edit/Edit';
import Add from './component/Blogging/Add/Add';
import ShowBlog from './component/Blogging/ShowBlog/ShowBlog';
import SignUp from './component/Authentication/SignUp/SignUp';
import { AuthProvider } from './component/Authentication/AuthContext/AuthContext';
import SignIn from './component/Authentication/SignIn/SignIn';
import Dashboard from './containers/Dashboard/Dashboard';
import PrivateRoutes from './component/Authentication/PrivateRoutes/PrivateRoutes';
import ForgotPw from './component/Authentication/ForgotPw/ForgotPw';
import UpdateProfile from './component/Profile/UpdateProfile/UpdateProfile';
import BrowseBlog from './containers/BrowseBlog/BrowseBlog';
import ProfileGallery from './component/Profile/ProfileGallery/ProfileGallery';
import SavedPosts from './component/Profile/SavedPosts/SavedPosts';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/browse" component={BrowseBlog} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path='/forgot-password' component={ForgotPw} />
          <Route path='/edit-profile' component={UpdateProfile} />
          <PrivateRoutes path="/profile-blogs" exact component={Dashboard} />
          <PrivateRoutes path="/profile-gallery" exact component={ProfileGallery} />
          <PrivateRoutes path="/profile-saved" exact component={SavedPosts} />
          <Route path="/profile/my-blogs/new" exact component={Add} />
          <Route path="/my-blogs/:id/" exact component={ShowBlog} />
          <Route path="/profile/my-blogs/:id/edit" component={Edit} />
          <Route path="/profile/my-blogs" component={Blog} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
export default App;
