import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  members: Member[];
  selectedMember: Member;

  // DI：Angularでは、serviceなどをコンポーネントで使用する際にDIをやる
  constructor(private memberService: MemberService) {}

  // コンポーネントが初期化されるタイミングで実行される（ReactのuseEffectのような役割）
  ngOnInit(): void {
    this.getMembers();
  }

  // MemberService で定義した getMembers() 関数をここで実行している
  getMembers(): void {
    this.members = this.memberService.getMembers();
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
  }
}
