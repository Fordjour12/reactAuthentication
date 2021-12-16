import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import decode from "jwt-decode";
// import useToken from "./config/helpers";
// import { getToken, setToken } from "./config/helpers";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    let navigate = useNavigate();

    const checkAuth = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        //   const refreshToken = localStorage.getItem("refreshToken");
        if (!isAuth === !token || !userId) {
            return <Auth />;
        }

        try {
            // { exp: 12903819203 }
            const { exp } = decode(token);

            if (exp < new Date().getTime() / 1000) {
                return false;
            }
        } catch (e) {
            return false;
        }

        return true;
    };

    const AuthRoute = ({ component: Component, ...rest }) => {
        <Route
            {...rest}
            render={(props) =>
                checkAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
            }
        />;
    };

    <Routes>
        <Route
            exact
            path="/DashBoard"
            render={(props) => <Dashboard {...props} />}
        />
        <Route exact path="/Home" render={(props) => <Home {...props} />} />
        <AuthRoute exact path="/auth" component={Auth} />
    </Routes>;
};

export default App;

// import React from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import decode from "jwt-decode";
//
// import Auth from "./Auth";
// import Login from "./Login";
// import Register from "./Register";
// import Book from "./Book";
// import PageNotFound from "./PageNotFound";
//
// const checkAuth = () => {
//   const token = localStorage.getItem("token");
//   const refreshToken = localStorage.getItem("refreshToken");
//   if (!token || !refreshToken) {
//     return false;
//   }
//
//   try {
//     // { exp: 12903819203 }
//     const { exp } = decode(refreshToken);
//
//     if (exp < new Date().getTime() / 1000) {
//       return false;
//     }
//   } catch (e) {
//     return false;
//   }
//
//   return true;
// };
//
// const AuthRoute = ({ component: Component, ...rest }) =>
//   <Route
//     {...rest}
//     render={props =>
//       checkAuth()
//         ? <Component {...props} />
//         : <Redirect to={{ pathname: "/login" }} />}
//   />;
//
// export default () =>
//   <BrowserRouter>
//     <Switch>
//       <Route exact path="/login" render={props => <Login {...props} />} />
//       <Route exact path="/register" render={props => <Register {...props} />} />
//       <Route exact path="/book/:id" render={props => <Book {...props} />} />
//       <Route exact path="/404" component={PageNotFound} />
//       <AuthRoute exact path="/auth" component={Auth} />
//     </Switch>
//   </BrowserRouter>
