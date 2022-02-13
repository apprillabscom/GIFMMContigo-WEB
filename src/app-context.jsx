import React from "react";
import AuthContext from "./authContext";
import app from './Firebase/firebase.config'

/**
 * Maneja las operacion de signIn, signOut, signUp, registro y consulta de usuarios contra firebase authentication y firebase real-time
 */
const AuthState = (props) => {
  

  
  /**
   * metodo que consulta los parametros de configuracion contra la base de datos realtime.firebase
   */
  const getConfig = () => {
    return new Promise((resolve, reject) => {
      app.database()
        .ref("/config/")
        .once("value", (snapshot) => {
          if (snapshot.hasChildren())
          resolve(snapshot.val());
        })
        .catch((error) => {
          alert(error);
          resolve(false);
        });
    });
  };
  
  
  return (
    <AuthContext.Provider
      value={{
        getConfig,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
