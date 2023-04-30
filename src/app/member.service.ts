import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor() {}

  // MEMBERS のモックを返すだけの関数
  getMembers(): Observable<Member[]> {
    // of：実行時に渡した値を Observable オブジェクトに変換して返す関数
    return of(MEMBERS);
  }
}
