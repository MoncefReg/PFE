import { getDateFormat } from 'src/utils/helpers';
import moment from 'moment';

const dateFormats = () => {
  const { fullDatetimeFormat } = getDateFormat();
  return fullDatetimeFormat;
};

const ar_errors = {
  number: {
    min: 'الحد الأدنى هو ${min}',
    max: 'الحد الأقصى هو ${max}',
    typeError: 'يسمح بالأعداد فقط',
    lessThan: 'الحد الأقصى هو ${less}',
    moreThan: 'الحد الأدنى هو ${more}',
    notEqual: 'هذا الحقل يجب أن يختلف عن {notEqual}',
    positive: 'يسمح بالأعداد الموجبة فقط',
    negative: 'يسمح بالأعداد السالبة فقط',
    integer: 'لا يسمح بالأعداد العشرية'
  },
  date: {
    min: ({ min }: any) =>
      `هذا التاريخ يجب أن يكون بعد ${moment(min).format(dateFormats())}`,
    max: ({ max }: any) =>
      `هذا التاريخ يجب أن يكون قبل ${moment(max).format(dateFormats())}`
  },
  string: {
    length: 'طول هذا النص يجب أن يساوي ${length}',
    min: 'عدد الأحرف يجب أن لا يقل عن ${min}',
    max: 'عدد الأحرف يجب أن لا يزيد عن ${max}',
    matches: 'النص يجب أن يطابق الصيغة التالية: "${regex}"',
    email: 'صيغة البريد الإلكتروني خاطئة',
    url: 'صيغة الرابط خاطئة',
    trim: 'النص يجب أن لا يحتوي على فراغات في البداية و النهاية',
    lowercase: 'يسمح بالأحرف الصغيرة فقط',
    uppercase: 'يسمح بالأحرف الكبيرة فقط'
  },
  mixed: {
    required: 'هذا الحقل إجباري',
    oneOf: 'القيمة يجب أن تكون من إحدى الخيارات التالية : ${values}',
    notOneOf: 'القيمة يجب أن لا تكون من الخيارات التالية: ${values}',
    default: 'القيمة غير صحيحة'
  },
  array: {
    min: 'عدد العناصر يجب أن لا يقل عن ${min}',
    max: 'عدد العناصر يجب أن لا يزيد عن ${max}'
  }
};

export default ar_errors;
