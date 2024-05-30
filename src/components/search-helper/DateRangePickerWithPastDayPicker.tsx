/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Form, Radio } from 'antd';
import DatePickerComponent, {
  DateRangePickerProps,
} from 'components/common/DatePicker/DatePicker';
import { translations } from 'config/localization/translations';
import dayjs, { Dayjs } from 'dayjs';
import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

enum DateRangePickerOptions {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  PAST_7_DAYS = 'PAST_7_DAYS',
  PAST_MONTH = 'PAST_MONTH',
}

function isTodaySingle(day: Dayjs, from?: Dayjs) {
  if (from) {
    return from >= day.startOf('day') && from <= day.endOf('day');
  }
  return false;
}

function isToday(day: Dayjs, from?: Dayjs, to?: Dayjs): boolean {
  if (from && to) {
    return isTodaySingle(day, from) && isTodaySingle(day, to);
  }
  return false;
}

const DateRangePickerWithPastDayPicker: FC<
  Omit<DateRangePickerProps, 'range' | 'disabledFutureDays'>
> = (props) => {
  const form = Form.useFormInstance();
  const dates: [Dayjs, Dayjs] = Form.useWatch(props?.name, form);
  const { t } = useTranslation();

  const value = useMemo(() => {
    const from = dates?.[0];
    const to = dates?.[1];
    const today = dayjs();
    let rst: DateRangePickerOptions | undefined = undefined;
    if (isToday(today, from, to)) rst = DateRangePickerOptions.TODAY;
    else if (isToday(today.subtract(1, 'day'), from, to))
      rst = DateRangePickerOptions.YESTERDAY;
    else if (isTodaySingle(today.subtract(7, 'day'), from) && isTodaySingle(today, to))
      rst = DateRangePickerOptions.PAST_7_DAYS;
    else if (isTodaySingle(today.subtract(1, 'month'), from) && isTodaySingle(today, to))
      rst = DateRangePickerOptions.PAST_MONTH;
    return rst;
  }, [dates]);

  const onChange = useCallback(
    async (value?: DateRangePickerOptions) => {
      let date: [Dayjs, Dayjs] | undefined = undefined;
      const today = dayjs();
      switch (value) {
        case DateRangePickerOptions.TODAY:
          date = [today, today];
          break;
        case DateRangePickerOptions.YESTERDAY: {
          const yesterday = today.subtract(1, 'day');
          date = [yesterday, yesterday];
          break;
        }
        case DateRangePickerOptions.PAST_7_DAYS:
          date = [today.subtract(7, 'day'), today];
          break;
        case DateRangePickerOptions.PAST_MONTH:
          date = [today.subtract(1, 'month'), today];
          break;
      }
      if (date?.length && props.name)
        form.setFieldsValue({ [props.name]: [date[0], date[1]] });
    },
    [form, props.name],
  );

  return (
    <>
      <DatePickerComponent
        {...(props as any)}
        disabledFutureDays
        range
        className="w-100"
        renderExtraFooter={() => (
          <>
            <Radio.Group
              className="ml-3"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {Object.keys(DateRangePickerOptions).map((value) => (
                <Radio key={value} value={value}>
                  {t(translations.type.dateRangePickerOptions[value])}
                </Radio>
              ))}
            </Radio.Group>
          </>
        )}
      />
    </>
  );
};

export default DateRangePickerWithPastDayPicker;
