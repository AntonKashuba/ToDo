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

.controller("firstCtrl", function($scope,$ionicModal){

  if(! angular.isUndefined(window.localStorage['tasks'])){
    $scope.tasks = JSON.parse(window.localStorage['tasks']);
    $scope.default = 1;
  }else{
    $scope.tasks = [
      {title: "first", done: true},
      {title: "second", done: false},
      {title: "third", done: false},
      {title: "fourth", done: false}
    ];
    $scope.default = 0;
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
      done:false
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
        done: false
      });
    } else{
      var id = $scope.currentTaskid;
      $scope.tasks[id].title = task.title;
      $scope.tasks[id].done = task.done;
    }
    $scope.taskModal.hide();
    saveItems();
  }

  function saveItems(){
    window.localStorage['tasks'] = angular.toJson($scope.tasks);
  }


});