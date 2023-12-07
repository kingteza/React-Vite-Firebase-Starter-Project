import './index.css';

import { useCallback, useMemo } from 'react';
import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PermissionAndRoleRoute from './components/routes/PermissionAndRoleRoute';
import routes, { AppRoute } from './routes';

function App() {
  const generateRoute = useCallback((appRoute: AppRoute, index: number) => {
    const component = appRoute.component ?? <Outlet />;
    const defaultRoute = appRoute.default;
    return (
      <Route
        key={appRoute.path}
        path={appRoute.path}
        element={
          <PermissionAndRoleRoute permissions={appRoute.permission} roles={appRoute.role}>
            {component}
          </PermissionAndRoleRoute>
        }
      >
        {(appRoute.subRoutes ?? []).map((route, i) => generateRoute(route, i))}
        {defaultRoute && (
          <Route path="*" element={<Navigate to={defaultRoute} replace />} />
        )}
      </Route>
    );
  }, []);

  const children = useMemo(() => routes.map(generateRoute), [generateRoute]);

  return (
    <BrowserRouter>
      <Routes>{children}</Routes>
    </BrowserRouter>
  );
}

export default App;
