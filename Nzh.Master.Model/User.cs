using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// User
    /// </summary>
    public class User : BaseEntity
    {
        /// <summary>
        /// UserID
        /// </summary>
        public Guid UserID { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// UserPwd
        /// </summary>
        public string UserPwd { get; set; }

        /// <summary>
        /// UserEmail
        /// </summary>
        public string UserEmail { get; set; }

        /// <summary>
        /// UserPhone 
        /// </summary>
        public string UserPhone { get; set; }

        /// <summary>
        /// LastLoginTime
        /// </summary>
        public DateTime LastLoginTime { get; set; }

        /// <summary>
        /// LoginCount
        /// </summary>
        public int LoginCount { get; set; }

    }
}
