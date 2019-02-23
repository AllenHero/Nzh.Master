using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// Role 
    /// </summary>
    public class Role
    {
        /// <summary>
        /// RoleID
        /// </summary>
        public Guid RoleID { get; set; }

        /// <summary>
        ///RoleName 
        /// </summary>
        public string RoleName { get; set; }

        /// <summary>
        /// RoleRemark
        /// </summary>
        public string RoleRemark { get; set; }

        /// <summary>
        /// CreateTime
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        ///  CreateUserID
        /// </summary>
        public Guid CreateUserID { get; set; }

        /// <summary>
        /// IsDelete
        /// </summary>
        public IsDelete IsDelete { get; set; }
    }
}
