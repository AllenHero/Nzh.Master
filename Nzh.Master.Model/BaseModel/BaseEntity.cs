using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model.BaseModel
{
    /// <summary>
    /// BaseEntity
    /// </summary>
    public class BaseEntity
    {
        /// <summary>
        /// CreateTime
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// CreateUserID
        /// </summary>
        public Guid CreateUserID { get; set; }

        /// <summary>
        ///  IsDelete
        /// </summary>
        public IsDelete IsDelete { get; set; }
    }
}
