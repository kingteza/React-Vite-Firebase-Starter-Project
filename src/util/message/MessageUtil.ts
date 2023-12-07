/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { message } from 'antd';
import { translations } from 'config/localization/translations';
import { t } from 'i18next';
import ErrorCode from 'services/ErrorCode';

const showCreating = (modelName: string, key?: any) => {
  message.loading({
    content: `${t(translations.message.loading.saving)} ${modelName}`,
    key,
  });
};

const showErrorCreating = (modelName: string, key?: any, errorCode?: ErrorCode) => {
  let content;
  if (errorCode) {
    content = `${t(translations.err.code[errorCode])}`;
  } else {
    content = `${t(translations.err.save)} ${modelName}`;
  }
  message.error({
    content,
    key,
  });
};

const showSuccessCreating = (modelName: string, key?: any) => {
  message.success({
    content: `${t(translations.message.success.saved)} ${modelName}`,
    key,
  });
};

const showDeleting = (modelName: string, key?: any) => {
  message.loading({
    content: `${t(translations.message.loading.deleting)} ${modelName}`,
    key,
  });
};

const showErrorDeleting = (modelName: string, key?: any, errorCode?: ErrorCode) => {
  let content;
  if (errorCode) {
    content = `${t(translations.err.code[errorCode])}`;
  } else {
    content = `${t(translations.err.delete)} ${modelName}`;
  }
  message.error({
    content: content,
    key,
  });
};

const showSuccessDeleting = (modelName: string, key?: any) => {
  message.success({
    content: `${t(translations.message.success.deleted)} ${modelName}`,
    key,
  });
};

const showUpdating = (modelName: string, key?: any) => {
  message.loading({
    content: `${t(translations.message.loading.updating)} ${modelName}`,
    key,
  });
};

const showErrorUpdating = (modelName: string, key?: any, errorCode?: ErrorCode) => {
  let content;
  if (errorCode) {
    content = `${t(translations.err.code[errorCode])}`;
  } else {
    content = `${t(translations.err.update)} ${modelName}`;
  }
  message.error({
    content,
    key,
  });
};

const showErrorGetting = (modelName: string, key?: any, errorCode?: ErrorCode) => {
  let content;
  if (errorCode) {
    content = `${t(translations.err.code[errorCode])}`;
  } else {
    content = `${t(translations.err.getting_all_data)} ${modelName}`;
  }
  message.error({
    content,
    key,
  });
};

const showSuccessUpdating = (modelName: string, key?: any, msg?: string) => {
  message.success({
    content: `${msg ?? t(translations.message.success.updated)} ${modelName}`,
    key,
  });
};

const showError = (errorCode?: ErrorCode, key?: any) => {
  let content;
  if (errorCode) {
    content = t(translations.err.code[errorCode]);
  } else {
    content = errorCode;
  }
  message.error({
    content,
    key,
  });
};

const showSuccess = (msg?: string, key?: any) => {
  message.success({
    content: msg,
    key,
  });
};

export default {
  showSuccess,
  showUpdating,
  showError,
  showErrorUpdating,
  showSuccessUpdating,
  showCreating,
  showErrorCreating,
  showSuccessCreating,
  showDeleting,
  showErrorDeleting,
  showSuccessDeleting,
  showErrorGetting,
};
