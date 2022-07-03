/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { RcFile } from 'antd/lib/upload';
import imageCompression from 'browser-image-compression';

const resizeImage = async (file: RcFile) => {
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });
  const uid = file.uid;
  return Object.assign(compressedFile, {
    uid,
    lastModifiedDate: new Date(),
  }) as RcFile;
};

export default { resizeImage };
