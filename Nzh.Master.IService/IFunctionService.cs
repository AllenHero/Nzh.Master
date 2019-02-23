using Nzh.Master.IService.Base;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface IFunctionService: IBaseService
    {
        /// <summary>
        ///  获取功能分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="FunctionName"></param>
        /// <returns></returns>
        ResultModel<Function> GetFunctionPageList(int PageIndex, int PageSize, string FunctionName);

        /// <summary>
        /// 添加功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> AddFunction(Function model);

        /// <summary>
        /// 修改功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateFunction(Function model);

        /// <summary>
        /// 删除功能
        /// </summary>
        /// <param name="FunctionID"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteFunction(Guid FunctionID);

    }
}
