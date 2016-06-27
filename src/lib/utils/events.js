'use strict;'

import handlers from '/src/handlers.js'
import store from '/src/lib/utils/store.js'
import PubSub from '/src/lib/vendor/pubsub.js'

let eventsConfig = {}

// login components config
eventsConfig.login = []
eventsConfig.login.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'submitLogin'
  },
  event: 'click',
  handler: 'handleLogin'
})

eventsConfig.login.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'resetLogin'
  },
  event: 'click',
  handler: 'handleResetLogin'
})

// fylerclient components config
eventsConfig.fylerclient = []
eventsConfig.fylerclient.push({
  selector: {
    nodename: 'SECTION',
    nodeid: 'fylerclient'
  },
  event: 'load',
  handler: 'onmount'
})

eventsConfig.fylerclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'makeCallBtn'
  },
  event: 'click',
  handler: 'makeCall'
})

eventsConfig.fylerclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'changeRequestBtn'
  },
  event: 'click',
  handler: 'showChangeRequestForm'
})

eventsConfig.fylerclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'btnChangeRequest'
  },
  event: 'click',
  handler: 'changeRequest'
})

// apiclient components config
eventsConfig.apiclient = []
eventsConfig.apiclient.push({
  selector: {
    nodename: 'SECTION',
    nodeid: 'apiclient'
  },
  event: 'load',
  handler: 'onmount'
})

eventsConfig.apiclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'makeCallBtn'
  },
  event: 'click',
  handler: 'makeCall'
})

eventsConfig.apiclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'changeRequestBtn'
  },
  event: 'click',
  handler: 'showChangeRequestForm'
})

eventsConfig.apiclient.push({
  selector: {
    nodename: 'BUTTON',
    nodeid: 'btnChangeRequest'
  },
  event: 'click',
  handler: 'changeRequest'
})

// serveauth components config
eventsConfig.test = []
eventsConfig.test.push({
  signal: 'auth-done',
  handler: 'onAuthDone'
})

eventsConfig.riotgram = []
eventsConfig.riotgram.push({
  signal: 'auth-done',
  handler: 'onAuthDone'
})

function setupEvents(data) {
  let context = data.context
  let domain = context.opts.domain || data.domain
  let page = context.opts.page || data.page
  console.debug('setupEvents::  domain > ', domain, ' page > ', page)
  if (domain && page) {
    for (let idx in eventsConfig[page]) {
      let event_json = eventsConfig[page][idx]
      let handler = event_json.handler

      if (!event_json.event && event_json.signal) {
        PubSub.subscribe(event_json.signal, (data) => {
          handlers[page][handler].call(context._, {page: page, domain: domain, data: data}, store, (err, result) => {
            context.update()
            console.log('err -> ', err, ' result-> ', context._)
          })
        })
      } else {
        context.root.addEventListener(event_json.event, (e) => {
          if (e.target.nodeName === event_json.selector.nodename && e.target.id === event_json.selector.nodeid) {
            handlers[page][handler].call(context._, {page: page, domain: domain}, store, (err, result) => {
              context.update()
              console.log('err -> ', err, ' result-> ', context._)
            })
          }
        })
      }
    }
  }
}

function destroyEvents(data) {
  let context = data.context
  let domain = context.opts.domain
  let page = context.opts.page
  if (domain && page) {
    for (let idx in eventsConfig[page]) {
      let event_json = eventsConfig[page][idx]
      let handler = event_json.handler
      context.root.removeEventListener(event_json.event) // todo :: test
      context.update()
    }
  }
}

function setupAllEventHooks(data) {
  let element = data.context.root.getAttribute('data-is')
  // PubSub.subscribe(element + '_setup_events', (data) => {
  setupEvents(data)
// })
// PubSub.subscribe(element + '_destroy_events', (data) => {
//   destroyEvents(data)
// })
}

PubSub.subscribe('setup_all_events', (data) => {
  setupAllEventHooks(data)
})

module.exports = eventsConfig
