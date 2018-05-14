'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var csx = require('csx');
var typestyle = require('typestyle');
var React = _interopDefault(require('react'));
var reactRouterDom = require('react-router-dom');
var TimeAgo = _interopDefault(require('react-timeago'));
var Parser = _interopDefault(require('rss-parser'));
var sanitizeHtml = _interopDefault(require('sanitize-html'));
var reactRouter = require('react-router');
var history = require('history');
var server = require('react-dom/server');
var fastify = _interopDefault(require('fastify'));
var fs = require('fs');
var path = require('path');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function debugClassName($debugName, force = false) {
  return force === true || process.env.NODE_ENV !== 'production' ? {
    $debugName
  } : {};
}
const pageTitleClassName = typestyle.style(debugClassName('page-title'), {
  $debugName: 'page-title',
  fontSize: '12pt',
  margin: 0
});
const pageContentClassName = typestyle.style(debugClassName('page-content'), {
  $debugName: 'page-content',
  opacity: 1,
  padding: csx.px(6),
  transition: 'opacity .2s ease-out'
});

const buildLink = pathname => {
  let pathParts = pathname.split('/');
  let currentPage = parseInt(pathname.split('page/')[1]);
  let nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2;
  if (!pathParts[1] || pathParts[1] === 'page') return `/page/${nextPage}`;
  return `/${pathParts[1]}/page/${nextPage}`;
};

const moreLinkClassName = typestyle.style(debugClassName('more-link'), {
  marginBottom: csx.px(6),
  padding: `0 0 0 ${csx.px(30)}`
});
function More({
  location
}) {
  let link = buildLink(location.pathname);
  return React.createElement("p", {
    className: moreLinkClassName
  }, React.createElement(reactRouterDom.NavLink, {
    to: link
  }, "Load more"));
}

const calculateStartingNumber = pathname => {
  let currentPage = parseInt(pathname.split('page/')[1]);
  if (!Number.isInteger(currentPage)) return 1;
  return (currentPage - 1) * 30 + 1;
};

const storiesListClassName = typestyle.style(debugClassName('stories-list'), {
  padding: `0 0 0 ${csx.px(24)}`
});
const storiesListItemClassName = typestyle.style(debugClassName('stories-list-item'), {
  lineHeight: '11pt',
  margin: `${csx.px(6)} 0`
});
const storiesListByLineClassName = typestyle.style(debugClassName('stories-list-by-line'), {
  color: '#828282',
  fontSize: '7pt',
  $nest: {
    'a:hover': {
      textDecoration: 'underline'
    }
  }
});
function Stories({
  data: stories,
  location
}) {
  return React.createElement(React.Fragment, null, React.createElement("ol", {
    className: storiesListClassName,
    start: calculateStartingNumber(location.pathname)
  }, stories.filter(Boolean).map(story => React.createElement("li", {
    className: storiesListItemClassName,
    key: story.id
  }, React.createElement("span", null, React.createElement("a", {
    href: story.url
  }, story.title)), React.createElement("br", null), React.createElement("span", {
    className: storiesListByLineClassName,
    suppressHydrationWarning: true
  }, story.score, " points by ", story.by.id)))), React.createElement(More, {
    location: location
  }));
}

async function fetchData(filter, page) {
  // Build the URL to request
  let params = filter !== 'comments' ? `filter=${filter}&` : '';
  if (page) params += `page=${page}`;
  const url = `/api/${filter === 'comments' ? 'comments' : 'stories'}?${params}`; // Perform the request

  console.log(`Fetching data from ${url} ...`);
  const response = await fetch(url); // For the fetch API a non 2xx respone is NOT an error. So make sure we handle it

  if (!response.ok) {
    const error = new Error(`Requesting ${url} failed with HTTP status code ${response.status}.`);
    error.code = 'HTTP_ERROR';
    error.response = response;
    throw error;
  }

  return response.json();
}

function AskStoriesPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "ask"), React.createElement(Stories, props));
}

AskStoriesPage.dataFetcher = async function ({
  page
}) {
  return fetchData('ask', page);
};

function JobsStoriesPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "jobs"), React.createElement(Stories, props));
}

JobsStoriesPage.dataFetcher = async function ({
  page
}) {
  return fetchData('jobs', page);
};

const getTitle = title => {
  return (title || '').split('in "').pop().replace(/"/g, '');
};

const commentsListClassName = typestyle.style(debugClassName('comments-list'), {
  listStyle: 'none',
  margin: `0 0 0 ${csx.px(6)}`,
  padding: `0 0 0 ${csx.px(2)}`
});
const commentsListItemClassName = typestyle.style(debugClassName('comments-list-item'), {
  lineHeight: '10pt',
  margin: `${csx.px(6)} 0`
});
const commentsListTitleClassName = typestyle.style(debugClassName('comments-list-title'), {
  display: 'block',
  fontSize: '8pt',
  padding: `0 0 ${csx.px(6)}`
});
const commentsListContentClassName = typestyle.style(debugClassName('comments-list-content'), {
  color: '#000',
  display: 'block',
  fontSize: '9pt',
  lineHeight: '12pt',
  padding: `0 0 ${csx.px(6)}`,
  $nest: {
    p: {
      margin: `${csx.px(4)} 0`
    }
  }
});
function Comments({
  data: comments,
  location
}) {
  return React.createElement(React.Fragment, null, React.createElement("ul", {
    className: commentsListClassName
  }, comments.map((comment, index) => React.createElement("li", {
    className: commentsListItemClassName,
    key: `${comment.isoDate}-${index}`
  }, React.createElement("span", {
    className: commentsListTitleClassName
  }, comment.creator, " ", React.createElement(TimeAgo, {
    date: comment.isoDate
  }), ' | ', " on: ", getTitle(comment.title)), React.createElement("span", {
    className: commentsListContentClassName,
    dangerouslySetInnerHTML: {
      __html: comment.content
    }
  })))), React.createElement(More, {
    location: location
  }));
}

function NewCommentsPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "comments"), React.createElement(Comments, props));
}

NewCommentsPage.dataFetcher = async function ({
  page
}) {
  return fetchData('comments', page);
};

function NewStoriesPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "newest"), React.createElement(Stories, props));
}

NewStoriesPage.dataFetcher = async function ({
  page
}) {
  return fetchData('new', page);
};

function ShowStoriesPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "show"), React.createElement(Stories, props));
}

ShowStoriesPage.dataFetcher = async function ({
  page
}) {
  return fetchData('show', page);
};

function TopStoriesPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "top"), React.createElement(Stories, props));
}

TopStoriesPage.dataFetcher = async function ({
  page
}) {
  return fetchData('top', page);
};

const routes = {
  '': TopStoriesPage,
  '/newest': NewStoriesPage,
  '/newcomments': NewCommentsPage,
  '/show': ShowStoriesPage,
  '/ask': AskStoriesPage,
  '/jobs': JobsStoriesPage
};

const pageSize = 30;

function computeCacheKey(type, ...args) {
  console.log(`${type}:${args.join('|')}`);
  return `${type}:${args.join('|')}`;
}

async function fetchStories(request, reply) {
  // Get parameters
  const {
    filter,
    page
  } = request.query || {};
  const cacheKey = computeCacheKey('stories', filter, page); // Check cache first

  const cached = request.apiCache.get(cacheKey);
  if (cached) return cached; // Calculate page offset

  const offset = (Math.max(parseInt(page, 0) || 0, 1) - 1) * pageSize; // Choose the query type

  let queryType = 'topStories';

  switch (filter) {
    case 'show':
      queryType = 'showStories';
      break;

    case 'ask':
      queryType = 'askStories';
      break;

    case 'jobs':
      queryType = 'jobStories';
      break;

    case 'rank':
      queryType = 'newStories';
      break;

    case 'new':
      queryType = 'newStories';
      break;
  } // Build the query


  const body = {
    query: `
    query {
      hn {
        ${queryType}(limit: ${pageSize}, offset: ${offset}) {
          id
          title
          url
          score
          by {
            id
          }
        }
      }
    }
    ` // Perform the request

  };
  const response = await fetch('https://www.graphqlhub.com/graphql/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }); // Parse the response

  const json = await response.json();
  const data = json.data.hn[queryType]; // Cache for 5 minutes

  request.apiCache.put(cacheKey, data, 300 * 1000); // Return results

  return data;
}
async function fetchComments(request, reply) {
  // Get parameters
  const {
    page
  } = request.query || {};
  const cacheKey = computeCacheKey('comments', page); // Check cache first

  const cached = request.apiCache.get(cacheKey);
  if (cached) return cached; // Get parameters

  const offset = (Math.max(parseInt(page, 0) || 0, 1) - 1) * pageSize; // Fetch the comments

  const parser = new Parser();
  const response = await parser.parseURL('https://hnrss.org/newcomments?count=100');
  const items = response.items.filter(item => item.title).slice(offset, offset + pageSize); // Sanitize comments content

  const data = items.map((_ref) => {
    let {
      content
    } = _ref,
        rest = _objectWithoutProperties(_ref, ["content"]);

    return _objectSpread({
      content: sanitizeHtml(content)
    }, rest);
  }); // Cache for 5 minutes

  request.apiCache.put(cacheKey, data, 300 * 1000);
  return data;
}

const logoClassName = typestyle.style(debugClassName('logo'), {
  backgroundImage: 'url(data:image/gif;base64,R0lGODlhEgASAKIAAP/jyvihV/aKLfmxc/////9mAAAAAAAAACH5BAAAAAAALAAAAAASABIAAAMpWLrc/jDKOQkRy8pBhuKeRAAKQFBBxwVUYY5twXVxodV3nLd77f9ASQIAOw==)',
  backgroundSize: csx.px(18),
  border: `${csx.px(1)} solid #fff`,
  display: 'inline-block',
  height: csx.px(18),
  width: csx.px(18)
});
function Logo(props) {
  return React.createElement("div", {
    className: logoClassName
  });
}

const navigationClassName = typestyle.style(debugClassName('navigation'), {
  alignItems: 'center',
  backgroundColor: '#fe6501',
  display: 'flex',
  padding: csx.px(2),
  $nest: {
    a: {
      color: '#000'
    },
    'a.active': {
      color: '#FFF'
    }
  }
});
const navigationLogoClassName = typestyle.style(debugClassName('navigation-logo'), {
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0
});
const navigationTextClassName = typestyle.style(debugClassName('navigation-text'), {
  fontWeight: 700,
  padding: `${csx.px(2)} ${csx.px(4)}`
});
const navigationNavClassName = typestyle.style(debugClassName('navigation-nav'), {
  color: '#000',
  fontSize: '9pt',
  marginLeft: csx.px(8),
  $nest: {
    a: {
      margin: `0 ${csx.rem(0.2)}`
    }
  }
}, typestyle.media({
  minWidth: csx.px(500)
}, {
  fontSize: '10pt'
}));
function Navigation({
  location
}) {
  return React.createElement("div", {
    className: navigationClassName
  }, React.createElement(reactRouterDom.Link, {
    to: "/",
    className: navigationLogoClassName
  }, React.createElement(Logo, null), React.createElement("span", {
    className: navigationTextClassName
  }, "Hacker News")), React.createElement("nav", {
    className: navigationNavClassName
  }, React.createElement(reactRouterDom.NavLink, {
    to: "/newest"
  }, "new"), "|", React.createElement(reactRouterDom.NavLink, {
    to: "/newcomments"
  }, "comments"), "|", React.createElement(reactRouterDom.NavLink, {
    to: "/show"
  }, "show"), "|", React.createElement(reactRouterDom.NavLink, {
    to: "/ask"
  }, "ask"), "|", React.createElement(reactRouterDom.NavLink, {
    to: "/jobs"
  }, "jobs")));
}

function ErrorPage(props) {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "Woops, something went wrong"), React.createElement("h4", null, "Error: ", props.error.message), React.createElement("h6", null, "Requested page: ", props.location.pathname));
}

function LoadingPage() {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "Loading..."));
}

function OfflinePage() {
  return React.createElement("div", {
    className: pageContentClassName
  }, React.createElement("h1", {
    className: pageTitleClassName
  }, "Looks like you are offline!"));
}

class RouteWithData extends reactRouter.Route {
  constructor(props, context) {
    super(props, context); // Gather errors pages

    this.placeholdersPages = Object.assign({
      error: ErrorPage,
      loading: LoadingPage,
      offline: OfflinePage
    }, this.props.component.placeholdersPages || {});
  }

  render() {
    // There is no match, nothing to worry about
    if (!this.state.match) return null; // If we preloaded the data, render it

    if (this.props.ssrPreloading && this.props.ssrPreloading.hasOwnProperty('payload')) return this.renderPreloaded();

    if (this.state.error) {
      // If we have an error, show it - Show the offline page if needed
      return this.renderComponent(this.placeholdersPages[window.navigator.onLine ? 'error' : 'offline'], {
        error: this.state.error
      });
    } else if (!this.state.data) {
      // If no data loaded yet, trigger data loading and show the loading page
      this.loadData();
      return this.renderComponent(this.placeholdersPages.loading);
    }

    return this.renderComponent(this.props.component, {
      data: this.state.data
    });
  }

  renderPreloaded() {
    // Gather the properties we're going to forward
    const {
      ssrPreloading: {
        success,
        payload
      }
    } = this.props; // Render the appropriate component - Note that on SSR there is no Loading or Offline case here, obviously

    if (!success) return this.renderComponent(this.placeholdersPages.error, {
      error: payload
    });
    return this.renderComponent(this.props.component, {
      data: payload
    });
  }

  renderComponent(component, additionalProps = {}) {
    const {
      history: history$$1,
      route,
      staticContext
    } = this.context.router;
    const location = this.props.location || route.location;
    const props = Object.assign({
      match: this.state.match,
      location,
      history: history$$1,
      staticContext
    }, additionalProps); // Render

    return React.createElement(component, props);
  }

  componentDidMount() {
    // Once the data has been used, mark it as used - This is done here since the method is not called on the server
    delete this.props.ssrPreloading.payload;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    super.componentWillReceiveProps(nextProps, nextContext);
    this.setState(() => ({
      data: null,
      error: null
    }));
  }

  async loadData() {
    try {
      const data = await this.props.component.dataFetcher(this.state.match.params);
      this.setState(() => ({
        data
      }));
    } catch (error) {
      this.setState(() => ({
        error
      }));
    }
  }

}

const appShellClassName = typestyle.style(debugClassName('app'), {
  background: csx.rgb(246, 246, 239).toString(),
  borderBottom: `${csx.px(2)} solid #fe6501`
});
function AppShell({
  history: history$$1,
  ssrPreloading
}) {
  const routesConfig = Object.entries(routes).reduce((accu, [path$$1, component]) => {
    return accu.concat({
      path: path$$1 || '/',
      component,
      ssrPreloading,
      exact: true
    }, {
      path: `${path$$1}/page/:page`,
      component,
      ssrPreloading,
      exact: true
    });
  }, []);
  const contents = React.createElement("div", {
    className: appShellClassName
  }, React.createElement(Navigation, null), React.createElement(reactRouter.Switch, null, routesConfig.map((routeProps, i) => React.createElement(RouteWithData, _extends({
    key: i
  }, routeProps)))));

  if (typeof window === 'undefined') {
    return React.createElement(reactRouter.Router, {
      history: history$$1
    }, contents);
  } else {
    return React.createElement(reactRouterDom.BrowserRouter, null, contents);
  }
}

const globalStyles = typestyle.createTypeStyle(); // Instantiate a different typestyle sheet since global styles won't be regenerated from the client

globalStyles.cssRule('body', {
  color: '#828282',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '10pt',
  margin: 0,
  width: csx.percent(100)
}, typestyle.media({
  minWidth: csx.px(600)
}, {
  margin: `${csx.px(8)} auto`,
  width: csx.percent(85)
}));
globalStyles.cssRule('a', {
  color: '#000000',
  textDecoration: 'none',
  $nest: {
    '&:visited': {
      color: '#828282'
    }
  }
});
async function renderPage(request, reply) {
  // Prepare the history
  const history$$1 = history.createMemoryHistory({
    initialEntries: [request.req.url]
  }); // Preload component data, if anything is defined

  let ssrPreloading = {};

  try {
    if (reply.context.config.component && typeof reply.context.config.component.dataFetcher === 'function') {
      ssrPreloading = {
        success: true,
        payload: await reply.context.config.component.dataFetcher(request.params)
      };
    }
  } catch (e) {
    ssrPreloading = {
      success: false,
      payload: e
    };
  } // Render the application separately in order to support typestyle


  const app = server.renderToStaticMarkup(React.createElement(AppShell, {
    history: history$$1,
    ssrPreloading: ssrPreloading
  })); // Return the rendered page

  reply.type('text/html');
  return server.renderToStaticMarkup(React.createElement("html", {
    lang: "en"
  }, React.createElement("head", null, React.createElement("title", null, "Hacker News"), React.createElement("meta", {
    httpEquiv: "X-UA-Compatible",
    content: "IE=edge"
  }), React.createElement("meta", {
    charSet: "utf8"
  }), React.createElement("meta", {
    name: "description",
    content: "Hacker News PWA"
  }), React.createElement("meta", {
    name: "keywords",
    content: "hackernews, pwa"
  }), React.createElement("meta", {
    name: "author",
    content: "nearForm"
  }), React.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), React.createElement("meta", {
    name: "apple-mobile-web-app-capable",
    content: "yes"
  }), React.createElement("meta", {
    name: "theme-color",
    content: "#ff6600"
  }), React.createElement("link", {
    rel: "icon",
    href: "/images/favicon.ico",
    sizes: "32x32"
  }), React.createElement("link", {
    rel: "shortcut icon",
    href: "images/favicon.ico",
    sizes: "196x196"
  }), React.createElement("link", {
    rel: "manifest",
    href: "/manifest.json"
  }), React.createElement("style", null, globalStyles.getStyles()), React.createElement("style", null, typestyle.getStyles())), React.createElement("body", null, React.createElement("div", {
    id: "root",
    dangerouslySetInnerHTML: {
      __html: app
    }
  }), React.createElement("script", {
    defer: true,
    type: "text/javascript",
    dangerouslySetInnerHTML: {
      __html: `window.__ssrPreloading = ${JSON.stringify(ssrPreloading)}`
    }
  }), React.createElement("script", {
    defer: true,
    type: "text/javascript",
    src: "/app.js"
  }))));
}

const nodeFetch = require('node-fetch');

function detectHttps() {
  const certPath = path.resolve(process.cwd(), 'ssl/certificate.pem');
  const keyPath = path.resolve(process.cwd(), 'ssl/private-key.pem');
  if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) return {};
  return {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    },
    http2: true
  };
}

function setupFetch(server$$1) {
  global.fetch = async function (url, params) {
    // External call, just use node-fetch
    if (!url.startsWith('/api')) return nodeFetch(url, params); // Local fetching, serve with fastify.inject

    const response = await server$$1.inject(_objectSpread({
      method: 'GET',
      url
    }, params));
    response.status = response.statusCode;
    response.statusText = response.statusMessage;
    return new nodeFetch.Response(response.payload, response);
  };
}

function main() {
  console.log(process.cwd(), path.resolve(process.cwd(), './dist')); // Create the instance

  const server$$1 = fastify(_objectSpread({
    logger: {
      prettyPrint: true
    }
  }, detectHttps())); // Add routes

  for (const [path$$1, component] of Object.entries(routes)) {
    for (const suffix of ['', '/page/:page']) {
      server$$1.route({
        method: 'GET',
        url: `${path$$1}${suffix}` || '/',
        handler: renderPage,
        config: {
          component
        }
      });
    }
  }

  server$$1.get('/api/stories', fetchStories);
  server$$1.get('/api/comments', fetchComments); // Add application assets and manifest.json serving

  server$$1.register(require('fastify-static'), {
    root: path.resolve(process.cwd(), 'dist'),
    prefix: '/'
  });
  server$$1.register(require('fastify-compress'));
  server$$1.decorateRequest('apiCache', require('memory-cache')); // Add server side support for fetch

  setupFetch(server$$1); // Run the server!

  server$$1.listen(3000, '0.0.0.0', function (err) {
    if (err) throw err;
  });
}

main();
