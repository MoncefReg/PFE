import { Fragment, lazy } from 'react';
import { Route, Routes } from 'react-router';
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

  const RouteLayout: any = Layout ? <Layout {...layoutProps} /> : Fragment;
  const RouteGuard: any = Guard ? <Guard {...guardProps} /> : Fragment;

  return (
    <Route
      element={
        <RouteGuard>
          <RouteLayout>
            <Component />
          </RouteLayout>
        </RouteGuard>
      }
      path={path}
      key={index}
    />
  );
};

const RoutesList: RouteType[] = [
  { path: '/*', component: lazy(() => import('src/components/FallbackScreen')) }
];

export default Router;
