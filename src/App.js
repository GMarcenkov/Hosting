import React,{Fragment} from 'react';
import './App.css';
import Routes from "./client/desktop/routes";
import AdminRoutes from "./client/admin/routes";

function App() {
  return (
    <Fragment>
      <Routes/>
      <AdminRoutes/>
    </Fragment>
  );
}

export default App;
