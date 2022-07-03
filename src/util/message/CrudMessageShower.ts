/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { ErrorResponse } from 'services';

import MessageUtil from './MessageUtil';

export default class CrudMessageShower {
  private id: number;
  private modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
    this.id = Math.random();
  }

  creating() {
    MessageUtil.showCreating(this.modelName, this.id);
  }

  created() {
    MessageUtil.showSuccessCreating(this.modelName, this.id);
  }

  errorCreating(e: ErrorResponse | any) {
    // if (e) console.error(e);
    MessageUtil.showErrorCreating(this.modelName, this.id, e.code);
    return e;
  }

  deleting() {
    MessageUtil.showCreating(this.modelName, this.id);
  }

  deleted() {
    MessageUtil.showSuccessDeleting(this.modelName, this.id);
  }

  errorDeleted(e: ErrorResponse | any) {
    // if (e) console.error(e);
    MessageUtil.showErrorDeleting(this.modelName, this.id, e.code);
    return e;
  }

  errorUpdating(e: ErrorResponse | any) {
    // if (e) console.error(e);
    MessageUtil.showErrorUpdating(this.modelName, this.id, e.code);
    return e;
  }

  errorGetting(e: ErrorResponse | any) {
    // if (e) console.error(e);
    MessageUtil.showErrorGetting(this.modelName, this.id, e.code);
    return e;
  }

  updated(msg?: string) {
    MessageUtil.showSuccessUpdating(this.modelName, this.id, msg);
  }

  updating() {
    MessageUtil.showUpdating(this.modelName, this.id);
  }
}
