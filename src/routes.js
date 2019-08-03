import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import PrivateRoutes from './components/authRoutes/PrivatesRoutes';
import PublicRoutes from './components/authRoutes/PublicRoutes';
import Home from './components/Home';
import SignIn from './components/SignIn';

import Dashboard from './components/Admin/Dashboard';
import AdminMatches from './components/Admin/Matches';
import EditMatch from './components/Admin/Matches/EditMatch';

function Routes(props) {

  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoutes {...props} path="/admin_match/add_match" exact component={EditMatch} />
          <PrivateRoutes {...props} path="/admin_match/edit_match/:id" exact component={EditMatch} />
          <PrivateRoutes {...props} path="/admin_match" exact component={AdminMatches} />
          <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
          <PublicRoutes  {...props} restricted={true} path="/sign_in" exact component={SignIn} />
          <PublicRoutes  {...props} restricted={false} path="/" exact component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

export default Routes;
