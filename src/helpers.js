// @flow

// Parses a string of URIs like: "host:port,host:port..."
// into an array of objects like: [ { host: "host", port: "port" }]
export function parseUris (urisStr: any): Array<{ host: string, port: string }> {
  if (typeof urisStr !== 'string') return []
  const uris = urisStr.split(',')
  const out = []
  for (let uri of uris) {
    const [host, port] = uri.split(':')
    out.push({ host, port })
  }
  return out
}

export function sampleArray (arr: []): any {
  if (!arr || !arr.length) return undefined
  return arr[Math.floor(Math.random() * arr.length)]
}
