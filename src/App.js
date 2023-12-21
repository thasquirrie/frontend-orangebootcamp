import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/DashboardLayout/MainLayout';
import Home from './layout/pages/LandingPage';
import SignUp from "./layout/AuthLayout/SignUp"
import Login from "./layout/AuthLayout/Login"
import News from './layout/DashboardLayout/News'
import NotFound from './layout/pages/NotFound';
import AuthRequired from './layout/AuthLayout/AuthRequired';
import DashboardLayout from './layout/DashboardLayout/DashoardLayout';
import ChatLayout from './layout/DashboardLayout/ChatLayouts/ChatLayout';
import ResetPassword from './layout/AuthLayout/ResetPassword';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="h-screen font-nunito">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="SignUp" element={<SignUp />}/>
                <Route path="login" element={<Login />}/>
                <Route path="ResetPassword" element={<ResetPassword />}/>

                <Route element={<AuthRequired />}>
                    <Route path="dashboard" element={<DashboardLayout />}>
                        <Route index element={<ChatLayout />} />
                        <Route path="chat" element={<ChatLayout />} />
                        <Route path="news" element={<News />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
