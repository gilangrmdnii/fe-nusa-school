import { api } from "./api";
import { setCookie, getCookie, deleteCookie } from "./cookies";

export type User = {
  id: number;
  avatar?: string;
  fullname: string;
  email: string;
  role: string;
};

export type Session = {
  token: string;
  user: User;
};

const TOKEN_KEY = "nusa_token";
const USER_KEY = "nusa_user";

async function login(email: string, password: string): Promise<Session> {
  const res = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.body?.access_token) {
    throw new Error("Invalid response from server");
  }

  const token = res.body.access_token;
  const payload = JSON.parse(atob(token.split(".")[1]));

  const user: User = {
    id: payload.id,
    fullname: payload.fullname,
    email: payload.email,
    role: payload.role,
    avatar: payload.avatar,
  };

  const session: Session = { token, user };
  saveSession(session);

  return session;
}

async function register(data: {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
  phone?: string;
}): Promise<Session> {
  const res = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.body?.access_token) {
    throw new Error("Invalid response from server");
  }

  const token = res.body.access_token;
  const payload = JSON.parse(atob(token.split(".")[1]));

  const user: User = {
    id: payload.id,
    fullname: payload.fullname,
    email: payload.email,
    role: payload.role,
    avatar: payload.avatar,
  };

  const session: Session = { token, user };
  saveSession(session);

  return session;
}

async function verifyOtp(data: { otp: string }) {
  return api("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function resendOtp(data: { email: string }) {
  return api("/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function logout() {
  deleteCookie(TOKEN_KEY);
  deleteCookie(USER_KEY);
}

function saveSession(session: Session) {
  setCookie(TOKEN_KEY, session.token);
  setCookie(USER_KEY, JSON.stringify(session.user));
}

function loadSession(): Session | null {
  if (typeof document === "undefined") return null;

  const token = getCookie(TOKEN_KEY);
  const user = getCookie(USER_KEY);

  if (token && user) {
    try {
      return { token, user: JSON.parse(user) };
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
      return null;
    }
  }
  return null;
}

export const authService = {
  login,
  register,
  verifyOtp,
  resendOtp,
  logout,
  saveSession,
  loadSession,
};
