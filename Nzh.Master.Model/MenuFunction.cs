using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// 菜单功能映射表
    /// </summary>
    public class MenuFunction : BaseEntity
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public Guid MenuFunctionID { get; set; }

        /// <summary>
        /// 功能ID
        /// </summary>
        public Guid FunctionID { get; set; }

        /// <summary>
        /// 菜单ID
        /// </summary>
        public Guid MenuID { get; set; }

    }
}
