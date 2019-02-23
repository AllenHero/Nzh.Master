using Nzh.Master.Model.BaseModel;
using Nzh.Master.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Model
{
    /// <summary>
    /// Function
    /// </summary>
    public class Function: BaseEntity
    {
        /// <summary>
        /// FunctionID
        /// </summary>
        public Guid FunctionID { get; set; }

        /// <summary>
        /// FunctionCode
        /// </summary>
        public string FunctionCode { get; set; }

        /// <summary>
        /// FunctionName
        /// </summary>
        public string FunctionName { get; set; }

    }
}
