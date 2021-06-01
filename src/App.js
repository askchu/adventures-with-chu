import React, { Suspense } from 'react';
// import Blog from './containers/Blog/Blog';
import Home from './containers/Home/Home';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import './App.css';
// import Add from './component/Blogging/Add/Add';
// import Edit from './component/Blogging/Add/Edit';
import ShowBlog from './component/Blogging/ShowBlog/ShowBlog';
import { AuthProvider } from './component/Authentication/AuthContext/AuthContext';
import SignUp from './component/Authentication/SignUp/SignUp';
// import SignIn from './component/Authentication/SignIn/SignIn';
import Dashboard from './containers/Dashboard/Dashboard';
import PrivateRoutes from './component/Authentication/PrivateRoutes/PrivateRoutes';
import ForgotPw from './component/Authentication/ForgotPw/ForgotPw';
// import UpdateProfile from './component/Profile/UpdateProfile/UpdateProfile';
import BrowseBlog from './containers/BrowseBlog/BrowseBlog';
// import ProfileGallery from './component/Profile/ProfileGallery/ProfileGallery';
// import ProfileFollowing from './component/Profile/ProfileFollowing/ProfileFollowing';
// import ProfileFollowers from './component/Profile/ProfileFollowers/ProfileFollowers';
// const SignUp = React.lazy(() => import('./component/Authentication/SignUp/SignUp'));
import SavedPosts from './component/Profile/SavedPosts/SavedPosts';
import ShowUsersBlogs from './component/Blogging/ShowBlog/ShowUsersBlog/ShowUsersBlogs';

const SignIn = React.lazy(() => import('./component/Authentication/SignIn/SignIn'));
const ProfileFollowing = React.lazy(() => import('./component/Profile/ProfileFollowing/ProfileFollowing'));
const ProfileFollowers = React.lazy(() => import('./component/Profile/ProfileFollowers/ProfileFollowers'));
const Add = React.lazy(() => import('./component/Blogging/Add/Add'));
const Edit = React.lazy(() => import('./component/Blogging/Add/Edit'));
const ProfileGallery = React.lazy(() => import('./component/Profile/ProfileGallery/ProfileGallery'));
const UpdateProfile = React.lazy(() => import('./component/Profile/UpdateProfile/UpdateProfile'))


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Suspense fallback>={<p>Loading...</p>}
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoutes path="/browse" component={BrowseBlog} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path='/forgot-password' component={ForgotPw} />
            <Route path='/edit-profile' component={UpdateProfile} />
            <PrivateRoutes path="/profile-blogs" exact component={Dashboard} />
            <PrivateRoutes path="/profile-gallery" exact component={ProfileGallery} />
            <PrivateRoutes path="/profile-following" exact component={ProfileFollowing} />
            <PrivateRoutes path="/profile-followers" exact component={ProfileFollowers} />
            <PrivateRoutes path="/profile-saved" exact component={SavedPosts} />
            <PrivateRoutes path="/profile-blogs-new" exact component={Add} />
            <PrivateRoutes path="/profile-blogs/:id/edit" exact component={Edit} />
            <PrivateRoutes path="/profile/blogs/:id" component={ShowBlog} />
            <Route path="/:user/blogs/:id/" exact component={ShowUsersBlogs} />



          </Switch>
        </Suspense>
        {/* <Footer /> */}
      </AuthProvider>
    </Router>
  );
}
export default App;
