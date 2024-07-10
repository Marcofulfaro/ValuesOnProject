import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DipendentiComponent } from './dipendenti.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DipendentiComponent }
	])],
	exports: [RouterModule]
})
export class DipendentiRoutingModule { }
