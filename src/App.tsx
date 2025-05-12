

import './App.css'
import Home from './Components/Home/Home'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import Category from './Components/Category/Category'
import SubCategory from './Components/SubCategory/SubCategory'
import Admin from './Components/LayoutAdmin/LayoutAdmin'
import DashBoard from './Components/Dashboard/DashBoard'
import LayOutAdmin from './Components/Layout/LayOutAdmin'
import CreateCategory from './Components/CreateCategory/CreateCategory'
import CreateBrand from './Components/CreateBrand/CreateBrand'
import ProductListPage from './Components/Product/Product'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Profile from './Components/Profile/Profile'
import CreateSubCategory from './Components/CreateSubCategory/CreateSubCategory'
import AddProduct from './Components/AddProduct/AddProduct'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {path: "/forgetPassword",
        element: <ForgetPassword />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/Subcategory/:id",
          element: <SubCategory />,
        },{
          path:"product",
          element: <ProductListPage />,
        },{
          path:"/brand",
          element:<Brands/>
        },{
          path:"/cart",
          element:<Cart/>
        },{
          path:"/profile",
          element:<Profile/>
        },{
          path:"/addProduct",
          element:<AddProduct/>
        },
        {
          path:"/layoutAdmin",
          element: <LayOutAdmin />,children: [
            {
              index: true,
              element: <DashBoard />,
            },{
              path: "createCategory",
              element: <CreateCategory />, 
            },{
              path:"createBrand",
              element: <CreateBrand />,
            },{
              path:"createSubCategory",
              element:<CreateSubCategory/>
            },
            {
        }
     
      ]
        }
      ]
    }
  ])

  return (
    <>
     <RouterProvider router={router}></RouterProvider>
   
    </>
  )
}

export default App
