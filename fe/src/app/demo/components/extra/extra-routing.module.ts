import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: 'cedolini', 
            data: { 
                breadcrumb: 'Cedolini' 
            }, 
            loadChildren: () => import('./documenti/document-list/cedolini.module').then(m => m.CedoliniModule) 
        },
        {
            path: 'insert-document',
            data:{
                breadcrumb: 'InsertDocument'
            },
            loadChildren: () => import('./documenti/add-document/insert-document.module').then(m=> m.InsertDocumentModule)
        },
        {
            path: 'dipendenti',
            data:{
                breadcrumb: 'Dipendenti'
            },
            loadChildren: () => import('./management-dipendenti/dipendenti-info/dipendenti.module').then(m=> m.DipendentiModule)
        },
        {
            path: 'dipendenti-docs/:idUser',
            data:{
                breadcrumb: 'DipendentiDocs'
            },
            loadChildren: () => import('./management-dipendenti/dipendenti-docs/dipendenti-docs.module').then(m=> m.DipendentiDocsModule)
        },
        {
            path: 'news',
            data:{
                breadcrumb: 'News'
            },
            loadChildren: () => import('./novita/news/news.module').then(m=> m.NewsModule)
        },
        {
            path: 'post',
            data:{
                breadcrumb: 'Post'
            },
            loadChildren: () => import('./novita/post/post.module').then(m=> m.PostModule)
        },
        {
            path: 'userpage',
            data:{
                breadcrumb: 'UserPage'
            },
            loadChildren: () => import('./userpage/userpage.module').then(m=> m.UserpageModule)
            
        },
        {
            path: 'news-list',
            data:{
                breadcrumb: 'NewsList'
            },
            loadChildren: () => import('./novita/news-list/news-list.module').then(m=> m.NewsListModule)
        },
        {
            path: 'news-update/:id',
            data:{
                breadcrumb: 'NewsUpdate'
            },
            loadChildren: () => import('./novita/news-update/news-update.module').then(m=> m.NewsUpdateModule)
        },
    ])],
    exports: [RouterModule]
})
export class ExtraRoutingModule { }
