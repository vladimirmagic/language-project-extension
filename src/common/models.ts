
export type TAuthUser = {
  id: number;
  email: string;
  googleId: string;
  hashId: string;
  name: string;
  picture: string;
  locale: string;
  token: string;
  refreshToken: string;
  isNew: boolean;
  /*role: EAuthUserRole;
  translateLangs: TAuthUserTranslateLang[];*/
  roles: number[];
  teacher: boolean;
  teacherMode: boolean;
  //level: EUserLevel;
  //publicProfile?: TPublicProfile;
  inviteByUserId?: number;
 // confirmEmailStatus?: EAuthUserConfirmEmailStatus;
  langCode?: string;
  anonymous?: boolean;
}
