angular.module('angular-skynet').directive('thietbisCreateNewThietBi', function() {
    var controller = function($scope) {


        $scope.createNew = function() {
            $scope.createNewThietBi()($scope.newThietBi);
        }

        $scope.removeAll = function() {
        	$scope.removeThietBiAll()();
        }
    };
    return {
        restrict: 'E',
        scope: {
            newThietBi: '=datasource',
            
            options: '=options',

            nhoms: '=nhomsSelectsource',
            chungloais: '=chungloaisSelectsource',
            loais: '=loaisSelectsource',
            quocgias: '=quocgiasSelectsource',
            hangsanxuats: '=hangsanxuatsSelectsource',
            modelthietbis: '=modelthietbisSelectsource',
            loaithongsokythuats: '=loaithongsokythuatsSelectsource',
            diabans: '=diabansSelectsource',
            donvis: '=donvisSelectsource',

            createNewThietBi: '&actionCreateNew',
            removeThietBiAll: '&actionRemoveAll',
            addNumOfLyLichThietBis: '&actionAddNumOfLyLichThietBis',
            decreaseNumOfLyLichThietBis: '&actionDecreaseNumOfLyLichThietBis',
            addNumOfRefImgs: '&actionAddNumOfRefImgs',
            decreaseNumOfRefImgs: '&actionDecreaseNumOfRefImgs',
            addNumOfThongSoKyThuats: '&actionAddNumOfThongSoKyThuats',
            decreaseNumOfThongSoKyThuats: '&actionDecreaseNumOfThongSoKyThuats',
            addNumOfDonViQuanLies: '&actionAddNumOfDonViQuanLies',
            decreaseNumOfDonViQuanLies: '&actionDecreaseNumOfDonViQuanLies',
            addNumOfDonViSoHuus: '&actionAddNumOfDonViSoHuus',
            decreaseNumOfDonViSoHuus: '&actionDecreaseNumOfDonViSoHuus'
        },
        controller: controller,
        templateUrl: 'client/_partials/dir_thietbis_createNewThietBi.html'
    };
});
