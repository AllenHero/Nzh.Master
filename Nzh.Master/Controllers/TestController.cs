using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Nzh.Frame.Common.Logger;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using OfficeOpenXml;

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
        private IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="testService"></param>
        public TestController(ITestService testService, IHostingEnvironment hostingEnvironment)
        {
            _testService = testService;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// 获取Demo分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="Name"></param>
        /// <returns></returns>
        [HttpGet("GetDmeoPageList")]
        public JsonResult GetDmeoPageList(int PageIndex, int PageSize, string Name)
        {
            var result = new ResultModel<Demo>();
            try
            {
                result = _testService.GetDmeoPageList(PageIndex, PageSize, Name);
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
        /// 获取Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpGet("GetDemoById")]
        public JsonResult GetDemoById(Guid ID)
        {
            var result = new ResultModel<Demo>();
            try
            {
                 result.Data = _testService.GetDemoById(ID);
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
            var result = new ResultModel<bool>();
            try
            {
                 result = _testService.AddDemo(Name, Sex, Age, Sex);
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
        ///  修改Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="Name"></param>
        /// <param name="Sex"></param>
        /// <param name="Age"></param>
        /// <param name="Remark"></param>
        /// <returns></returns>
        [HttpPut("UpdateDemo")]
        public JsonResult UpdateDemo(Guid ID, string Name, string Sex, int Age, string Remark)
        {
            var result = new ResultModel<bool>();
            try
            {
                 result = _testService.UpdateDemo(ID, Name, Sex, Age, Sex);
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
        /// 删除Demo
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpDelete("DeleteDemo")]
        public JsonResult DeleteDemo(Guid ID)
        {
            var result = new ResultModel<bool>();
            try
            {
                 result = _testService.DeleteDemo(ID);
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
        /// 测试导出
        /// </summary>
        /// <param name="Name"></param>
        /// <returns></returns>
        [HttpGet("TestExcelExport")]
        public IActionResult TestExportExcel(string Name)
        {
            //string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sWebRootFolder = @"D:\Github\Nzh.Master\Nzh.Master\Doc";
            string sFileName = $@"ExcelExport{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            var path = Path.Combine(sWebRootFolder, sFileName);
            FileInfo file = new FileInfo(path);
            List<Demo> list = _testService.TestExportExcel(Name);
            if (file.Exists)
            {
                file.Delete();
                file = new FileInfo(path);
            }
            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("测试Test");
                worksheet.Cells.LoadFromCollection(list, true);
                package.Save();
            }
            return File(new FileStream(Path.Combine(sWebRootFolder, sFileName), FileMode.Open), "application/octet-stream", $"Excel导出测试{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx");
        }
    }
}