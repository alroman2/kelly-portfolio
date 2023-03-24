// src/components/Layout.js

import React from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;