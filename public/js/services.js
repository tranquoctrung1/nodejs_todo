var app = angular.module("myapp")

app.service("svtodo",["$http",function($http)
{
	return {
		get: function()
		{
			return $http.get("/api/todos")
		},
		post:function(todo)
		{
			return $http.post("/api/createtodo",todo)
		},
		update:function(todo)
		{
			return $http.put("/api/puttodo",todo)
		},
		delete:function(id)
		{
			return $http.delete("/api/deletetodo/"+ id);
		}
	}
}])