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
    /// 菜单
    /// </summary>
    [Produces("application/json")]
    [Route("api/Menu")]
    public class MenuController : Controller
    {

        IMenuService _menuService;
        ILogService _logService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="menuService"></param>
        ///  <param name="logService"></param>
        public MenuController(IMenuService menuService, ILogService logService)
        {
            _menuService = menuService;
            _logService = logService;
        }

        /// <summary>
        /// 获取菜单分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="MenuName"></param>
        /// <returns></returns>
        [HttpGet("GetMenuPageList")]
        public JsonResult GetMenuPageList(int PageIndex, int PageSize, string MenuName)
        {
            var result = new ResultModel<Menu>();
            try
            {
                result = _menuService.GetMenuPageList(PageIndex, PageSize, MenuName);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Search, "获取菜单分页");
            return Json(result);
        }

        /// <summary>
        /// 添加菜单
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("AddMenu")]
        public JsonResult AddMenu(Menu model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _menuService.AddMenu(model);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Add, "添加菜单");
            return Json(result);
        }

        /// <summary>
        /// 修改菜单
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet("UpdateMenu")]
        public JsonResult UpdateMenu(Menu model)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _menuService.UpdateMenu(model);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Edit, "修改菜单");
            return Json(result);
        }

        /// <summary>
        /// 删除菜单
        /// </summary>
        /// <param name="MenuID"></param>
        /// <returns></returns>
        [HttpGet("DeleteMenu")]
        public JsonResult DeleteMenu(Guid MenuID)
        {
            var result = new ResultModel<bool>();
            try
            {
                result = _menuService.DeleteMenu(MenuID);
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            _logService.WriteLog(LogType.Delete, "删除菜单");
            return Json(result);
        }
    }
}