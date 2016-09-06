/**
 * Created by alvinm on 7/27/16.
 */
export class Period {
  constructor(public condition: string,
              public temperature: Object,
              public time?: string,
              public ampm?: string,
              public month?: string,
              public day?: string) { }
}