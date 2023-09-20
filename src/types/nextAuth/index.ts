export interface NextAuthToken {
  name: string;
  email: string;
  picture: string | null;
  id: string;
  emailVerified: Date | null;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
}

export interface NextAuthSession {
  expires: string;
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
    emailVerified: Date | null;
  };
}

export interface NextAuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: Date | null;
  image: string;
}

export interface NextAuthCredentials {
  redirect: string;
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
}
