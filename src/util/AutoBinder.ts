/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import autoBind from 'auto-bind';

export default abstract class AutoBinder {
    constructor() {
        autoBind(this)
    }
}