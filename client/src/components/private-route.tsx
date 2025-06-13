import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';

type AuthorizationStatusEnum = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatusEnum;
}

function PrivateRoute(props: PropsWithChildren<PrivateRouteProps>): React.ReactNode {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children 
      : <Navigate to={AppRoute.Login} />
  );
}

export { PrivateRoute };