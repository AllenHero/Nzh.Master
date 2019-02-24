using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Nzh.Frame.Common.Logger;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;

namespace Nzh.Master.Controllers
{
    /// <summary>
    /// 功能
    /// </summary>
    [Produces("application/json")]
    [Route("api/Function")]
    public class FunctionController : Controller
    {
        IFunctionService _functionService;
        ILogService _logService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="functionService"></param>
        ///<param name="logService"></param> 
        public FunctionController(IFunctionService functionService, ILogService logService)
        {
            _functionService = functionService;
            _logService = logService;
        }

         /// <summary>
         /// 获取功能分页
         /// </summary>
         /// <param name="PageIndex"></param>
         /// <param name="PageSize"></param>
         /// <param name="FunctionName"></param>
         /// <returns></returns>
        [HttpGet("GetFunctionPageList")]
        public JsonResult GetFunctionPageList(int PageIndex, int PageSize, string FunctionName)
        {
            var result = new ResultModel<Function>();
            try
            {
                result = _functionService.GetFunctionPageList(PageIndex, PageSize, FunctionName);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Search, "获取功能分页");
            return Json(result);
        }

        /// <summary>
        /// 添加功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("AddFunction")]
        public JsonResult AddFunction(Function model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _functionService.AddFunction(model);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Add, "添加功能");
            return Json(result);
        }

        /// <summary>
        /// 修改功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("UpdateFunction")]
        public JsonResult UpdateFunction(Function model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _functionService.UpdateFunction(model);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Edit, "修改功能");
            return Json(result);
        }

        /// <summary>
        /// 删除功能
        /// </summary>
        /// <param name="FunctionID"></param>
        /// <returns></returns>
        [HttpGet("DeleteFunction")]
        public JsonResult DeleteFunction(Guid FunctionID)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _functionService.DeleteFunction(FunctionID);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Delete, "删除功能");
            return Json(result);
        }
    }
}