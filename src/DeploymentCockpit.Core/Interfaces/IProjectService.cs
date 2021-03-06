﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DeploymentCockpit.ApiDtos;
using DeploymentCockpit.Models;

namespace DeploymentCockpit.Interfaces
{
    public interface IProjectService : ICrudService<Project>
    {
        IEnumerable<VariablesHierarchyInfoDto> GetVariablesHierarchy(short projectID);
    }
}
