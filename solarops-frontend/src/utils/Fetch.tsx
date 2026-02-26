export async function fetchData(
  url: string,
  options: RequestInit = {}
) {
  try {
    const res = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body
        ? JSON.stringify(options.body)
        : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    // ✅ SAFE for DELETE (empty response)
    const text = await res.text();
    return text ? JSON.parse(text) : null;

  } catch (err: any) {
    console.error("Fetch error:", err.message);
    throw err;
  }
}