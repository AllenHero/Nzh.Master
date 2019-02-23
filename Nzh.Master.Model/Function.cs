using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// Function
    /// </summary>
    public class Function
    {
        /// <summary>
        /// FunctionID
        /// </summary>
        public Guid FunctionID { get; set; }

        /// <summary>
        /// FunctionCode
        /// </summary>
        public string FunctionCode { get; set; }

        /// <summary>
        /// FunctionName
        /// </summary>
        public string FunctionName { get; set; }

        /// <summary>
        /// CreateTime
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// CreateUserID
        /// </summary>
        public Guid CreateUserID { get; set; }

        /// <summary>
        ///  IsDelete
        /// </summary>
        public int IsDelete { get; set; }
    }
}
