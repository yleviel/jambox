import { writable } from 'svelte/store';

export const CONTENT_MAP = {
  'application/javascript': 'js',
  'application/json': 'fetch',
  'text/html': 'html',
  'text/css': 'css',
};

const getContentType = (url, response) => {
  const contentTypeHeader = response?.headers['content-type'] ?? null;

  if (!contentTypeHeader || url.pathname.endsWith('.map')) {
    return 'other';
  }

  return CONTENT_MAP[contentTypeHeader.split(';')[0]] || 'other';
};

export const initialState = {
  config: {},
  http: {},
  abortedRequestById: {},
  blockNetwork: false,
  cache: {},
  filters: {
    cache: '',
  },
};

const mapCacheEntry = (entry) => {
  const url = new URL(entry.request.url);
  return {
    ...entry,
    url,
    host: url.hostname,
    path: entry.request.path,
    method: entry.request.method,
    statusCode: entry.response?.statusCode,
  };
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'clear': {
      return {
        ...state,
        http: {},
      };
    }
    case 'config': {
      return {
        ...state,
        config: payload,
      };
    }
    case 'refresh': {
      return {
        ...state,
        http: {},
      };
    }
    case 'abort': {
      return {
        ...state,
        http: {
          ...state.http,
          [payload.id]: {
            ...state.http[payload.id],
            aborted: payload,
          },
        },
      };
    }
    case 'request': {
      const url = new URL(payload.url);
      return {
        ...state,
        http: {
          ...state.http,
          [payload.id]: {
            id: payload.id,
            url,
            request: payload,
          },
        },
      };
    }
    case 'response': {
      // Extension refresh in the middle of a request -> response cycle
      if (!state.http[payload.id]) {
        return state;
      }
      const contentType = getContentType(state.http[payload.id].url, payload);

      return {
        ...state,
        http: {
          ...state.http,
          [payload.id]: {
            ...state.http[payload.id],
            contentType,
            response: payload,
          },
        },
      };
    }
    case 'cache.commit':
    case 'cache.update': {
      return {
        ...state,
        cache: {
          ...state.cache,
          [payload.id]: mapCacheEntry(payload),
        },
      };
    }
    case 'cache.load': {
      for (const id in payload) {
        payload[id] = mapCacheEntry(payload[id]);
      }
      return {
        ...state,
        cache: {
          ...state.cache,
          ...payload,
        },
      };
    }
    case 'cache.revert': {
      const { [payload.id]: omit, ...cache } = state.cache;
      return {
        ...state,
        cache,
      };
    }
    case 'search.cache': {
      return {
        ...state,
        filters: {
          cache: payload,
        },
      };
    }
    default:
      return state;
  }
};

export const store = writable(initialState);
