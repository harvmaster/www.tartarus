interface MemberInput {
  username: string,
  nickname: string,
  accountCode: string,
  avatar: string
}

export class Member {
  
  username: string
  nickname: string
  accountCode: string
  avatar: string

  constructor ({username, nickname, accountCode, avatar}: MemberInput) {
    this.username = username
    this.nickname = nickname
    this.accountCode = accountCode
    this.avatar = avatar
  }
}

export default Member