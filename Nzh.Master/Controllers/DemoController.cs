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

namespace Nzh.Master.Controllers
{
    [Produces("application/json")]
    [Route("api/Demo")]
    public class DemoController : Controller
    {
        IDemoService _demoService;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="demoServices"></param>
        public DemoController(IDemoService demoService)
        {
            _demoService = demoService;
        }

        /// <summary>
        /// 获取Demo列表
        /// </summary>
        /// <param name="page_index"></param>
        /// <param name="page_size"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        [HttpGet("GetDemoList")]
        public async Task<JsonResult> GetDemoList(int page_index, int page_size, string Name)
        {
            var result = _demoService.GetDemoList(page_index, page_size, Name);
            Logger.Info(JsonConvert.SerializeObject(result));//此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 获取Demo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetDemo")]
        public async Task<JsonResult> GetDemo(int id)
        {
            Demo demo = new Demo();
            demo = await _demoService.GetDemo(id);
            Logger.Info(JsonConvert.SerializeObject(demo)); //此处调用日志记录函数记录日志
            return Json(demo);
        }

        /// <summary>
        /// 添加Demo
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        [HttpGet("AddDemo")]
        public async Task<JsonResult> AddDemo(string Name, string Sex, int Age, string Remark)
        {
            bool result = await _demoService.AddDemo(Name, Sex, Age, Remark);
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 修改Demo
        /// </summary>
        /// <param name="id"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        [HttpGet("UpdateDemo")]
        public async Task<JsonResult> UpdateDemo(int id, string Name, string Sex, int Age, string Remark)
        {
            bool result = await _demoService.UpdateDemo(id, Name, Sex, Age, Remark);
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            return Json(result);
        }

        /// <summary>
        /// 删除Demo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("DeleteDemo")]
        public async Task<JsonResult> DeleteDemo(int id)
        {
            bool result = await _demoService.DeleteDemo(id);
            Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
            return Json(result);
        }
    }
}