import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [SearchPipe],
  exports: [ SearchPipe ]
})
export class SearchPipeModule { }
