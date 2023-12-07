/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { message } from 'antd';
import { translations } from 'config/localization/translations';
import { t } from 'i18next';

type MessengerType = 'create' | 'read' | 'update' | 'delete';

type Action<T = any> = () => Promise<T>;

/**
 * This can show status of the CRUD operation with minimum code.
 *
 *   new CrudMessenger({type: 'create}).loading(); => showing creating message
 *
 */
export default class CrudMessenger<R = any> {
  private id: number;
  private modelName?: string | undefined;
  private type?: MessengerType | undefined;
  private action?: Action<R> | undefined;
  private successKey: string | undefined;
  private errorKey: string | undefined;
  private loadingKey: string | undefined;

  constructor(
    props: Partial<{
      modelName?: string;
      type: MessengerType;
      showOnGetting: boolean;
    }> = {},
    action?: Action,
  ) {
    this.id = Math.random();
    this.modelName = props?.modelName;
    this.type = props?.type;
    this.action = action;
    switch (this.type) {
      case 'create':
        this.successKey = translations.message.success.saved;
        this.errorKey = translations.err.save;
        this.loadingKey = translations.message.loading.saving;
        break;
      case 'update':
        this.successKey = translations.message.success.updated;
        this.loadingKey = translations.message.loading.updating;
        this.errorKey = translations.err.update;
        break;
      case 'read':
        if (props?.showOnGetting) {
          this.successKey = translations.message.success.got;
          this.loadingKey = translations.message.loading.getting;
        }
        this.errorKey = translations.err.getting_all_data;
        break;
      case 'delete':
        this.successKey = translations.message.success.deleted;
        this.errorKey = translations.err.delete;
        this.loadingKey = translations.message.loading.deleting;
    }
  }

  async run(
    onResult?: (
      rst?: R,
      error?: any,
    ) => { successKey?: string; errorKey?: string; loadingKey?: string },
  ) {
    if (this.action) {
      try {
        this.loading();
        const rst = await this.action();
        if (onResult) {
          Object.assign(this, onResult(rst));
        }
        this.success();
        return rst;
      } catch (e) {
        if (onResult) {
          Object.assign(this, onResult(undefined, e));
        }
        throw this.error(e as any);
      }
    }
    throw new Error('The action is not found.');
  }

  loading(msg?: string) {
    let content;
    if (msg) content = msg;
    else if (this.loadingKey) {
      content = t(this.loadingKey).replace('%data%', this.modelName ?? '');
    }
    if (content)
      message.loading({
        key: this.id,
        content,
      });
  }

  success(msg?: string) {
    let content;
    if (msg) content = msg;
    else if (this.successKey) {
      content = t(this.successKey).replace('%data%', this.modelName ?? '');
    }
    if (content)
      message.success({
        key: this.id,
        content,
      });
  }

  error(e: any = {}) {
    const { code, message: messageStr } = e;
    if (this.errorKey || code || messageStr) {
      let content;
      if (code) {
        const _c = t(translations.err.code[code]);
        if (_c?.length)
          content = t(this.errorKey ?? '').replace('%data%', this.modelName ?? '');
      } else content = t(this.errorKey ?? '').replace('%data%', this.modelName ?? '');
      if (!content?.trim()) {
        content = messageStr;
      }

      message.error({
        key: this.id,
        content: 'Unauthenticated',
      });
      message.error({
        key: this.id,
        content,
      });
    }
  }
}
