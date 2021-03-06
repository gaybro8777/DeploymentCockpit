﻿"use strict";

app.directive("myProjectEnvironments", function () {
    return {
        templateUrl: "app/projectEnvironments/myProjectEnvironments.html",
        scope: {
            projectID: "=projectId"
        },
        controller: function ($scope, $modal, projectEnvironmentsSvc, notificationSvc) {
            var reloadData = function () {
                $scope.projectEnvironments = projectEnvironmentsSvc.getAll({ projectID: $scope.projectID });
            };

            reloadData();

            $scope.isLoading = function () {
                return !$scope.projectEnvironments.$resolved;
            };

            $scope.create = function () {
                $scope.edit({ projectID: $scope.projectID });
            };

            $scope.edit = function (projectEnvironment) {
                $scope.projectEnvironment = projectEnvironment;

                $scope.modalInstance = $modal.open({
                    templateUrl: "app/projectEnvironments/projectEnvironmentEdit.html",
                    scope: $scope,
                    size: 'lg'
                });

                $scope.modalInstance.result.finally(function () {
                    reloadData();
                });
            };

            $scope.save = function (projectEnvironment) {
                projectEnvironmentsSvc.save(projectEnvironment, projectEnvironment.projectEnvironmentID)
                    .$promise.then(
                        function (response) {
                            notificationSvc.saved(projectEnvironment.name);
                            $scope.modalInstance.close();
                        }
                    );
            };

            $scope.delete = function (projectEnvironment) {
                if (!notificationSvc.confirmDelete(projectEnvironment.name)) {
                    return;
                }
                projectEnvironmentsSvc.delete(projectEnvironment.projectEnvironmentID)
                    .$promise.then(
                        function () {
                            notificationSvc.deleted(projectEnvironment.name);
                            reloadData();
                        }
                    );
            };
        }
    };
});
