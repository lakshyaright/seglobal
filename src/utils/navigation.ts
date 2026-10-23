import { useState, useEffect } from 'react';
import { RouteView } from '../types/product.ts';

export function getInitialRoute(): RouteView {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.includes('/admin') || hash.includes('admin') || search.includes('page=admin') || search.includes('role=admin')) {
    return 'admin';
  }
  return 'public';
}

export function useAppRoute() {
  const [route, setRoute] = useState<RouteView>(getInitialRoute);

  useEffect(() => {
    const handleUrlChange = () => {
      setRoute(getInitialRoute());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (newRoute: RouteView) => {
    setRoute(newRoute);
    const targetPath = newRoute === 'admin' ? '/admin' : '/';
    try {
      window.history.pushState({}, '', targetPath);
    } catch {
      // Fallback for sandboxed environments
      window.location.hash = newRoute === 'admin' ? '#admin' : '#';
    }
  };

  return { route, navigateTo };
}
