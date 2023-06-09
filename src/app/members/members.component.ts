import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[];

  // DI：Angularでは、serviceなどをコンポーネントで使用する際にDIをやる
  constructor(private memberService: MemberService) {}

  // コンポーネントが初期化されるタイミングで実行される（ReactのuseEffectのような役割）
  ngOnInit(): void {
    this.getMembers();
  }

  // MemberService で定義した getMembers() 関数をここで実行している
  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members)); // subscribe：Observable.subscribe で、Observableオブジェクトを受け取るための関数
  }

  // メンバーの追加
  add(name: string): void {
    name = name.trim(); // 左右の空白文字を削除
    if (!name) return;

    this.memberService.addMember({ name } as Member).subscribe((member) => {
      this.members.push(member);
    });
  }

  // メンバーの削除
  delete(member: Member): void {
    this.members = this.members.filter((mem) => mem !== member); // DB と this.members の整合性を合わせる
    this.memberService.deleteMember(member).subscribe();
  }
}
