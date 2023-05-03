import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';

// prettier-ignore
const routes: Routes = [
  {path: 'members', component: MembersComponent}
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
