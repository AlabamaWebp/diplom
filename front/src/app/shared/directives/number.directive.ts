import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onlyNumber]',
  host: {
    '(input)': 'onInput($event)',
}
})
export class NumberDirective {

  constructor() { }

  onInput(el: any) {
    console.log(this.number, el.target.valueAsNumber, el);
    const n = el.target.valueAsNumber;
    if (n) {
      this.number = n;
    }
    else if (!n && el.inputType == "deleteContentBackward") {
      el.target.value = "";
      this.number = NaN;
    }
    else {
      el.target.valueAsNumber = this.number;
    }
  }
  number = 1;
}
