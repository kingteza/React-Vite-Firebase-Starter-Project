/* *****************************************************************************
 Copyright (c) 2020-2021 Wisipsy and/or its affiliates. All rights reserved.
 WISIPSY PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import LoadingIndicator from 'components/common/loading/LoadingIndicator';
import { auth } from 'config/firebase/FirebaseConfig';
import { User } from 'firebase/auth';
import UserPrincipal from 'models/user/UserPrincipal';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'reducer/store';

interface CurrentUser extends UserPrincipal {}

const UserContext = React.createContext<CurrentUser>(undefined as any);

export default UserContext;

export const useUserContext = () => useContext(UserContext);

// eslint-disable-next-line react/display-name
export const withCurrentUserContext = (Component) => (props) => {
  const dispatch = useAppDispatch();
  const { currentUser, gettingCurrentUserDetails, errorGettingCurrentUserDetails } =
    useAppSelector((s) => s.auth);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(gettingCurrentUserDetails);
  }, [gettingCurrentUserDetails, errorGettingCurrentUserDetails]);

  useEffect(() => {
    // setDetails();

    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setLoading(false);
      } else {
        console.log('User is ', user);
        localStorage.setItem('redirect', window.location.pathname);
        navigate('/login');
        setLoading(false);
      }
    });
  }, [navigate]);

  return (
    <UserContext.Provider value={currentUser as any}>
      {loading ? <LoadingIndicator loading={loading} /> : <Component {...props} />}
    </UserContext.Provider>
  );
};
