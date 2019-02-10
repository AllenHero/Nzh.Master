using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Nzh.Frame.Common.Logger;
using Nzh.Master.IService;

namespace Nzh.Master.Controllers
{
    /// <summary>
    /// Test
    /// </summary>
    [Produces("application/json")]
    [Route("api/Test")]
    public class TestController : Controller
    {
        ITestService _testService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="testService"></param>
        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        /// <summary>
        /// 获取Demo分页
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        [HttpGet("GetDmeoPageList")]
        public JsonResult GetDmeoPageList(int pageIndex, int pageSize, string Name)
        {
            var result = _testService.GetDmeoPageList(pageIndex, pageSize, Name);
            Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 根据ID获取Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpGet("GetDemoById")]
        public JsonResult GetDemoById(string ID)
        {
            var result = _testService.GetDemoById(ID);
            Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        [HttpPost("AddDemo")]
        public JsonResult AddDemo(string Name, string Sex, int Age, string Remark)
        {
            var result = _testService.AddDemo(Name, Sex, Age, Sex);
            if (string.IsNullOrEmpty(Name) && string.IsNullOrEmpty(Sex) && string.IsNullOrEmpty(Age.ToString())&& string.IsNullOrEmpty(Remark))
            {
                return Json("参数为空");
            }
            else
            {
                Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
                return Json(result);
            }
        }

        /// <summary>
        ///  修改Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        [HttpPut("UpdateDemo")]
        public JsonResult UpdateDemo(string ID, string Name, string Sex, int Age, string Remark)
        {
            var result = _testService.UpdateDemo(ID,Name, Sex, Age, Sex);
            if (string.IsNullOrEmpty(ID) && string.IsNullOrEmpty(Name) && string.IsNullOrEmpty(Sex) && string.IsNullOrEmpty(Age.ToString())&& string.IsNullOrEmpty(Remark))
            {
                return Json("参数为空");
            }
            else
            {
                Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
                return Json(result);
            }
        }

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpDelete("DeleteDemo")]
        public JsonResult DeleteDemo(string ID)
        {
            var result = _testService.DeleteDemo(ID);
            if (ID.Length == 0)
            {
                return Json("参数为空");
            }
            else
            {
                Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
                return Json(result);
            }
        }
    }
}