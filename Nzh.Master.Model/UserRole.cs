using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// UserRole
    /// </summary>
    public class UserRole
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

        /// <summary>
        /// CreateTime
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// CreateUserID
        /// </summary>
        public Guid CreateUserID { get; set; }

        /// <summary>
        /// IsDelete
        /// </summary>
        public int IsDelete { get; set; }
    }
}
