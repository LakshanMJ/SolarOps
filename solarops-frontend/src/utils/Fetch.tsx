export async function fetchData(
  url: string,
  options: RequestInit = {}
) {
  try {
    const token = localStorage.getItem("token"); // 🔑 grab JWT

    const res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // send token if exists
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    // 🔥 AUTO LOGOUT ON 401
    if (res.status === 401) {
      localStorage.removeItem("token"); // remove token
      // optional: clear your AuthContext here if you have setToken
      window.location.href = "/login"; // force redirect to login
      return; // stop execution
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;

  } catch (err: any) {
    console.error("Fetch error:", err.message);
    throw err;
  }
}