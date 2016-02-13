### 基本的AngularJS构件
+ AngularJS 应用由一个或多个模块组成。模块是由调用angula.module方法而创建的
```javascript
var todoApp = angular.module("todoApp", []);
```

+ 创建数据模型
```javascript
var model = {
    user: "Adam",
    items: [{action: "Buy Flowers", done: false},
            {action: "Get Shoes", done: false},
            {action: "Collect Tickects", done: true},
            {action: "Call Joe", done: true}]
};
```

+ 创建控制器
```javascript
var todoApp.controller("ToDoCtrl", function($scope) {
    $scope.todo = model;
})；
```
```html
<body ng-controller="ToDoCtrl">
    ...
</body>
```

+ 创建视图
```html
<h1>
    {{todo.user}}'s To Do List
    <span class="label label-default">{{ todo.items.length }} </span>
</h1>
```
```html
<tr ng-repeat="item in todo.items">
    <td>{{item.action}}</td>
    <td>{{item.done}}</td>
</tr>
```

### 基本功能之外

+ 双向模型绑定
```html
<tr ng-repeat="item in todo.items">
    <td>{{item.action}}</td>
    <td><input type="checkbox" ng-model="item.done"></td>
</tr>
```

+ 创建和使用控制器行为
```javascript
$scope.incompleteCount = function() {
    var count = 0;
    angular.forEach($scope.todo.items, function(item) {
        if (!item.done) { count++; }
    });
    return count;
}
```
```html
<h1>{{todo.user}}'s To Do List 
    <span class="label label-default" ng-class="warningLevel()" ng-hide="incompleteCount() == 0">
        {{incompleteCount();}}                    
    </span>
</h1>
```

+ 相应用户交互
```html
<input class="form-control" ng-model="actionText">
<button class="btn btn-default" ng-click="addNewItem(actionText)">Add</button>
```

+ 对数据模型进行过滤和排序
```html
<tr ng-repeat="item in todo.items | filter: {done: false} | orderBy: 'action' "></tr>
```

+ 自定义过滤器
```javascript
todoApp.filter('checkedItems', function() {
    return function(items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function(item) {
            if (item.done == false || showComplete == true) {
                resultArr.push(item);
            } 
        });
        return resultArr;
    } 
});
```

+ 通过Ajax获取数据
```javascript
todoApp.run(function($http) {
    $http.get("todo.json").success(function(data) {
        model.items = data;
    }) 
});
```
