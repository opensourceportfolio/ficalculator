app.controller('controller/calculator', ['$scope', 'service/calculator', 'service/setting', 'service/user', 'model/period',
    function ($scope, calculatorService, settingsService, userService, Period) {
        'use strict';

        $scope.settings = {};

        $scope.toggleHelp = function (event) {
            var name = event.currentTarget.attributes.getNamedItem("name").value;
            $('.help-context[data-for="' + name + '"]').toggle(event.type === 'focus');
        };

        $scope.calculate = function () {
            if ($scope.ficForm.$valid) {
                calculate();
                settingsService.setSettings(userService.getUserId(), $scope.settings);
            }
        };

        function calculate() {
            var period = new Period($scope.settings, 35);
            calculatorService.calculate(period);
            $scope.periods = calculatorService.periods;
            $scope.$broadcast('fic-recalculate');
        }

        function loadSettings() {
            var userId = userService.getUserId();
            settingsService.getSettings(userId)
                .then(function (settings) {
                    if (settings) {
                        angular.extend($scope.settings, settings);
                    }

                    calculate();
                });
        }

        $scope.$watch(userService.getUserId, loadSettings);
}]);
