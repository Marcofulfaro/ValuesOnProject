import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertDocumentComponent } from './insert-document.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertDocumentComponent }
	])],
	exports: [RouterModule]
})
export class InsertDocumentRoutingModule { }
