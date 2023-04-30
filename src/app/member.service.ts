import { Injectable } from '@angular/core';
import { Member } from './member';
import { MEMBERS } from './mock-members';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor() {}

  // MEMBERS のモックを返すだけの関数
  getMembers(): Member[] {
    return MEMBERS;
  }
}
