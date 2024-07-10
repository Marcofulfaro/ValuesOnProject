import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'News',
                items: [
                    { label: 'Novità', icon: 'pi pi-fw pi-book', routerLink: ['/extra/news'] },
                    { label: 'Pubblica', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/extra/post'] },
                ]
            },
            {
                label: 'Dipendenti',
                items: [
                    { label: 'Buste Paga', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/extra/cedolini'] },
                ]
            },
            {
                label: 'Admin',
                items: [
                    { label: 'Assegna Documento', icon: 'pi pi-fw pi-file-import', routerLink: ['/extra/insert-document'] },
                    { label: 'Lista Dipendenti', icon: 'pi pi-fw pi-briefcase', routerLink: ['/extra/dipendenti'] },
                    { label: 'Lista News', icon: 'pi pi-fw pi-list', routerLink: ['/extra/news-list'] },
                ]
            }
        ];
    }
}
