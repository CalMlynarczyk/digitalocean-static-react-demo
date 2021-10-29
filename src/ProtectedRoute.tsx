import React, { ComponentType } from "react";
import { Route, RouteProps } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

const ProtectedRoute = ({
  component,
  ...args
}: RouteProps & {
  component: ComponentType<any>;
}) => (
  <Route
    {...args}
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
  />
);

export default ProtectedRoute;
