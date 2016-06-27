const riot = require('riot');
module.exports = {
  // init method is a special one which can initialize
  // the mixin when it's loaded to the tag and is not
  // accessible from the tag its mixed in
  nextView: 'xxx',
  init: function (stores) {
    let self = this

    // self._ shall already be existing, if not skip
    if (!self._) {
      self._ = {}
    }
    self._.navTo = function (targetUri, container) {
      this.nextView = container
      if (targetUri.indexOf('target') !== -1) {
        let extraParams = {domain: '', page: '', view: '', target: '', fragment: ''}
        var replaced = targetUri.slice(1)
        var arr = replaced.split('&')
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i].split('=') && arr[i].split('=').length === 2) {
            var keyValArr = arr[i].split('=')
            extraParams[keyValArr[0]] = keyValArr[1] || ''
          }
        }
        let options = {
          domain: extraParams.domain,
          page: extraParams.page
        }
        
        require('../../views/blocks/' + this.nextView + '/' + extraParams.fragment + '.tag!')
        riot.mount(extraParams.target, extraParams.fragment, options)
      } else {
        document.location.href = targetUri
      }
    }
  }
}
