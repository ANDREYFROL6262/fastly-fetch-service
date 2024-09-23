addEventListener("fetch", (event) => event.respondWith(handleRequest(event)))

const CONFIG_URL = 'https://raw.githubusercontent.com/censortracker/ctconf/main/config.json'

async function handleRequest(event) {
  let req = event.request

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    })
  }

  let url = new URL(req.url)

  if (url.pathname === "/") {
    const req = new Request(CONFIG_URL)
  
    try {
      const backendResponse = await fetch(req, { backend: 'github' })
      const data = await backendResponse.json()
      return new Response(JSON.stringify(data), {
        headers: { 'content-type': 'application/json' },
      })
    } catch (err) {
      return new Response('Error fetching data: ' + err, { status: 500 })
    }
  }

  return new Response("The page you requested could not be found", {
    status: 404,
  })
}
