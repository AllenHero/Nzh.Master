using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// RoleMenuFunction
    /// </summary>
    public class RoleMenuFunction : BaseEntity
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

    }
}
