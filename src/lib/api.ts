const BASE_URL = "https://api-staging-nusa.nuncorp.id/api/v1";

type Options = RequestInit & {
  token?: string;
};

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};

export async function api(endpoint: string, options: Options = {}): Promise<any> {
  const { token, headers, ...rest } = options;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const error: ApiError = {
        message: data?.message || "Terjadi kesalahan pada server",
        status: res.status,
        code: data?.code,
      };
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Koneksi jaringan bermasalah");
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui");
  }
}
