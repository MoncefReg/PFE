import { getDateFormat } from 'src/utils/helpers';
import moment from 'moment';

const dateFormats = () => {
  const { fullDatetimeFormat } = getDateFormat();
  return fullDatetimeFormat;
};

const en_errors = {
  number: {
    min: 'Min is ${min}',
    max: 'Max is ${max}',
    typeError: 'A valid number is required',
    lessThan: 'Max is ${less}',
    moreThan: 'Min is ${more}',
    notEqual: 'The value must be different to {notEqual}',
    positive: 'A positive number is required',
    negative: 'A negative number is required',
    integer: 'An integer is required'
  },
  date: {
    min: ({ min }: any) =>
      `This date must be after ${moment(min).format(dateFormats())}`,
    max: ({ max }: any) =>
      `This date must be after ${moment(max).format(dateFormats())}`
  },
  string: {
    length: 'Length must be exactly ${length}',
    min: 'Length must be less than ${min}',
    max: 'Length must be more than ${max}',
    matches: 'The value must follow this format: "${regex}"',
    email: 'Invalid email address format',
    url: 'Invalid URL format',
    trim: 'This field must not contain any spaces at the beginning or end',
    lowercase: 'Only lowercase characters are allowed',
    uppercase: 'Only uppercase characters are allowed'
  },
  mixed: {
    required: 'This field is required',
    oneOf: 'The value must be one of this choices : ${values}',
    notOneOf: 'The value must not match any of the following values: ${values}',
    default: 'The value is invalid'
  },
  array: {
    min: 'The minimum count of values is ${min}',
    max: 'The maximum count of values is ${max}'
  }
};

export default en_errors;
