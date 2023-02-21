import * as data from '../../data/english.json';
import { sampleSize } from 'lodash';

const { commonWords } = data;
let newList: string[] = [];

const generateWords = (count: number) => {
  newList = [];
  const randomWords = sampleSize(commonWords, count);
  newList.push(...randomWords);
  return newList.join(' ');
};

export default generateWords;
