import React from 'react';
import DemoBanner from './DemoBanner';
import Navbar from './Navbar';
import Footer from './Footer';

export function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DemoBanner />
      <Navbar />
      <main style={{ flex: '1 0 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

