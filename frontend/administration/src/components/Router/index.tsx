import { Fragment, lazy } from 'react';
import { Route, Routes } from 'react-router';
import SidebarProvider from 'src/contexts/SidebarContext';
import UserProvider from 'src/contexts/UserContext';
import AuthLayout from 'src/layouts/AuthLayout';
import RouteType from 'src/models/Route';

const Router = () => {
  return (
    <Routes>
      {RoutesList.map((route, index) => renderRoute(route, index))}
    </Routes>
  );
};

const renderRoute = (route: RouteType, index: number) => {
  const {
    path,
    component: Component,
    layout: Layout,
    layoutProps,
    guard: Guard,
    guardProps
  } = route;

  const RouteLayout: any = Layout ?? Fragment;
  const RouteGuard: any = Guard ?? Fragment;

  return (
    <Route
      element={
        <RouteGuard {...guardProps}>
          <SidebarProvider>
            <UserProvider>
              <RouteLayout {...layoutProps}>
                <Component />
              </RouteLayout>
            </UserProvider>
          </SidebarProvider>
        </RouteGuard>
      }
      path={path}
      key={index}
    />
  );
};

const RoutesList: RouteType[] = [
  {
    path: '/devices',
    component: lazy(() => import('src/pages/devices')),
    layout: AuthLayout
  },
  {
    path: '/clusters',
    component: lazy(() => import('src/pages/clusters')),
    layout: AuthLayout
  },
  {
    path: '/employees',
    component: lazy(() => import('src/pages/employees')),
    layout: AuthLayout
  },
  {
    path: '/history',
    component: lazy(() => import('src/pages/logs')),
    layout: AuthLayout
  },
  {
    path: '/*',
    component: lazy(() => import('src/components/FallbackScreen')),
    layout: AuthLayout
  }
];

export default Router;
