using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// 日志
    /// </summary>
    public class Log
    {
        /// <summary>
        /// 主键Id
        /// </summary>
        public long LogId { get; set; }

        /// <summary>
        /// 用户Id
        /// </summary>
        public long UserId { get; set; }

        /// <summary>
        /// 用户名称
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        ///日志时间
        /// </summary>
        public DateTime LogTime { get; set; }

        /// <summary>
        /// 日志IP
        /// </summary>
        public string LogIP { get; set; }

        /// <summary>
        ///日志类型 
        /// </summary>
        public LogType LogType { get; set; }

        /// <summary>
        /// 日志说明
        /// </summary>
        public string LogMsg { get; set; }
    }                           
}
