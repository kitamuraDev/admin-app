import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

// prettier-ignore
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // pathMatch: 'full' は パスの完全一致
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: MemberDetailComponent },
  { path: 'members', component: MembersComponent }
]

@NgModule({
  imports: [
    // ルーティング情報を渡して、アプリケーションのルーティングを有効にする
    RouterModule.forRoot(routes),
  ],
  exports: [
    // AppModuleでルーティング機能を使えるようにするために exports を行う
    RouterModule,
  ],
})
export class AppRoutingModule {}
