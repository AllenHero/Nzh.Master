using Nzh.Master.Common.Helper;
using Nzh.Master.IRepository.Sys;
using Nzh.Master.IService;
using Nzh.Master.IService.Sys;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Sys;
using Nzh.Master.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Service.Sys
{
    public class LogService : BaseService, ILogService
    {
        private readonly ILogRepository _logRepository;

        public LogService(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        public ResultModel<bool> WriteLog(Sys_Log log)
        {
            var result = new ResultModel<bool>();
            try
            {
                _logRepository.BeginTran();//开始事务
                Sys_Log logModel = new Sys_Log();
                logModel.Id = IdWorkerHelper.NewId();
                logModel.CreateUserId = log.CreateUserId;
                logModel.IpAddress = log.IpAddress;
                logModel.CreateTime = DateTime.Now;
                logModel.LogStatus = log.LogStatus;
                logModel.LogType = log.LogType;
                logModel.Remark = log.Remark;
                result.Data = _logRepository.Insert(logModel);
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
