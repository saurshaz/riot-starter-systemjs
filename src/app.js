

var riot = require('riot')
require('riot-router')
    
  
// Redirect unlogged users to /login page
function processorFilter(request, response, next) {
//   let pathArr = location.pathname.split('/')
//   // let view = pathArr[5].slice(1)
//   let extraParams = {domain: '', page: '', view: '', target: '', fragment: ''}
//   var replaced = window.location.search.slice(1)
//   var arr = replaced.split('&')
//   for (var i = arr.length - 1; i >= 0; i--) {
//     if (arr[i].split('=') && arr[i].split('=').length === 2) {
//       var keyValArr = arr[i].split('=')
//       extraParams[keyVa	lArr[0]] = keyValArr[1] || ''
//     }
//   }

  try {
    let projectName = 'test'
    // if (!extraParams.target) {
    let options = {
      domain: 'user',
      page: 'test'
    }
    let moduleName
    // if (projectName) {
    //   if (pathArr[3] === pathArr[5].split('.')[0]) {
    //     //  handling container page mouning
    //     require('../riot/views/' + projectName + '/' + pathArr[3] + '-container' + '.html')
    //     moduleName = pathArr[3] + '-container'
    //   } else {
    //     require('../riot/views/' + projectName + '/' + pathArr[3] + '.html')
    //     moduleName = pathArr[3]
    //   }
    // } else {
    //   require('../riot/views/' + pathArr[3].slice(1) + '-container' + '.html')
    //   moduleName = pathArr[3]
    // }
    console.log(' app kickstarted ')
    require('./views/blocks/test/test-container.tag!')// @todo : rm hardcoding
    moduleName = projectName + '-container'
    riot.mount('#app', moduleName, options)
    // } else {
    //   extraParams.target = extraParams.target || '#app'
    //   riot.mount(extraParams.target, extraParams.page, options)
    // }

    // we need this to easily check the current route from every component
    riot.routeState = {
      view: ''
    }
  } catch (e) {
    console.log(' **** error in routing for view  >> ')
    console.log('details of error ', e)
    next()
  } finally {
    next()
  }
}
// Apply security filter to Riot-Router
riot.router.use(processorFilter)
riot.mount('*')
// Start routing
riot.router.start()