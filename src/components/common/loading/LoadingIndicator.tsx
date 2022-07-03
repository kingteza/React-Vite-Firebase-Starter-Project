/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import Result from 'antd/lib/result';
import Skeleton from 'antd/lib/skeleton';
import Spin from 'antd/lib/spin';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { translations } from '../../../config/localization/translations';
import ButtonComponent from '../button/Button';

const LoadingIndicator: FC<{ loading: boolean; error?: any }> = ({
  children,
  loading,
  error,
}) => {
  const { t } = useTranslation();
  return (
    <Spin spinning={loading}>
      <Skeleton loading={loading} paragraph>
        {error ? (
          <Result
            status={'404'}
            title={404}
            subTitle={t(translations.err.notFound)}
            className=""
            extra={
              <ButtonComponent to={-1} type="primary">
                {t(translations.str.goBack)}
              </ButtonComponent>
            }
          />
        ) : (
          children
        )}
      </Skeleton>
    </Spin>
  );
};

export default LoadingIndicator;
