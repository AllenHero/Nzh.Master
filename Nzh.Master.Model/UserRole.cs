using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// UserRole
    /// </summary>
    public class UserRole : BaseEntity
    {
        /// <summary>
        /// UserRoleID
        /// </summary>
        public Guid UserRoleID { get; set; }

        /// <summary>
        /// UserID
        /// </summary>
        public Guid UserID { get; set; }

        /// <summary>
        /// RoleID
        /// </summary>
        public Guid RoleID { get; set; }

    }
}
