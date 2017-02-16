/**
 * Created by iuliab on 13.01.2017.
 */
angular.module("Cats").controller("ModalInstanceCtrl", function ($uibModalInstance, cat, index, $scope, skills, id, catsService, name) {

    $scope.cat = cat;
    $scope.index = index;
    $scope.skills = skills;
    // $scope.name = name;

    $scope.addSkill = addSkill;
    $scope.putCat = putCat;

    $scope.ok = function () {
        putCat();
        $uibModalInstance.close($scope.cat);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function putCat() {
        console.log("!!!Scope.cat:", $scope.cat);
        catsService
            .updateCat($scope.cat)
            .then(function(data){
                console.log("!!!Scope.cat:", $scope.cat);
            }, function(data){
                if(data.status == 400)
                    console.log("error");
            });
    }

    function addSkill() {
        //console.log("questions", $scope.questions);
        $scope.skills.push({
            name: "",
            experience: ""
        });
    }
});