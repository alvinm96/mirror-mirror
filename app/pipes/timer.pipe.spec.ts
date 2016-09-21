/// <reference path="./../../typings/index.d.ts" />
import { Timer } from './timer.pipe';

describe('Timer pipe', () => {
  it('should transform seconds to minutes:seconds format', () => {
    let time = new Timer();
    expect(time.transform(60)).toBe('1:00');
  });

  it('should transform null to ":"', () => {
    let time = new Timer();
    expect(time.transform(null)).toBe('0:00');
  });
});