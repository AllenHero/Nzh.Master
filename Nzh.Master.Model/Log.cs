using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// Log
    /// </summary>
    public class Log
    {
        /// <summary>
        /// LogID
        /// </summary>
        public Guid LogID { get; set; }

        /// <summary>
        /// UserID
        /// </summary>
        public Guid UserID { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        ///LogTime 
        /// </summary>
        public DateTime LogTime { get; set; }

        /// <summary>
        /// LogIP
        /// </summary>
        public string LogIP { get; set; }

        /// <summary>
        ///LogType 
        /// </summary>
        public string LogType { get; set; }

        /// <summary>
        /// LogMsg
        /// </summary>
        public string LogMsg { get; set; }
    }                           
}
