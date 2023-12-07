/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import { Steps } from 'antd';
import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react';

import Hider from '../appearance/Hider';

interface WizardViewFormProps {
  pages: {
    title: string;
    component: (func: {
      forward: (value?: any, submit?: boolean) => void;
      backward: () => void;
    }) => ReactElement;
  }[];
  onSubmit?: (val: (any | undefined)[], combinedValue: any) => void;
}

const { Step } = Steps;
const WizardViewForm: FC<WizardViewFormProps> = ({ pages, onSubmit }) => {
  const [current, setCurrent] = useState(0);

  const [formSubmissions, setFormSubmissions] = useState<(any | undefined)[]>([]);

  const forward = useCallback(
    (value?: any, submit: boolean = false) => {
      const newS = [...formSubmissions];
      if (value !== undefined) {
        newS[current] = value;
        setFormSubmissions(newS);
      }
      setCurrent(current + 1);
      if (submit && onSubmit) {
        let value = {} as any;
        for (const values of newS) {
          for (const key in values) {
            value[key] = values[key];
          }
        }
        onSubmit(newS, value);
      }
    },
    [current, formSubmissions, onSubmit],
  );

  const backward = useCallback(() => {
    const newS = [...formSubmissions];
    newS[current] = undefined;
    setFormSubmissions(newS);
    setCurrent(current - 1);
  }, [current, formSubmissions]);

  const components = useMemo(() => {
    let steps: ReactElement[] = [];
    let _pages: ReactElement[] = [];
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i];
      _pages.push(
        <Hider hide={current !== i}>{p.component({ forward, backward })}</Hider>,
      );
      steps.push(<Step title={p.title} key={p.title} />);
    }
    return {
      _pages,
      steps,
    };
  }, [backward, current, forward, pages]);

  return (
    <>
      <Steps progressDot className="pb-3" current={current}>
        {components.steps}
      </Steps>
      {components._pages};
    </>
  );
};

export default WizardViewForm;
