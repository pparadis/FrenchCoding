(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Dropbox.Drivers.BrowserBase = (function() {

    function BrowserBase(options) {
      this.rememberUser = (options != null ? options.rememberUser : void 0) || false;
      this.useQuery = (options != null ? options.useQuery : void 0) || false;
      this.scope = (options != null ? options.scope : void 0) || 'default';
      this.storageKey = null;
      this.dbTokenRe = new RegExp("(#|\\?|&)dboauth_token=([^&#]+)(&|#|$)");
      this.rejectedRe = new RegExp("(#|\\?|&)not_approved=true(&|#|$)");
      this.tokenRe = new RegExp("(#|\\?|&)oauth_token=([^&#]+)(&|#|$)");
    }

    BrowserBase.prototype.onAuthStateChange = function(client, callback) {
      var _this = this;
      this.setStorageKey(client);
      switch (client.authState) {
        case DropboxClient.RESET:
          return this.loadCredentials(function(credentials) {
            if (!credentials) {
              return callback();
            }
            if (credentials.authState) {
              client.setCredentials(credentials);
              return callback();
            }
            if (!_this.rememberUser) {
              _this.forgetCredentials();
              return callback();
            }
            client.setCredentials(credentials);
            return client.getUserInfo(function(error) {
              if (error) {
                client.reset();
                return _this.forgetCredentials(callback);
              } else {
                return callback();
              }
            });
          });
        case DropboxClient.REQUEST:
          return this.storeCredentials(client.credentials(), callback);
        case DropboxClient.DONE:
          if (this.rememberUser) {
            return this.storeCredentials(client.credentials(), callback);
          }
          return this.forgetCredentials(callback);
        case DropboxClient.SIGNED_OFF:
          return this.forgetCredentials(callback);
        case DropboxClient.ERROR:
          return this.forgetCredentials(callback);
        default:
          callback();
          return this;
      }
    };

    BrowserBase.prototype.setStorageKey = function(client) {
      this.storageKey = "dropbox-auth:" + this.scope + ":" + (client.appHash());
      return this;
    };

    BrowserBase.prototype.storeCredentials = function(credentials, callback) {
      localStorage.setItem(this.storageKey, JSON.stringify(credentials));
      callback();
      return this;
    };

    BrowserBase.prototype.loadCredentials = function(callback) {
      var jsonString;
      jsonString = localStorage.getItem(this.storageKey);
      if (!jsonString) {
        callback(null);
        return this;
      }
      try {
        callback(JSON.parse(jsonString));
      } catch (jsonError) {
        callback(null);
      }
      return this;
    };

    BrowserBase.prototype.forgetCredentials = function(callback) {
      localStorage.removeItem(this.storageKey);
      callback();
      return this;
    };

    BrowserBase.prototype.computeUrl = function(baseUrl) {
      var fragment, location, locationPair, querySuffix;
      querySuffix = "_dropboxjs_scope=" + (encodeURIComponent(this.scope)) + "&dboauth_token=";
      location = baseUrl;
      if (location.indexOf('#') === -1) {
        fragment = null;
      } else {
        locationPair = location.split('#', 2);
        location = locationPair[0];
        fragment = locationPair[1];
      }
      if (this.useQuery) {
        if (location.indexOf('?') === -1) {
          location += "?" + querySuffix;
        } else {
          location += "&" + querySuffix;
        }
        if (fragment) {
          return [location, '#' + fragment];
        } else {
          return [location, ''];
        }
      } else {
        return [location + '#?' + querySuffix, ''];
      }
    };

    BrowserBase.prototype.locationToken = function(url) {
      var location, match, scopePattern;
      location = url || Dropbox.Drivers.BrowserBase.currentLocation();
      scopePattern = "_dropboxjs_scope=" + (encodeURIComponent(this.scope)) + "&";
      if ((typeof location.indexOf === "function" ? location.indexOf(scopePattern) : void 0) === -1) {
        return null;
      }
      if (this.rejectedRe.test(location)) {
        match = this.dbTokenRe.exec(location);
        if (match) {
          return decodeURIComponent(match[2]);
        } else {
          return null;
        }
      }
      match = this.tokenRe.exec(location);
      if (match) {
        return decodeURIComponent(match[2]);
      }
      return null;
    };

    BrowserBase.currentLocation = function() {
      return window.location.href;
    };

    return BrowserBase;

  })();

  Dropbox.Drivers.Redirect = (function(_super) {

    __extends(Redirect, _super);

    function Redirect(options) {
      var _ref;
      Redirect.__super__.constructor.call(this, options);
      _ref = this.computeUrl(Dropbox.Drivers.BrowserBase.currentLocation()), this.receiverUrl1 = _ref[0], this.receiverUrl2 = _ref[1];
    }

    Redirect.prototype.onAuthStateChange = function(client, callback) {
      var superCall,
        _this = this;
      superCall = (function() {
        return function() {
          return Redirect.__super__.onAuthStateChange.call(_this, client, callback);
        };
      })();
      this.setStorageKey(client);
      if (client.authState === DropboxClient.RESET) {
        return this.loadCredentials(function(credentials) {
          if (credentials && credentials.authState) {
            if (credentials.token === _this.locationToken() && credentials.authState === DropboxClient.REQUEST) {
              credentials.authState = DropboxClient.AUTHORIZED;
              return _this.storeCredentials(credentials, superCall);
            } else {
              return _this.forgetCredentials(superCall);
            }
          }
          return superCall();
        });
      } else {
        return superCall();
      }
    };

    Redirect.prototype.url = function(token) {
      return this.receiverUrl1 + encodeURIComponent(token) + this.receiverUrl2;
    };

    Redirect.prototype.doAuthorize = function(authUrl) {
      return window.location.assign(authUrl);
    };

    return Redirect;

  })(Dropbox.Drivers.BrowserBase);

  Dropbox.Drivers.Popup = (function(_super) {

    __extends(Popup, _super);

    function Popup(options) {
      var _ref;
      Popup.__super__.constructor.call(this, options);
      _ref = this.computeUrl(this.baseUrl(options)), this.receiverUrl1 = _ref[0], this.receiverUrl2 = _ref[1];
    }

    Popup.prototype.onAuthStateChange = function(client, callback) {
      var superCall,
        _this = this;
      superCall = (function() {
        return function() {
          return Popup.__super__.onAuthStateChange.call(_this, client, callback);
        };
      })();
      this.setStorageKey(client);
      if (client.authState === DropboxClient.RESET) {
        return this.loadCredentials(function(credentials) {
          if (credentials && credentials.authState) {
            return _this.forgetCredentials(superCall);
          }
          return superCall();
        });
      } else {
        return superCall();
      }
    };

    Popup.prototype.doAuthorize = function(authUrl, token, tokenSecret, callback) {
      this.listenForMessage(token, callback);
      return this.openWindow(authUrl);
    };

    Popup.prototype.url = function(token) {
      return this.receiverUrl1 + encodeURIComponent(token) + this.receiverUrl2;
    };

    Popup.prototype.baseUrl = function(options) {
      var fragments;
      if (options) {
        if (options.receiverUrl) {
          return options.receiverUrl;
        } else if (options.receiverFile) {
          fragments = Dropbox.Drivers.BrowserBase.currentLocation().split('/');
          fragments[fragments.length - 1] = options.receiverFile;
          return fragments.join('/');
        }
      }
      return Dropbox.Drivers.BrowserBase.currentLocation();
    };

    Popup.prototype.openWindow = function(url) {
      return window.open(url, '_dropboxOauthSigninWindow', this.popupWindowSpec(980, 700));
    };

    Popup.prototype.popupWindowSpec = function(popupWidth, popupHeight) {
      var height, popupLeft, popupTop, width, x0, y0, _ref, _ref1, _ref2, _ref3;
      x0 = (_ref = window.screenX) != null ? _ref : window.screenLeft;
      y0 = (_ref1 = window.screenY) != null ? _ref1 : window.screenTop;
      width = (_ref2 = window.outerWidth) != null ? _ref2 : document.documentElement.clientWidth;
      height = (_ref3 = window.outerHeight) != null ? _ref3 : document.documentElement.clientHeight;
      popupLeft = Math.round(x0 + (width - popupWidth) / 2);
      popupTop = Math.round(y0 + (height - popupHeight) / 2.5);
      if (popupLeft < x0) {
        popupLeft = x0;
      }
      if (popupTop < y0) {
        popupTop = y0;
      }
      return ("width=" + popupWidth + ",height=" + popupHeight + ",") + ("left=" + popupLeft + ",top=" + popupTop) + 'dialog=yes,dependent=yes,scrollbars=yes,location=yes';
    };

    Popup.prototype.listenForMessage = function(token, callback) {
      var listener,
        _this = this;
      listener = function(event) {
        var data;
        if (event.data) {
          data = event.data;
        } else {
          data = event;
        }
        if (_this.locationToken(data) === token) {
          token = null;
          window.removeEventListener('message', listener);
          Dropbox.Drivers.Popup.onMessage.removeListener(listener);
          return callback();
        }
      };
      window.addEventListener('message', listener, false);
      return Dropbox.Drivers.Popup.onMessage.addListener(listener);
    };

    Popup.oauthReceiver = function() {
      return window.addEventListener('load', function() {
        var opener;
        opener = window.opener;
        if (window.parent !== window.top) {
          opener || (opener = window.parent);
        }
        if (opener) {
          try {
            opener.postMessage(window.location.href, '*');
          } catch (ieError) {

          }
          try {
            opener.Dropbox.Drivers.Popup.onMessage.dispatch(window.location.href);
          } catch (frameError) {

          }
        }
        return window.close();
      });
    };

    Popup.onMessage = new Dropbox.EventSource;

    return Popup;

  })(Dropbox.Drivers.BrowserBase);

}).call(this);
