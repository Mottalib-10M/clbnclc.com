/**
 * Test calendar: when results arrive, until when a score report counts, and the earliest date of a
 * new sitting. Delays come from params-2026.json (CCI Paris Île-de-France for the TEF, the TCF
 * candidate manual of France Éducation international, IRCC for the two-year rule). Working days skip
 * Saturdays and Sundays only: public holidays differ by country and are not removed.
 */
import P from '../../data/params-2026.json';
import { type Iso, addDays, addYears, dayNum, isoOf } from './dates';

export type CalTest = 'tef' | 'tcf';
const weekday = (d: Iso) => new Date(`${d}T00:00:00Z`).getUTCDay();
export function addWorkingDays(d: Iso, n: number): Iso {
  let x = d, left = n;
  while (left > 0) { x = addDays(x, 1); const w = weekday(x); if (w !== 0 && w !== 6) left--; }
  return x;
}
/** Latest date by which results are sent, counted from the day of the test (TEF) or the end of the session (TCF on computer). */
export function resultsBy(t: CalTest, testDay: Iso): Iso {
  return addWorkingDays(testDay, t === 'tef' ? P.tef.resultsDays[1] : P.tcf.resultsDaysComputer);
}
/**
 * Earliest new sitting of the same test. TEF: a test sat within the 20 days before the session
 * voids the new result, so the earliest day is day 21. TCF: 30 days between two sittings, read here
 * as day 30 after the first one; ask the centre when you book on the limit.
 */
export function earliestRetake(t: CalTest, testDay: Iso): Iso {
  return addDays(testDay, t === 'tef' ? P.tef.retakeDays + 1 : P.tcf.retakeDays);
}
/** Two years from the date printed on the report (TEF: issue date of the attestation; TCF: date of the sitting). */
export function validUntil(reportDate: Iso): Iso {
  return addDays(addYears(reportDate, P.ee.validityYears), -1);
}
export function daysBetween(a: Iso, b: Iso): number { return dayNum(b) - dayNum(a); }
/** For a deadline (profile submission, permanent residence application), the last test date whose results still arrive in time. */
export function latestTestFor(t: CalTest, deadline: Iso, marginDays = 0): Iso {
  let d = addDays(deadline, -marginDays);
  while (dayNum(resultsBy(t, d)) > dayNum(deadline) - marginDays) d = addDays(d, -1);
  return d;
}
export { isoOf };
