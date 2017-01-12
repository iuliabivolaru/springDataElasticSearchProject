/**
 * Created by iuliab on 10.01.2017.
 */
(function() {
    angular
        .module("Cats", ["ngRoute", "ui.bootstrap"])

        .config(function($routeProvider){
            $routeProvider
                .when("/veterinary", {
                    templateUrl: "app/template/cats.html",
                    controller: "CatsCtrl",
                    controllerAs: "vm"
                })
                // .when("/quizzes/try/:quizId", {
                //     templateUrl: "app/template/quiz_try.html",
                //     controller: "ListQuizTry",
                //     controllerAs: "vm",
                //     reloadOnSearch: false
                // })
                .otherwise({redirectTo:"/veterinary"});
        });
})();