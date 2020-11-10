using Nzh.Master.IService.Base;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Sys;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService.Sys
{
    public interface ILogService : IBaseService
    {
        ResultModel<bool> WriteLog(Sys_Log log);
    }
}
