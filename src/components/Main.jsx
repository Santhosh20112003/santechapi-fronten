import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import App from './home/App';
import {UserAuthContextProvider} from "../components/context/UserAuthContext";
import Register from './auth/Register';
import Home from './dashboard/Structure';
import ProtectedRoute from './auth/ProtectedRoute';
import Forgetpassword from './auth/Forgetpassword';
import DashboardApiHubs from './dashboard/ApiHubs';
import DashboardApis from './dashboard/MyApis';
import DashboardProfile from './dashboard/profile';
import DashboardHome from './dashboard/Home';
import ApiList from './home/apilist';
import Contact from './home/contactpage';
import Pricing from './home/pricingpage';

function Main() {
  return (
	<BrowserRouter>
	<UserAuthContextProvider>
	<Routes>
			<Route path='' element={<Navigate to='home' />} />
			<Route path='*' element={<Navigate to='home' />} />
			<Route path='home' element={<App/>} />
			<Route path='apilist' element={<ApiList/>} />
			<Route path='contact' element={<Contact/>} />
			<Route path='pricing' element={<Pricing/>} />
			<Route path='login' element={<Login/>} />
			<Route path='register' element={<Register/>} />
			<Route path='forget-password' element={<Forgetpassword/>} />
			<Route path='dashboard' element={<ProtectedRoute>
				<Home/>
			</ProtectedRoute>} >
			<Route path='hubs' element={<ProtectedRoute><DashboardApiHubs/></ProtectedRoute>} />
			<Route path='*' element={<ProtectedRoute><Navigate to='home' /></ProtectedRoute>} />
			<Route path='apis' element={<ProtectedRoute><DashboardApis/></ProtectedRoute>} />
			<Route path='home' element={<ProtectedRoute><DashboardHome/></ProtectedRoute>} />
			<Route path='' element={<Navigate to='home' />} />
			<Route path='profile' element={<ProtectedRoute><DashboardProfile/></ProtectedRoute>} />
			</Route>
		</Routes>
	</UserAuthContextProvider>
	</BrowserRouter>
  )
}

export default Main;
