/* eslint-disable  @typescript-eslint/no-unused-vars */

import { injectable, interfaces } from "inversify";
import moment from "moment";
import util from "util";

export interface IDateService {
  format(o: string, i?: string): IDateService;
  toUnix(date: string): number;
  toSentence(date: string): string;
  toRange(start: string, end: string): string;
  toRangeWithDuration(start: string, end: string): string;
  IsFuture(data: string): boolean;
  CurrentYear(): number;
  CurrentTimestamp(): string;
}

export namespace IDateService {
  export const $: interfaces.ServiceIdentifier<IDateService> = Symbol('IDateService');
}

@injectable()
export class DateService implements IDateService {
  private outFormat: string | undefined;
  private inFormat: string | undefined;

  format(o: string, i?: string): IDateService {
    this.outFormat = o;
    this.inFormat = i;
    return this;
  }

  toUnix(date: string): number {
    return moment(date, this.inFormat).unix();
  }

  toSentence(date: string): string {
    if (date === "Present") {
      return date;
    }
    return moment(date, this.inFormat).format(this.outFormat);
  }

  toRange(start: string, end: string): string {
    return `${this.toSentence(start)} - ${this.toSentence(end)}`;
  }

  toRangeWithDuration(start: string, end: string): string {
    return `${this.toRange(start, end)} ${this.toDuration(start, end)}`;
  }

  IsFuture(date: string): boolean {
    return moment().diff(moment(date, this.inFormat)) < 0;
  }

  CurrentYear(): number {
    return moment().year();
  }

  CurrentTimestamp(): string {
    return moment.utc().format(this.outFormat);
  }

  private toDuration(start: string, end: string): string {
    let endMoment = moment(end, this.inFormat);
    if (end === "Present") {
      endMoment = moment();
    }
    const difference = moment.duration(
      endMoment.diff(moment(start, this.inFormat))
    );
    const years = difference.years();
    const months = difference.months() + 1; // we want to ceiling of months not floor

    const yearFormat = years
      ? util.format("%d year%s", years, years === 1 ? "" : "s")
      : "";
    const monthFormat = months
      ? util.format("%d month%s", months, months === 1 ? "" : "s")
      : "";
    const spacing = yearFormat !== "" ? " " : "";

    return `(${yearFormat}${spacing}${monthFormat})`;
  }
}
