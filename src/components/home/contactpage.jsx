import React from 'react'
import Notificationbanner from './notificationbanner';
import Header from './header';
import Contact from './contact';

function ContactPage() {
  return (
	<div className="max-h-screen w-full overflow-y-scroll">
	<Notificationbanner/>
	<Header />
	<Contact/>
	</div>
  )
}

export default ContactPage
