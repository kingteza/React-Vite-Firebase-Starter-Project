/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

enum ErrorCode {
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  CUSTOMER_ID_MUST_BE_SETUP_BY_ADMIN = 'CUSTOMER_ID_MUST_BE_SETUP_BY_ADMIN',
  CONNECTION_ID_MUST_BE_SETUP_BY_ADMIN = 'CONNECTION_ID_MUST_BE_SETUP_BY_ADMIN',
}

export default ErrorCode;
