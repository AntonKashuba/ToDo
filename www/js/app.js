angular.module('ToDo', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("firstCtrl", function($scope,$ionicModal,$timeout){

  if(! angular.isUndefined(window.localStorage['tasks'])){
    $scope.tasks = JSON.parse(window.localStorage['tasks']);
    //$scope.default = 1;
  }else{
    $scope.tasks = [
      {title: "first", description: "first", done: true},
      {title: "second", description: "second", done: false},
      {title: "third", description: "third", done: false},
      {title: "fourth", description: "fourth", done: false}
    ];
    //$scope.default = 0;
  }

  $ionicModal.fromTemplateUrl('views/task.html',function(modal){

    $scope.taskModal = modal;
  },{
      scope: $scope,
      animation: 'slide-in-right'
  });

  $scope.currentTaskid = -1;
  
  $scope.addNewTask = function(){
    $scope.taskModal.show();
    $scope.activeTask = {
      title:"",
      description:"",
      done: task.done
    }
    $scope.currentTaskid = -1;
  }

  $scope.openTask = function(){
    $scope.taskModal.show();
  }

  $scope.closeTask = function(){
    $scope.taskModal.hide();
  }

  $scope.openTask = function(id){
    var task = $scope.tasks[id];
    $scope.currentTaskid = id;
    $scope.activeTask = {
      title: task.title,
      description: task.description,
      done: task.done
    }
    $scope.taskModal.show();
  }

  $scope.deleteTask = function(id){
    $scope.tasks.splice(id,1);
    saveItems();
  }

  $scope.submitTask = function(task){
    if($scope.currentTaskid == -1){
      $scope.tasks.push({
        title: task.title,
        description: task.description,
        done: task.done
      });
    } else{
      var id = $scope.currentTaskid;
      $scope.tasks[id].title = task.title;
      $scope.tasks[id].description = task.description;
      $scope.tasks[id].done = task.done;
    }

    saveItems();
  
    $scope.taskModal.hide();
  }

  $scope.saveTasks = function(){
    $timeout(function(){
      saveItems();  
    });
  }

  function saveItems(){
    window.localStorage['tasks'] = angular.toJson($scope.tasks);
  }


});