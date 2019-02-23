using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    ///  Menu
    /// </summary>
    public class Menu : BaseEntity
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

    }
}
