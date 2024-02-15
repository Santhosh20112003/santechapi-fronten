import React from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'
import Notificationbanner from './notificationbanner';
import Header from './header';
import Pricing from './pricing';

function Pricingpage() {
  const {user} = useUserAuth();
  return (
	<div className="max-h-screen w-full overflow-y-scroll">
	<Notificationbanner/>
	<Header />
	<Pricing/>
	</div>
  )
}

export default Pricingpage
