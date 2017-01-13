/**
 * Created by iuliab on 10.01.2017.
 */

(function() {
    angular
        .module("Cats")
        .factory("catsService", catsService);

    function catsService($http) {
        var service = {
            createCat: createCat,
            getCats: getCats,
            updateCat: updateCat
        };

        return service;

        function createCat(cat) {
            //console.log("Cat before post", cat);
            return $http.post("/veterinary", cat)
                .then(function (response) {
                    console.log(cat);
                    return response.data;
                });
        }

        function getCats() {
            return $http.get("/veterinary")
                .then(function (response) {
                    return response.data;
                });
        }

        function updateCat(cat) {
            return $http.put("/veterinary", cat)
                .then(function (response) {
                    //console.log(quiz);
                    return response.data;
                });
        }
    }
})();