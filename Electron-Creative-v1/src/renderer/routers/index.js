const route = (event) => {
  event = event || window.event
  event.preventDefault()
  window.history.pushState({}, '', event.target.href)
  handleLocation()
  console.log(event.target.href)
}

const routes = {
  '/404': '../pages/404.html',
  '/createproject': '../pages/createproject.html'
}

const handleLocation = async () => {
  const path = window.location.pathname
  const routePath = routes[path] || routes['/404']

  try {
    const response = await fetch(routePath)
    if (!response.ok) {
      throw new Error('Response was not ok.')
    }

    const html = await response.text()
    document.getElementById('root').innerHTML = html
  } catch (error) {
    console.error('Error handling location:', error)
  }
}

window.onpopstate = handleLocation
window.route = route
handleLocation()
