import { App, Modal } from 'antd';

let message: ReturnType<(typeof App)['useApp']>['message'];
let notification: ReturnType<(typeof App)['useApp']>['notification'];
let modal: ReturnType<(typeof App)['useApp']>['modal'] & { destroyAll: () => void, warn: ReturnType<(typeof App)['useApp']>['modal']['warning'] };

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal as any;
  modal.destroyAll = Modal.destroyAll;
  modal.warn = modal.warning;
  notification = staticFunction.notification;
  return null;
};

export { message, modal, notification };
