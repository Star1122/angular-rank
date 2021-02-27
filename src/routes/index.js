import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Contributors from 'containers/Contributors';
import ContributorDetail from 'containers/Contributors/ContributorDetail';
import Repositories from 'containers/Repositories';
import RepositoryDetail from 'containers/Repositories/RepositoryDetail';

function Routes() {
  return (
    <Switch>
      <Route exact path="/contributors" component={Contributors} />
      <Route exact path="/contributors/:contributorId" component={ContributorDetail} />
      <Route exact path="/repositories" component={Repositories} />
      <Route exact path="/repositories/:repositoryId" component={RepositoryDetail} />

      <Redirect to="/contributors" />
    </Switch>
  );
}

export default Routes;
