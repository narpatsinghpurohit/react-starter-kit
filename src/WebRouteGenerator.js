import { Route } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import React from "react";
import PropTypes from "prop-types";
import "react-router-modal/css/react-router-modal.css";
import Header from "../Header.web";
import Footer from "../Footer.web";

function Wrapper({ element, history, match, routeMap, closeModal, isModal }) {
  const navigate = (to, params) => {
    let url = routeMap[to].path;
    // replace params ids in the url with actual values
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach(param => {
        const re = RegExp(`\:${param}\\??`); // eslint-disable-line no-useless-escape
        url = url.replace(re, escape(params[param]));
      });
    }
    // removing empty params from url - every string between /: and ?
    url = url.replace(/\/:(.*?)(?=\/|$)/g, "");
    // if the route is not a modal
    if (!routeMap[to].modal) {
      history.push(url);
      // if the route is a modal
    } else {
      // checking if the url ends with a slash or not
      const slash = /\/$/.test(match.url) ? "" : "/";
      // current url in the browser + slash + modal url with parameters
      url = match.url + slash + url;
      // removing the */ from the url
      url = url.replace(/\*\/?/g, "");
      history.push(url);
    }
  };

  const getParam = (param, alternative) => {
    return match.params[param] || alternative;
  };

  const goBack = () => {
    history.goBack();
  };

  let navigation = { navigate, getParam, goBack };
  const hideHeaderFooter = match.path === "/";
  return (
    <>
      {isModal ?
        <>
          {React.cloneElement(element, {
            navigation: navigation,
            closeModal
          })}
        </> : <>
          {!hideHeaderFooter && <Header navigation={navigation} />}
          {
            React.cloneElement(element, {
              navigation: navigation,
              closeModal
            })
          }
          {!hideHeaderFooter && < Footer />}
        </>}

    </>
  )

}

Wrapper.propTypes = {
  element: PropTypes.element,
  history: PropTypes.object,
  routeMap: PropTypes.object,
  closeModal: PropTypes.func,
  match: PropTypes.object
};

const WebRoutesGenerator = ({ routeMap }) => {
  return Object.keys(routeMap).map(route => {
    const currentRoute = routeMap[route];
    const Component = currentRoute.component;
    const isModal = currentRoute.modal;
    if (currentRoute.modal) {
      return (
        <ModalRoute
          key={currentRoute.path}
          path={currentRoute.path}
          component={props => (
            <Wrapper element={<Component />} {...props} routeMap={routeMap} isModal={isModal}/>
          )}
        />
      );
    } else {
      return (
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          exact={currentRoute.exact}
          render={props => (
            <Wrapper element={<Component />} {...props} routeMap={routeMap} isModal={isModal}/>
          )}
        />
      );
    }
  });
};

WebRoutesGenerator.propTypes = {
  routeMap: PropTypes.object
};

export default WebRoutesGenerator;
