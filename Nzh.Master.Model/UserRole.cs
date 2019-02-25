using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// 用户角色映射表
    /// </summary>
    public class UserRole : BaseEntity
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public Guid UserRoleID { get; set; }

        /// <summary>
        /// 用户ID
        /// </summary>
        public Guid UserID { get; set; }

        /// <summary>
        /// 角色ID
        /// </summary>
        public Guid RoleID { get; set; }

    }
}
