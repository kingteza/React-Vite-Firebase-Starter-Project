/* *****************************************************************************
 Copyright (c) 2020-2022 Kingteza and/or its affiliates. All rights reserved.
 KINGTEZA PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */
const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function toMoney(num: number = 0) {
  return Number(+num).toLocaleString('en', options);
}

function round(num: number = 0) {
  num = +num;
  return Math.round(num * 100) / 100;
}

function randInt(max = 1000000000) {
  const randomInteger = Math.floor(Math.random() * (max + 1));
  return randomInteger;
}

export default { round, toMoney, randInt };
