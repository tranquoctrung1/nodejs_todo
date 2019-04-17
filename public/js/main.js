var app = angular.module("myapp",["xeditable"])

app.controller('mycontroller',["$scope","svtodo",($scope,svtodo) =>
{
	$scope.name = "Trần Quốc Trung";
	$scope.inputdata = ""
	$scope.todos = []
	$scope.loading= true

	svtodo.get().then(function(data)
	{
		$scope.todos = data.data
		$scope.loading = false
	})

	$scope.createtodo =() =>
	{
		var obj = {
			text: $scope.inputdata,
			isDone: false
		}
		svtodo.post(obj).then(function(data)
		{
			$scope.todos = data.data
			$scope.inputdata =""
			$scope.loading =false
		})
	}

	$scope.updateTodo= (todo) =>
	{
		console.log(todo);
		$scope.loading =  true
		todo.isDone = !todo.isDone

		svtodo.update(todo).then(function (data) { 
			$scope.todos = data.data
			$scope.loading = false
		})
	}
	$scope.deleteTodo = (todo) =>
	{
		console.log(todo);
		$scope.loading = true;

		svtodo.delete(todo._id).then(function (data) { 

			$scope.todos = data.data
			$scope.loading = false
		 })
	}
}])
