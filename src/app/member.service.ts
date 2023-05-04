import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  // InMemoryDbService.createDb が返すオブジェクトがエンドポイント（ return { members } の場合、エンドポイントは `api/members` になる ）
  private membersUrl = 'api/members';

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  // 社員一覧を返す関数
  getMembers(): Observable<Member[]> {
    // `.pipe()` データを取得するまでの中間処理
    return this.httpClient.get<Member[]>(this.membersUrl).pipe(
      tap((members) => this.log('社員データを取得しました')),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  // id を受け取りそのメンバーを返す関数
  getMember(id: number): Observable<Member> {
    this.messageService.add(
      `MemberService: 社員データ（id=${id}）を取得しました`
    );

    return of(MEMBERS.find((member) => member.id === id));
  }

  private log(message: string): void {
    this.messageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} 失敗： ${error.message}`);

      return of(result as T);
    };
  }
}
