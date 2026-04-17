export async function fetchData(
    url: string,
    options: RequestInit = {}
) {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(url, {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (res.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
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