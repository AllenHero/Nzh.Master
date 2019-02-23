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
    /// 角色
    /// </summary>
    [Produces("application/json")]
    [Route("api/Role")]
    public class RoleController : Controller
    {
        IRoleService _roleService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="roleService"></param>
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        /// <summary>
        /// 获取角色分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="RoleName"></param>
        /// <returns></returns>
        [HttpGet("GetRolePageList")]
        public JsonResult GetRolePageList(int PageIndex, int PageSize, string RoleName)
        {
            var result = new ResultModel<Role>();
            try
            {
                result = _roleService.GetUserPageList(PageIndex, PageSize, RoleName);
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
        /// 添加角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("AddRole")]
        public JsonResult AddRole(Role model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _roleService.AddRole(model);
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
        /// 修改角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("UpdateRole")]
        public JsonResult UpdateRole(Role model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _roleService.UpdateRole(model);
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
        /// 删除角色
        /// </summary>
        /// <param name="RoleID"></param>
        /// <returns></returns>
        [HttpGet("DeleteUser")]
        public JsonResult DeleteRole(Guid RoleID)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _roleService.DeleteRole(RoleID);
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