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

namespace Nzh.Master.Controllers
{
    /// <summary>
    /// 用户
    /// </summary>
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        IUserService _userService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="userService"></param>
        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        /// <summary>
        /// 获取用户分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="UserName"></param>
        /// <returns></returns>
        [HttpGet("GetUserPageList")]
        public JsonResult GetUserPageList(int PageIndex, int PageSize, string UserName)
        {
            var result = new ResultModel<User>();
            try
            {
                result = _userService.GetUserPageList(PageIndex, PageSize, UserName);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("AddUser")]
        public JsonResult AddUser(User model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _userService.AddUser(model);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            return Json(result);
        }


        /// <summary>
        /// 修改用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("UpdateUser")]
        public JsonResult UpdateUser(User model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _userService.UpdateUser(model);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        [HttpGet("DeleteUser")]
        public JsonResult DeleteUser(Guid UserID)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _userService.DeleteUser(UserID);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            return Json(result);
        }
    }
}