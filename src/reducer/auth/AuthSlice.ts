/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { auth } from 'config/firebase/FirebaseConfig';
import { translations } from 'config/localization/translations';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { t } from 'i18next';
import UserPrincipal from 'models/user/UserPrincipal';
import CrudMessageShower from 'util/message/CrudMessageShower';
import MessageUtil from 'util/message/MessageUtil';

const name = 'T';
type Type = any;

export interface State {
  items: Type[];
  item?: Type;
  signing: boolean;
  error?: SerializedError;
  currentUser?: UserPrincipal;
  gettingCurrentUserDetails: boolean;
  errorGettingCurrentUserDetails?: Error;
}

const initialState: State = {
  items: [],
  signing: false,
  gettingCurrentUserDetails: false,
  errorGettingCurrentUserDetails: undefined,
};

export const signIn = createAsyncThunk(
  'signIn',
  async ({ email, password }: { email; password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      MessageUtil.showSuccess(t(translations.message.success.login));
    } catch (e) {
      MessageUtil.showError((e as any).code);
      console.error(e);
      throw e;
    }
  },
);

const slice = createSlice({
  name: name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signing = true;
        state.error = undefined;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.signing = false;
        // state.items = payload;
      })
      .addCase(signIn.rejected, (state, { error }) => {
        state.signing = false;
        state.error = error;
      });
  },
});

export default slice.reducer;
