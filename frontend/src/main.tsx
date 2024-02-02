import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/Home';
import ListContainers from './pages/ListContainers';
import LoadingState from'./context/loading/LoadingState';

const router = createBrowserRouter([{
  path: '/',
  element:  <Home />
}, {
  path: '/list-containers',
  element: <ListContainers />
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingState>
    <RouterProvider router={router} />
    </LoadingState>
  </React.StrictMode>,
)
