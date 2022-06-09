export const proxyPath = '/_axiom';

export const isBrowser = typeof window !== 'undefined';

export enum EndpointType {
  webVitals = 'web-vitals',
  logs = 'logs',
}

export const getIngestURL = (t: EndpointType) => {
  const ingestEndpoint = process.env.AXIOM_INGEST_ENDPOINT || process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT;
  if (!ingestEndpoint) {
    return '';
  }

  const url = new URL(ingestEndpoint);
  // attach type query param based on passed EndpointType
  url.searchParams.set('type', t.toString());
  return url.toString();
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return async function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => await fn.apply(this, args), ms);
  };
};