import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private messageService: MessageService) {}

  // MEMBERS のモックを返すだけの関数
  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService: 社員一覧データを取得しました');
    // of：実行時に渡した値を Observable オブジェクトに変換して返す関数
    return of(MEMBERS);
  }

  // id を受け取りそのメンバーを返す関数
  getMember(id: number): Observable<Member> {
    this.messageService.add(
      `MemberService: 社員データ（id=${id}）を取得しました`
    );

    return of(MEMBERS.find((member) => member.id === id));
  }
}
