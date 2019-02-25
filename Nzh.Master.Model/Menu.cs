using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    ///  菜单
    /// </summary>
    public class Menu : BaseEntity
    {
        /// <summary>
        /// 菜单ID
        /// </summary>
        public Guid MenuID { get; set; }

        /// <summary>
        /// 菜单代码
        /// </summary>
        public string MenuCode { get; set; }

        /// <summary>
        /// 菜单名称
        /// </summary>
        public string MenuName { get; set;}

        /// <summary>
        /// 菜单地址
        /// </summary>
        public string MenuUrl { get; set; }

        /// <summary>
        /// 菜单父级ID
        /// </summary>
        public string MenuParentID { get; set; }

    }
}
