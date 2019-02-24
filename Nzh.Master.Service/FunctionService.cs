using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using Nzh.Master.Service.Base;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Nzh.Master.Service
{
    public class FunctionService : BaseService, IFunctionService
    {
        IFunctionRepository _functionRepository;

        public FunctionService(IFunctionRepository functionRepository)
        {
            _functionRepository = functionRepository;
        }

        /// <summary>
        ///  获取功能分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="FunctionName"></param>
        /// <returns></returns>
        public ResultModel<Function> GetFunctionPageList(int PageIndex, int PageSize, string FunctionName)
        {
            PageModel pm = new PageModel() { PageIndex = PageIndex, PageSize = PageSize };
            Expression<Func<Function, bool>> expression = ex => ex.FunctionName == FunctionName;
            dynamic data = _functionRepository.GetPageList(expression, pm);
            ResultModel<Function> rm = new ResultModel<Function>();
            rm.Count = pm.PageCount;
            rm.Data = data;
            return rm;
        }

        /// <summary>
        /// 添加功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> AddFunction(Function model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _functionRepository.BeginTran();//开始事务
                Function Function = new Function();
                Function.FunctionID = Guid.NewGuid();
                Function.FunctionCode = model.FunctionCode;
                Function.FunctionName = model.FunctionName; 
                Function.CreateTime = GetSystemCurrentTime();
                Function.CreateUserID = GetSystemCurrentUserID();
                Function.IsDelete = IsDelete.No;
                result.Data = _functionRepository.Insert(Function);
                _functionRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _functionRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 修改功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateFunction(Function model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _functionRepository.BeginTran();//开始事务
                var Function = _functionRepository.GetById(model.FunctionID);
                if (Function != null)
                {
                    Function.FunctionCode = model.FunctionCode;
                    Function.FunctionName = model.FunctionName;
                    result.Data = _functionRepository.Update(Function);
                    _functionRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _functionRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 删除功能
        /// </summary>
        /// <param name="FunctionID"></param>
        /// <returns></returns>
        public ResultModel<bool> DeleteFunction(Guid FunctionID)
        {
            var result = new ResultModel<bool>();
            try
            {
                _functionRepository.BeginTran();//开始事务
                var Function = _functionRepository.GetById(FunctionID);
                if (Function != null)
                {
                    Function.IsDelete = IsDelete.Yes; //标识符删除
                    result.Data = _functionRepository.Update(Function);
                    _functionRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _functionRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
