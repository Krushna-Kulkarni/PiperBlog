import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar';
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';
import UpdateCategory from './components/Categories/UpdateCategory';
import PrivateProtectedRoute from './components/Navigation/ProtectedRoutes/PrivateProtectedRoute';
import AdminRoute from './components/Navigation/ProtectedRoutes/AdminRoute';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import UpdateComment from './components/Comments/UpdateComment';
import Profile from './components/Users/Profile/Profile';
import UploadProfilePhoto from './components/Users/Profile/UploadProfilePhoto';
import UpdateProfileForm from './components/Users/Profile/UpdateProfileForm';
import SendEmail from './components/Users/Emailing/SendEmail';
import AccountVerified from './components/Users/AccountVerification/AccountVerified';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

{/* Non Protected Route  */}
        <Route path="/" element={<HomePage />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/posts" element={<PostsList />}/>
        <Route path="/posts/:id" element={<PostDetails />}/>





{/* Outlet Admin Protected Route */}
          <Route path="/add-category" element={<AdminRoute />}>
                    <Route path="" element={<AddNewCategory />} />
          </Route>


          <Route path="/category-list" element={<AdminRoute />}>
                    <Route path="" element={<CategoryList />} />
          </Route>


          <Route path="/update-category/:id" element={<AdminRoute />}>
                    <Route path="" element={<UpdateCategory />} />
          </Route>

          <Route path="/send-email" element={<AdminRoute />}>
                    <Route path="" element={<SendEmail />} />
          </Route>


{/* Outlet Private Protected Route  */}
          <Route path="/create-post" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<CreatePost />} />
          </Route>
          <Route path="/update-post/:id" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<UpdatePost />} />
          </Route>

          <Route path="/update-comment/:id" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<UpdateComment />} />
          </Route>

          <Route path="/profile/:id" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<Profile />} />
          </Route>

          <Route path="/upload-profile-photo/:id" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<UploadProfilePhoto />} />
          </Route>

          <Route path="/update-profile/:id" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<UpdateProfileForm />} />
          </Route>

          <Route path="/verify-account/:token" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<AccountVerified />} />
          </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;







// {/* Nested protected Route *-------------------/}
// {/* 
//         <Route
//           path="/add-category"
//           element={
//             <PrivateProtectedRoute>
//               <AddNewCategory />
//             </PrivateProtectedRoute>
//           }
//         /> */}


// {/* Non Protected Route*--------------/}

// {/* <Route
//           path="/add-category"
//           element={
//               <AddNewCategory />
//           }
//         /> */}


// {/* <Route path="/add-category" element={<CategoryList />}/> */}