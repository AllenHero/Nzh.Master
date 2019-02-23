using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// RoleMenuFunction
    /// </summary>
    public class RoleMenuFunction
    {
        /// <summary>
        /// MenuFunctionID
        /// </summary>
        public Guid MenuFunctionID { get; set; }

        /// <summary>
        /// FunctionID
        /// </summary>
        public Guid FunctionID { get; set; }

        /// <summary>
        /// MenuID
        /// </summary>
        public Guid MenuID { get; set; }

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
        public IsDelete IsDelete { get; set; }
    }
}
