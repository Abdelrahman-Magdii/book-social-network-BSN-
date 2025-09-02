import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { ManageBook } from './pages/manage-book/manage-book';
import { BookDetails } from './pages/book-details/book-details';
import { ReturnedBooks } from './pages/returned-books/returned-books';
import { BorrowedBookList } from './pages/borrowed-book-list/borrowed-book-list';
import { MyBooks } from './pages/my-books/my-books';
import { BookList } from './pages/book-list/book-list';
import { authGuard } from '../../servers/guard/auth-guard';

const routes: Routes = [

  {
    path: '',
    component: Main,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: BookList,
        canActivate: [authGuard]
      },
      {
        path: 'my-books',
        component: MyBooks,
        canActivate: [authGuard]
      },
      {
        path: 'my-borrowed-books',
        component: BorrowedBookList,
        canActivate: [authGuard]
      },
      {
        path: 'my-returned-books',
        component: ReturnedBooks,
        canActivate: [authGuard]
      },
      {
        path: 'details/:bookId',
        component: BookDetails,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageBook,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:bookId',
        component: ManageBook,
        canActivate: [authGuard]
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
