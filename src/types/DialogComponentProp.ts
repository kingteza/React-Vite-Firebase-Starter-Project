/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

/**
 * This is the common type for dialog props
 */
 export interface DialogProps<U = {}, C = boolean, O = C> {
    open: O | undefined;
    // Return null if is close using close button
    onCloseMethod: (val?: C) => void;
    updatingItem?: U;
  }
  