using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    ///  Menu
    /// </summary>
    public class Menu
    {
        /// <summary>
        /// MenuID
        /// </summary>
        public Guid MenuID { get; set; }

        /// <summary>
        /// MenuCode
        /// </summary>
        public string MenuCode { get; set; }

        /// <summary>
        /// MenuName
        /// </summary>
        public string MenuName { get; set;}

        /// <summary>
        /// MenuUrl
        /// </summary>
        public string MenuUrl { get; set; }

        /// <summary>
        /// MenuParentID
        /// </summary>
        public string MenuParentID { get; set; }

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
        public IsDelete IsDelete { get; set; }
    }
}
