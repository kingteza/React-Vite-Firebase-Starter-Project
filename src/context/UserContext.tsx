/* *****************************************************************************
 Copyright (c) 2020-2021 Wisipsy and/or its affiliates. All rights reserved.
 WISIPSY PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import LoadingIndicator from 'components/common/loading/LoadingIndicator';
import { onAuthStateChanged } from 'firebase/auth';
import UserPrincipal from 'models/UserPrincipal';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import AuthService from 'services/auth/AuthService';

interface CurrentUser extends UserPrincipal {
  loading?: boolean;
}

const UserContext = React.createContext<CurrentUser>(undefined as any);

export default UserContext;

export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line react/display-name
export const withCurrentUserContext = (Component) => (props) => {
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<CurrentUser>({} as any);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    // return onAuthStateChanged((user: any) => {
    //   setLoading(false);
    //   if (user) {
    //     AuthService.getCurrentUser().then((e) => {
    //       setLoading(false);
    //       setCurrentUser(e);
    //     });
    //   } else {
    //     navigate('/login');
    //   }
    // });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{...currentUser as any, loading}}>
      {loading ? <LoadingIndicator loading={loading} /> : <Component {...props} />}
    </UserContext.Provider>
  );
};
