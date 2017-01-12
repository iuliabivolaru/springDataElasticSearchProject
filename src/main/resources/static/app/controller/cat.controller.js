/**
 * Created by iuliab on 10.01.2017.
 */
(function() {
    angular
        .module("Cats")
        .controller("CatsCtrl", CatsCtrl);

    function CatsCtrl(catsService, $location, $rootScope, $log) {

        var vm = this;

        vm.postCat = postCat;
        vm.addSkill = addSkill;

        activate();

        function activate() {
            vm.noCats = false;
            vm.cat = {};
            vm.cat.skills = [];

            makeTabActive(0);
            addSkill();

            getCats();
        }

        function postCat(addCatForm) {
            if(addCatForm.$invalid)
                return;
            // vm.cat.skills.push();
            catsService
                .createCat(vm.cat)
                .then(function(data){
                    activate();
                    addCatForm.$setPristine();
                }, function(data){
                });
        }

        function addSkill() {
            console.log("Cat skills", vm.cat.skills);
            vm.cat.skills.push({
                name: "",
                experience: ""
            });
        }

        function getCats() {
            catsService
                .getCats()
                .then(function(data) {
                    vm.cats = data;
                    makeTabActive(1);
                }, function () {
                    vm.noCats = true;
                });
        }

        function makeTabActive(index) {
            if (index == 0) {
                vm.tabAddCatActive = true;
                vm.tabShowCatsActive = false;
            } else {
                vm.tabAddCatActive = false;
                vm.tabShowCatsActive = true;
            }
        }
    }
})();