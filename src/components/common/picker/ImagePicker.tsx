/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import 'cropperjs/dist/cropper.css';

import {
  RotateLeftOutlined,
  RotateRightOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import Modal from 'antd/lib/modal';
import Upload, { UploadProps } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';
import ImageUtil from '../../../util/ImageUtil';
import ButtonComponent from '../button/Button';

function getBase64(file) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function dataURLtoFile({ url, name }) {
  var arr = url.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], name, { type: mime });
}
interface Props extends FormItemProps {
  values?: string[] | string;
  maxCount?: number;
  onChange: (file?: UploadFile, allFiles?: UploadFile[]) => void;
  buttonTitle?: string;
  hidePreview?: boolean;
  buttonSize?: string;
  showButtonText?: boolean;
  showOnlyIcon?: boolean;
  icon?: ReactElement;
  loading?: boolean;
  buttonType?: string;
}

/**
 * When submitting Uploader
 * ```
 *  if(field === undefined)
 *  "There is no file uploaded"
 *  else if(field.fileList.length === 0)
 *  "The initial file is deleted"
 *  else if(field.fileList.length > 1)
 *  "A new file has been uploaded"
 * ```
 *
 */
const ImagePicker: FC<Props> = ({
  values = [],
  required,
  buttonType,
  label,
  name,
  onChange,
  buttonTitle,
  hidePreview,
  buttonSize = 'large',
  showButtonText = true,
  showOnlyIcon = false,
  icon = <UploadOutlined />,
  loading,
  maxCount = 1,
  ...props
}) => {
  const [previewTitle, setPreviewTitle] = React.useState('');
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const fileRef = useRef<RcFile>();
  const cropper = useRef<ReactCropperElement>();
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
  const [preview, setPreview] = useState<string>();
  const beforeUploadRef = useRef<UploadProps['beforeUpload']>();

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  const handleCropChange = () => {};

  const handleRotate = (isLeft?: boolean) => {
    cropper?.current?.cropper.rotate(isLeft ? -90 : 90);
    handleCropChange();
  };

  useEffect(() => {
    onChange(fileList[0], fileList);
  }, [fileList, onChange]);

  const onClickConfirmCrop = () => {
    const croppedImgData = cropper?.current?.cropper.getCroppedCanvas();

    // get the new image
    const { type, size, name, uid } = fileRef.current as any;

    // const file: any = dataURLtoFile({ url, name });
    croppedImgData?.toBlob(async (blob: any) => {
      const file = Object.assign(new File([blob], name, { type }), {
        uid,
      }) as RcFile;
      const fileResized: RcFile = await ImageUtil.resizeImage(file);
      const url = await getBase64(fileResized);
      const fl = {
        url,
        name,
        uid,
        type,
        size,
        thumbUrl: url,
        originFileObj: fileResized,
      };
      setFileList([fl, ...fileList]);
      // if (beforeUploadRef?.current) beforeUploadRef?.current(file, [file]);
    });
    setPreview(undefined);
  };

  const onClickCancelCrop = () => {
    setPreview(undefined);
    fileRef.current = undefined;
  };

  const onChangeFile = useCallback((f) => {
    const file = f;
    if (file) {
      fileRef.current = file;
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      });
      reader.readAsDataURL(file);
    }
  }, []);
  // useEffect(() => {
  //   if (values?.length || typeof values === 'string') {
  //     const list = Array.isArray(values)
  //       ? values.map((url) => {
  //           return [{ url }];
  //         })
  //       : [{ url: values }];
  //     setFileList(list);
  //   }
  // }, [values]);
  const { t } = useTranslation();

  const validator = useMemo(
    () =>
      required
        ? {
            required,
            validator: (_, __, callback) => {
              if (preview || fileList?.length) callback();
              else callback(`${label ?? ''} ${t(translations.err.validation.required)}`);
            },
          }
        : undefined,
    [required, preview, fileList?.length, label, t],
  );

  const _buttonTitle = buttonTitle ?? t(translations.message.fileUploadMessage2);

  const uploadComponent = useMemo(
    () => (
      <Upload
        accept="image/x-png,image/gif,image/jpeg"
        key={fileList.length}
        fileList={fileList}
        className="mb-0"
        defaultFileList={fileList}
        onChange={(props) => {
          // setFileList(props.fileList);
        }}
        multiple={false}
        onPreview={!hidePreview ? handlePreview : undefined}
        onDrop={(file) => {
          // if (!file.isCropped) onChangeFile(file);
          // else setFileList([file]);
          onChangeFile(file.dataTransfer.files.item(0));
          return false;
        }}
        listType="picture"
        showUploadList={!hidePreview}
        onRemove={(file) => {
          const filtered = fileList.filter((f) => file.uid !== f.uid);
          setFileList(filtered);
        }}
        beforeUpload={(file: any) => {
          // if (!file.isCropped) onChangeFile(file);
          // else setFileList([file]);
          onChangeFile(file);
          return false;
        }}
        // height={100}
        maxCount={maxCount}
      >
        {
          <div className="d-flex flex-column">
            {fileList.length < maxCount && (
              <ButtonComponent
                loading={loading}
                tooltip={!showButtonText ? _buttonTitle : undefined}
                size={buttonSize as any}
                icon={icon}
                type={!showButtonText ? 'text' : (buttonType as any)}
              >
                {showButtonText ? _buttonTitle : undefined}
              </ButtonComponent>
            )}
          </div>
        }
      </Upload>
    ),
    [
      _buttonTitle,
      buttonSize,
      buttonType,
      fileList,
      hidePreview,
      icon,
      loading,
      maxCount,
      onChangeFile,
      showButtonText,
    ],
  );

  beforeUploadRef.current = uploadComponent.props.beforeUpload;

  return (
    <>
      <FormItem
        label={label}
        {...props}
        name={name}
        className="mb-0"
        rules={[validator, ...(props.rules ?? [])] as any}
      >
        {uploadComponent}
      </FormItem>
      <Modal
        visible={Boolean(preview)}
        maskClosable={false}
        onOk={onClickConfirmCrop}
        closable={false}
        onCancel={onClickCancelCrop}
      >
        <Cropper ref={cropper as any} src={preview} cropend={() => handleCropChange()} />
        <div className="mt-2 d-flex justify-content-center">
          <ButtonComponent
            size="large"
            icon={<RotateLeftOutlined />}
            onClick={() => handleRotate(true)}
          />
          <ButtonComponent
            size="large"
            icon={<RotateRightOutlined />}
            onClick={() => handleRotate(false)}
          />
        </div>
      </Modal>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="text-center">
          <img alt="example" style={{ maxWidth: '400px' }} src={previewImage} />
        </div>
      </Modal>
    </>
  );
};

export default ImagePicker;
