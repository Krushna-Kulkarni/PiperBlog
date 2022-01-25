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


{/* Outlet Private Protected Route  */}
          <Route path="/create-post" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<CreatePost />} />
          </Route>
          <Route path="/update-post/:id" element={<PrivateProtectedRoute />}>
                    <Route path="" element={<UpdatePost />} />
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