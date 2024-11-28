import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeConvertMoney',
})
export class ConvertMoneyPipe implements PipeTransform {
  transform(value: any): any {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const floatValue = parseFloat(value);

    if (isNaN(floatValue)) {
      return 'Invalid input';
    }

    const isNegative = floatValue < 0;
    const absoluteValue = Math.abs(floatValue);

    const integerPart = Math.floor(absoluteValue);
    let decimalPart = (absoluteValue - integerPart).toFixed(4).split('.')[1]; // Lấy 4 chữ số thập phân

    // Sử dụng regex để loại bỏ các số 0 ở cuối
    decimalPart = decimalPart.replace(/0+$/, '');

    const integerResult = this.convertToWords(integerPart);
    const decimalResult = decimalPart
      ? ` phẩy ${this.convertToWords(parseInt(decimalPart)).toLowerCase()}`
      : '';

    const result = isNegative
      ? `Âm ${integerResult.toLowerCase()} ${decimalResult}`
      : `${integerResult} ${decimalResult}`;

    return result;
  }

  convertToWords(num: number): string {
    const units = [
      'không',
      'một',
      'hai',
      'ba',
      'bốn',
      'năm',
      'sáu',
      'bảy',
      'tám',
      'chín',
    ];
    const unitText = ['', 'nghìn', 'triệu', 'tỷ'];

    let result = '';

    if (num === 0) {
      return 'không';
    }

    let i = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        const currentGroup = num % 1000;
        const currentGroupText = this.convertGroupToWords(currentGroup, units);
        result = currentGroupText + ' ' + unitText[i] + ' ' + result;
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return result
      .trim()
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  convertGroupToWords(num: number, units: string[]): string {
    let result = '';

    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;

    if (hundreds !== 0) {
      result += units[hundreds] + ' trăm';
      if (tens !== 0 || ones !== 0) {
        result += ' ';
      }
    }

    if (tens > 1) {
      result += units[tens] + ' mươi';
      if (ones !== 0) {
        result += ' ' + units[ones];
      }
    } else if (tens === 1) {
      result += 'mười';
      if (ones !== 0) {
        result += ' ' + units[ones];
      }
    } else {
      if (ones !== 0) {
        result += units[ones];
      }
    }

    return result;
  }
}
