'use strict';

/**
 * @ngdoc function
 * @name siteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the siteApp
 */
angular.module('siteApp')
  .controller('MainCtrl', function ($scope, $sce) {
    $scope.methods = [{
      signature:   '.sub(channels, fn [, id])',
      description: 'Subscribes to the given <code>channels</code> with a handler function <code>fn</code>. It\'s aliased with an optional <code>id</code>.',
      params: [{
        name:        'channels',
        types:       ['string', 'regexp'],
        description: 'Channels to subscribe to.'
      }, {
        name:        'fn',
        types:       ['function'],
        description: 'Function that is executed when a message is published to one of the channels.'
      }, {
        name:        'id',
        types:       ['string'],
        description: 'Identifier used when unsubscribing.',
        optional:    true
      }]
    }, {
      signature:   '.pub(channels [, data1, data2, ..., dataN])',
      description: 'Publishes <code>data1...dataN</code> to the given <code>channels</code>.',
      params: [{
        name:        'channels',
        types:       ['string', 'regexp'],
        description: 'Channels to publish to.'
      }, {
        name:        'data*',
        types:       ['any'],
        description: 'Data to publish.'
      }]
    }, {
      signature:   '.unsub(channels, fnId)',
      description: 'Unsubscribes a subscriber identified from the handler function or alias <code>fnId</code> from the given <code>channels</code>.',
      params: [{
        name:        'channels',
        types:       ['string', 'regexp'],
        description: 'Channels to unsubscribe to.'
      }, {
        name:        'fnId',
        types:       ['string', 'function'],
        description: 'Subscriber to remove.  Identified by the alias (if provided on subscription) or the handling function.'
      }]
    }, {
      signature:   '.subs(channels)',
      description: 'Returns an array of known subscribers to the given <code>channels</code>.',
      params: [{
        name:        'channels',
        types:       ['string', 'regexp'],
        description: 'Channels to find the subscribers of.  A blank value will return the subscribers for all channels.'
      }]
    }, {
      signature:   '.clear(channels)',
      description: 'Destroys the given <code>channels</code> and unsubscribes all subscribers from said channels.',
      params: [{
        name:        'channels',
        types:       ['string', 'regexp'],
        description: 'Channels to destroy.  A blank value will destroy all channels.'
      }]
    }, {
      signature:   '.channelsAsArray()',
      description: 'Returns all known channels as an array.'
    }, {
      signature: '.newInstance()',
      description: 'Creates a new, encapsulated instance of <samp>Crier</samp>'
    }];
    
    angular.forEach($scope.methods, function (method) {
      method.description = $sce.trustAsHtml(method.description);
      
      angular.forEach(method.params, function (param) {      
        var flags = {
          'string':   false,
          'regexp':   false,
          'boolean':  false,
          'number':   false,
          'function': false,
          'any':      false
        };
        
        for (var i = 0; i < param.types.length; i++) {
          flags[param.types[i]] = true;
        }
        
        param.types = flags;
      });
    });
  });
