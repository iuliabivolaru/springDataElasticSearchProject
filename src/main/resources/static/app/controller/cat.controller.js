/**
 * Created by iuliab on 10.01.2017.
 */
(function() {
    angular
        .module("Cats")
        .controller("CatsCtrl", CatsCtrl);

    function CatsCtrl(catsService, $location, $rootScope, $log, $uibModal, $scope) {

        var vm = this;

        vm.postCat = postCat;
        vm.addSkill = addSkill;

        activate();

        function activate() {
            vm.noCats = false;
            vm.cat = {};
            vm.cat.skills = [];
            vm.cats = [];

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
                    createNotification("Cat successfully submitted!", "success");
                }, function(data){
                    if(data.status == 400)
                        createNotification("Something wrong happened when trying to submit the cat", "danger");
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
                    for(var i = 0; i < vm.cats.length; ++i){
                        vm.cats[i].index = i;
                    }
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

        function deleteCat(cat) {

        }

        function createNotification(message, type) {
            $.notify(message,{
                placement: {
                    from: "bottom",
                    align: "right"
                },
                type: type,
                delay: 1500,
                animate: {
                    enter: 'animated fadeInUp',
                    exit: 'animated fadeOutDown'
                },
                template: '<div data-notify="container" class="col-xs-11 col-sm-2 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
            });
        }

        $scope.animationsEnabled = true;
        $scope.open = function (size, selectedIndex) {

            console.log("Selected index ", selectedIndex);
            vm.selectedIndex = selectedIndex;

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    cat: function () {
                        return vm.cats[selectedIndex];
                    },
                    name: function () {
                        return vm.cats[selectedIndex].name;
                    },
                    index: function () {
                        return selectedIndex;
                    },
                    skills: function() {
                        return vm.cats[selectedIndex].skills;
                    },
                    id: function() {
                        return vm.cats[selectedIndex].id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };
    }
})();