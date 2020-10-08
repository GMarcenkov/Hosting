import React from "react";
import jwt_decode from "jwt-decode";

let token;

if (localStorage.getItem("jwt") === null) {
  token = null;
} else {
  token = jwt_decode(localStorage.getItem("jwt"));
}

export function AuthenticatedRoute(props) {
  const loggedUser = token;

  // route requires admin priv
  if (loggedUser.isAdmin) {
    return <props.component {...props} />;
  } else {
    window.location.href = "/";
  }
  return <props.component {...props} />;
}
