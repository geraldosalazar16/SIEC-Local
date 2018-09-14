var app = angular.module("certificandoApp", ['multipleSelect'])
.config(function ($httpProvider) {     
	$httpProvider.defaults.useXDomain = true;   
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
});


