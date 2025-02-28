'use strict';

angular.module('insight.system').controller('HeaderController',
  function($scope, $rootScope, $modal, getSocket, Global, Block) {
    $scope.global = Global;

    $rootScope.currency = {
      factor: 1,
      symbol: 'AIDP',
      realSymbol: 'AIDP'
    };

    $scope.menu = [{
      'title': 'Blocks',
      'link': 'blocks'
    }, {
	  'title': 'Statistics',
      'link': 'stats'
	}, {
	  'title': 'Rich List',
      'link': 'rich-list'
	}, {
	  'title': 'Pools',
      'link': 'pools'
	}, {
	  'title': 'Nodes',
      'link': 'network'
	}, {
      'title': 'Status',
      'link': 'status'
    }];

    $scope.openScannerModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scannerModal.html',
        controller: 'ScannerController'
      });
    };

    var _getBlock = function(hash) {
      Block.get({
        blockHash: hash
      }, function(res) {
        $scope.totalBlocks = res.height;
      });
    };

    var socket = getSocket($scope);
    socket.on('connect', function() {
      socket.emit('subscribe', 'inv');

      socket.on('block', function(block) {
        var blockHash = block.toString();
        _getBlock(blockHash);
      });
    });

    $rootScope.isCollapsed = true;
  });
