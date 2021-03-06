﻿"use strict";

app.directive("myDeploymentPlans", function () {
    return {
        templateUrl: "app/deploymentPlans/myDeploymentPlans.html",
        scope: {
            projectID: "=projectId"
        },
        controller: function ($scope, deploymentPlansSvc, notificationSvc) {
            var reloadData = function () {
                $scope.deploymentPlans = deploymentPlansSvc.getAll({ projectID: $scope.projectID });
            };

            reloadData();

            $scope.isLoading = function () {
                return !$scope.deploymentPlans.$resolved;
            };

            $scope.delete = function (deploymentPlan) {
                if (!notificationSvc.confirmDelete(deploymentPlan.name)) {
                    return;
                }
                deploymentPlansSvc.delete(deploymentPlan.deploymentPlanID)
                    .$promise.then(
                        function () {
                            notificationSvc.deleted(deploymentPlan.name);
                            reloadData();
                        }
                    );
            };
        }
    };
});
