using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// 功能
    /// </summary>
    public class Function: BaseEntity
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public Guid FunctionID { get; set; }

        /// <summary>
        /// 功能代码
        /// </summary>
        public string FunctionCode { get; set; }

        /// <summary>
        /// 功能名称
        /// </summary>
        public string FunctionName { get; set; }

    }
}
