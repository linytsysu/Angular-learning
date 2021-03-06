angular.module("sportsStore")
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function($scope, $filter,
        productListActiveClass, productListPageCount) {
        
        var selectedCategory = null;
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        
        $scope.selectCategory = function(newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        };
        
        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        }
        
        $scope.categoryFilterFn = function(product) {
            return selectedCategory == null || selectedCategory == product.category;
        };
        
        $scope.getCategoryClass = function(category) {
            return category == selectedCategory ? productListActiveClass : "";
        };
        
        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }
    });