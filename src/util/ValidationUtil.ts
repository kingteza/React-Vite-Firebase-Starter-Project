/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Rule } from 'antd/lib/form';
import { translations } from 'config/localization/translations';
import { t } from 'i18next';

const required = (modelName: string) => {
  return [
    {
      required: true,
      message: `${modelName} ${t(translations.err.validation.required)}`,
    },
  ];
};

const passwordValidation = (modelName: string): Rule[] => {
  return [
    {
      min: 8,
      message: t(translations.err.validation.minLength8),
    },
  ];
};

const nicValidation = (): Rule[] => {
  return [
    {
      validator: (_, v: string, callback) =>
        v.length === 12 || v.length === 10
          ? v.search(/^([0-9]{9}[x|X|v|V])|([0-9]{12})$/) !== -1
            ? callback()
            : callback(t(translations.err.validation.invalidNic))
          : callback(t(translations.err.validation.invalidNic)),
    },
  ];
};

const phoneValidation = (modelName: string): Rule[] => {
  return [
    {
      message: `${t(translations.err.validation.invalid)} ${modelName}`,
      pattern:
        /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/,
    },
  ];
};
export default { required, passwordValidation, nicValidation, phoneValidation };
