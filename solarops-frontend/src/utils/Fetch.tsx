
export async function fetchData(url: string) {
  try {
    const res = await fetch(url, {
      method: 'GET', // or 'POST', etc.
      headers: { 'Content-Type': 'application/json' },
    })

    // Check for HTTP errors
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`HTTP ${res.status}: ${text}`)
    }

    // Try to parse JSON
    const data = await res.json()
    return data
  } catch (err: any) {
    console.error('Fetch error:', err.message)
    // You can throw or return a default object
    throw err
  }
}
