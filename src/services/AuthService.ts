/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

export interface SignUpRequest {
  username: string;
  name: string;
  password: string;
}

class AuthService {
  async logout() {
    throw new Error('Not implemented');
  }

  async signIn(body: {
    username?: string;
    password?: string;
    idToken?: string;
  }): Promise<{ idToken: string }> {
    throw new Error('Not implemented');
  }
  async getCurrentUser() {
    // const data = await window.sender.send('auth.me');
    // return data as UserPrincipal;
  }

  async register(body: SignUpRequest): Promise<{ idToken: string }> {
    throw new Error('Not implemented');
  }
}

export default new AuthService();
