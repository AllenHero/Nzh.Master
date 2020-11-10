using Nzh.Master.IRepository;
using Nzh.Master.IRepository.Sys;
using Nzh.Master.Model.Sys;
using Nzh.Master.Repository.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Repository.Sys
{
    public class LogRepository : BaseRepository<Sys_Log>, ILogRepository
    {
    }
}
