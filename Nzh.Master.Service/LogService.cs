using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using Nzh.Master.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;
using Nzh.Master.Model;

namespace Nzh.Master.Service
{
    public class LogService :BaseService, ILogService
    {
        private readonly ILogRepository _logRepository;

        public LogService(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        /// <summary>
        /// 写入日志
        /// </summary>
        /// <param name="logtype"></param>
        /// <param name="logmsg"></param>
        /// <returns></returns>
        public ResultModel<bool> WriteLog(LogType logtype, string logmsg)
        {
            var result = new ResultModel<bool>();
            try
            {
                _logRepository.BeginTran();//开始事务
                Log Log = new Log();
                Log.LogID = Guid.NewGuid();
                Log.UserID = GetSystemCurrentUserID();
                Log.UserName = GetSystemCurrentUserName();
                Log.LogTime = GetSystemCurrentTime();
                Log.LogIP = GetSystemCurrentIP();
                Log.LogType = logtype;
                Log.LogMsg = logmsg;
                result.Data = _logRepository.Insert(Log);
                _logRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _logRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
