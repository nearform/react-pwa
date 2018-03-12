const React = require('react')
const { Component } = React

const { matchRoutes, renderRoutes } = require('react-router-config')
const { fetchPageData } = require('../store/actions/page-loader')

const LoadingPage = require('../pages/LoadingPage')

class PageLoader extends Component {
  componentDidMount () {
    if (this.props.errorOccured || this.props.isStoreValid) {
      console.log('\n\n\n SSR - no need to refetch')
      // SSR error - no need to refetch
      // SSR and store is valid - the router url matches the context.url
      return
    }

    // store is not valid
    // eg app-shell has been returned from request
    // it's context.url will be /app-shell
    console.log('\n\n\n Appshell - need to fetch')
    this._navigatedTo(this.props.location)
  }

  componentWillReceiveProps (nextProps) {
    const navigationChanged = nextProps.location !== this.props.location

    if (navigationChanged) {
      this._navigatedTo(nextProps.location)
    }
  }

  shouldComponentUpdate (nextProps) {
    const navigationChanged = nextProps.location !== this.props.location
    return !navigationChanged && !nextProps.isFetching
  }

  _navigatedTo (location) {
    const { routes, dispatch, handleError, handleOfflineMode } = this.props
    const matchedRoutes = matchRoutes(routes, location.pathname)

    Promise
      .all([
        this._fetchData(matchedRoutes, dispatch),
        this._loadComponents(matchedRoutes)
      ])
      // .then(([data]) => {
      //   // render!
      //   // this.setState()
      //
      //   // const [initialState] = data
      //   //
      //   // if (initialState) {
      //   //   updateInitialState(initialState)
      //   // }
      // })
      .catch((error) => {
        // js / css could fail
        // data loading could fail
        if (window.navigator.onLine) {
          handleError({ error })
        } else {
          handleOfflineMode()
        }
      })
      .then(() => {
        window.scrollTo(0, 0)
      })
  }

  _loadComponents (matchedRoutes) {
    const promises = matchedRoutes.map(({ route }) => (
      route.component.preload
        ? route.component.preload()
        : Promise.resolve())
    )
    return Promise.all(promises)
  }

  _fetchData (matchedRoutes, dispatch) {
    const promises = matchedRoutes.map(({ route, match }) => (
      route.fetcher
        ? dispatch(fetchPageData({ route, match }))
        : Promise.resolve())
    )
    return Promise.all(promises)
  }

  render () {
    const {
      routes,
      isStoreValid,
      isOffline,
      errorOccured,
      OfflinePage,
      ErrorPage
    } = this.props

    if (isOffline) {
      return OfflinePage
    }

    if (errorOccured) {
      return ErrorPage
    }

    if (!isStoreValid) {
      // TODO reuse loading page
      return <LoadingPage />
    }

    return renderRoutes(routes)
  }
}

// extension point - creating a container
const { connect } = require('react-redux')

function mstp (state, ownProps) {
  const { location } = state.router
  const { isFetching, renderedRoute } = state.pageLoader

  const { routes } = ownProps
  const { route: matchRouted } = matchRoutes(routes, location.pathname)[0]
  const isStoreValid = matchRouted.path === renderedRoute.path

  return {
    isFetching,
    location,
    renderedRoute,
    isStoreValid,
    isOffline: false,
    errorOccured: false,
    OfflinePage: () => <span>offline</span>,
    ErrorPage: () => <span>offline</span>
  }
}

function mdtp (dispatch) {
  return {
    dispatch,
    handleError: () => {},
    handleOfflineMode: () => {}
  }
}

module.exports = connect(mstp, mdtp)(PageLoader)
