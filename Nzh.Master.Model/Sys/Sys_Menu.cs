using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.Sys
{
    /// <summary>
    /// 菜单
    /// </summary>
    public class Sys_Menu : BaseEntity
    {
        /// <summary>
        /// 菜单名称
        /// </summary>
        public string MenuName { get; set; }

        /// <summary>
        /// 上级菜单Id
        /// </summary>
        public string ParentId { get; set; }

        /// <summary>
        /// 菜单样式
        /// </summary>
        public string MenuIcon { get; set; }

        /// <summary>
        /// 菜单地址
        /// </summary>
        public string MenuUrl { get; set; }

        /// <summary>
        /// 菜单排序
        /// </summary>
        public int? MenuSort { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public Status? MenuStatus { get; set; }

    }
}
