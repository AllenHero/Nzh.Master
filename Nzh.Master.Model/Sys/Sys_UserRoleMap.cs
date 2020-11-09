using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.Sys
{
    /// <summary>
    /// 用户角色映射
    /// </summary>
    public class Sys_UserRoleMap
    {
        /// <summary>
        /// 用户Id
        /// </summary>
        public long UserId { get; set; }

        /// <summary>
        /// 角色Id
        /// </summary>
        public long RoleId { get; set; }
    }
}
