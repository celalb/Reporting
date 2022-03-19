import { Directive, AfterContentInit, EventEmitter, Output } from '@angular/core';

@Directive({selector: '[after-if]'})
export class AfterIfDirective implements AfterContentInit {
    @Output('after-if')
    public after: EventEmitter<AfterIfDirective> = new EventEmitter();

    public ngAfterContentInit(): void {
        setTimeout(()=>{
           
           this.after.next(this);
        });
    }
}
