import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  httpOptios = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

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
    const url = `${this.membersUrl}/${id};`;
    return this.httpClient.get<Member>(url).pipe(
      tap((_) => this.log(`社員データ（id=${id}）を取得しました`)),
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  // メンバーを更新する関数
  updateMember(member: Member): Observable<any> {
    return this.httpClient.put(this.membersUrl, member, this.httpOptios).pipe(
      tap((_) => this.log(`社員データ（id=${member.id}）を変更しました`)),
      catchError(this.handleError<any>('updateMember'))
    );
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
