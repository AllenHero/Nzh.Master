using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        /// <returns></returns>
        [HttpGet("GetDemoList")]
        public async Task<JsonResult> GetDemoList(int page_index, int page_size)
        {
            int TotalCount = 1;
            List<Demo> DemoList = new List<Demo>();
            DemoList = await _demoService.GetDemoList();
            TotalCount = DemoList.Count() / page_size;
            DemoList = DemoList.OrderBy(d => d.Age).Skip((page_index - 1) * page_size).Take(page_size).ToList();
            return Json(new
            {
                code = 0,
                success = true,
                page = page_index,
                pageCount = TotalCount,
                data = DemoList
            });
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
            return Json(new
            {
                code = 0,
                success = true,
                data = demo
            });
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
            return Json(new
            {
                code = 0,
                success = true,
                data = result
            });
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
            return Json(new
            {
                code = 0,
                success = true,
                data = result
            });
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
            return Json(new
            {
                code = 0,
                success = true,
                data = result
            });
        }
    }
}