using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// 角色 
    /// </summary>
    public class Role : BaseEntity
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        public Guid RoleID { get; set; }

        /// <summary>
        /// 角色编号
        /// </summary>
        public string RoleCode { get; set; }

        /// <summary>
        ///角色名称 
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// 角色备注
        /// </summary>
        public string RoleRemark { get; set; }

    }
}
