## 0.0.7 Publish

- License
- Svelte DevTool

## 0.0.6 Persistent Caching

`jam <cli command>` or `jam <URL>` for jamming on a feature

`jam-server` to independently launch a server (rare).

Additions:

- Persistent caching of responses is now possible
- First successful cypress integration!
- `jam` & `jam-server` CLI commands
- Deleted `jambox <command>` CLI command (replaced with above)
- Simplified/removed many CLI flags
- `config.auto` feature
- `config.cache.write=auto` for auto writing cache to disk
- `config.blockNetworkRequests` boolean added
- `.jambox` cache directory added
- `jambox.config.js` can now be reloaded from `cwd` of the `jam` command
- Several new APIs added to the server to control behavior
- `mode` setting completely deleted as its no longer necessary
- Many changes to internal cache APIs
- Fixes to the size of the installed npm package, dependencies.

Log:

- Add automatic replies feature
  - Set custom status codes, messages for path globs
- No longer cache non mocked 5xx responses
- Reworked startup behavior
- /api/reset implemented, sets settings on startup of a `jam`
  - This allows the server to reconfigure w/o restart
  - No longer necessary to use a hacky hash workaround
- /api/reset loads cache from disk
- cached responses now provide a hash header
- switched several websocket requests to /api/ instead
- smol refactor
- add http-encoding as a dep
- Unwind hashing from cache lookup
- Add Cache read/write (filesystem)
- Split server and `jam` binaries
- Add cache status colors to waterfall

## 0.0.5 Network Waterfall

- Add a waterfall chart
- Remove table
- Add a refresh (page) button

## 0.0.4 Server: Glob support, improved cache

- Add support for globs
- Improve caching
- Change config API
- `localhost` option removed from config
- `forward` option now supports localhost forwarding
- Forwarding tagets must now be fully parsable urls (protocol + host)
- Add a real world in-memory cache example
- Add a few tests
- Clean-up handler logic
- Fix existing tests

## 0.0.3 Housekeeping

- add this file

## 0.0.2 DevTool

- #2

## 0.0.1 First useful local dev feature (Auth)

- #1
- First localhost test
- remapping localhost to a "real" dev url
- working auth flow via proxying of localhost to a dev url
- big refactors to server logic
- added a basic config
- ability to forward requests
- ability to ignore hosts entirely (noProxy)
- better port handling
- /info server endpoint returns config values proxy info
- better stdio/err into logs logic
- support websocket localhost proxying
  - Let's NextJS refresh work properly (!!)
- refactor cache into it's own class
- add tests
- update README
- add a CHANGELOG