/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProductProvider } from './context/ProductContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AdProvider } from './context/AdContext.tsx';
import { useAppRoute } from './utils/navigation.ts';
import { PublicStorefront } from './components/PublicStorefront.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { AdminLogin } from './components/AdminLogin.tsx';

function AppContent() {
  const { route, navigateTo } = useAppRoute();
  const { isAuthenticated } = useAuth();

  // Admin Route (/admin)
  if (route === 'admin') {
    // If user is not authorized, gate access with login screen
    if (!isAuthenticated) {
      return <AdminLogin onBackToPublic={() => navigateTo('public')} />;
    }
    // Only authorized users can see the admin management portal
    return <AdminPortal onViewPublic={() => navigateTo('public')} />;
  }

  // Public Customer Storefront (/)
  // Contains strictly ONE single admin button in the navbar, no clutter
  return <PublicStorefront onOpenAdmin={() => navigateTo('admin')} />;
}

export default function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <ThemeProvider>
          <AdProvider>
            <AppContent />
          </AdProvider>
        </ThemeProvider>
      </AuthProvider>
    </ProductProvider>
  );
}
