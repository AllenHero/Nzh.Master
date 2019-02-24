using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface ILogService
    {

        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="logtype"></param>
        /// <param name="logmsg"></param>
        /// <returns></returns>
        ResultModel<bool> WriteLog(LogType logtype, string logmsg);
    }
}
