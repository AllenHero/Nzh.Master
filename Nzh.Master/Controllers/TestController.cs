using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
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
        IPictureService _pictureService;
        private IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="testService"></param>
        /// <param name="hostingEnvironment"></param> 
        /// <param name="pictureService"></param> 
        public TestController(ITestService testService, IHostingEnvironment hostingEnvironment, IPictureService pictureService)
        {
            _testService = testService;
            _hostingEnvironment = hostingEnvironment;
            _pictureService = pictureService;
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
        /// <returns></returns>
        [HttpGet("TestExcelExport")]
        public JsonResult TestExportExcel()
        {
            var result = new ResultModel<bool>();
            try
            {
                //string sWebRootFolder = _hostingEnvironment.WebRootPath;
                string sWebRootFolder = @"D:\Github\Nzh.Master\Nzh.Master\Doc";
                string sFileName = $@"ExcelExport{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
                var path = Path.Combine(sWebRootFolder, sFileName);
                FileInfo file = new FileInfo(path);
                List<Demo> list = _testService.TestExportExcel();
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
                var info= File(new FileStream(Path.Combine(sWebRootFolder, sFileName), FileMode.Open), "application/octet-stream", $"Excel导出测试{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx");
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
        /// 测试导入
        /// </summary>
        /// <returns></returns>
        [HttpGet("TestImportExcel")]
        public JsonResult TestImportExcel()
        {
            var result = new ResultModel<bool>();
            try
            {
                string filepath=@"D:\测试导入.xlsx";
                FileInfo file = new FileInfo(filepath);
                if (file != null)
                {
                    using (ExcelPackage package = new ExcelPackage(file))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
                        int rowCount = worksheet.Dimension.Rows;
                        int ColCount = worksheet.Dimension.Columns;
                        var demos = new List<Demo>();
                        for (int row = 2; row <= rowCount; row++)
                        {
                            Demo demo = new Demo();
                            demo.ID = Guid.Parse(worksheet.Cells[row, 1].Value.ToString());
                            demo.Name = worksheet.Cells[row, 2].Value.ToString();
                            demo.Sex = worksheet.Cells[row, 3].Value.ToString();
                            demo.Age =int.Parse( worksheet.Cells[row, 4].Value.ToString());
                            demo.Remark = worksheet.Cells[row, 5].Value.ToString();
                            demos.Add(demo);
                        }
                        result= _testService.TestImportExcel(demos);
                    }
                }
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
        /// 测试图片上传
        /// </summary>
        /// <returns></returns>
        [HttpPost("TestUpLoadPicture")]
        public JsonResult TestUpLoadPicture(IFormFile uploadfile)
        {
            var result = new ResultModel<bool>();
            try
            {
                uploadfile = Request.Form.Files[0];
                var now = DateTime.Now;
                //var webRootPath = _hostingEnvironment.WebRootPath;
                var webRootPath = @"D:\Github\Nzh.Master\Nzh.Master\";
                var filePath = string.Format("/UpLoad/Images/{0}/", now.ToString("yyyyMMdd"));
                if (!Directory.Exists(webRootPath + filePath))
                {
                    Directory.CreateDirectory(webRootPath + filePath);
                }
                if (uploadfile != null)
                {
                    //文件后缀
                    var fileExtension = Path.GetExtension(uploadfile.FileName);
                    //判断后缀是否是图片
                    const string fileFilt = ".gif|.jpg|.php|.jsp|.jpeg|.png|......"; //图片
                    //const string fileFilt = ".doc|.xls|.ppt|.txt|.pdf|.html|......";   //附件
                    if (fileExtension == null)
                    {
                        return new JsonResult(new ResultModel<string> { Code = -1, Msg = "上传的文件没有后缀" });
                    }
                    if (fileFilt.IndexOf(fileExtension.ToLower(), StringComparison.Ordinal) <= -1)
                    {
                        return new JsonResult(new ResultModel<string> { Code = -1, Msg = "上传的文件不是图片" });
                    }
                    //判断文件大小    
                    long length = uploadfile.Length;
                    if (length > 1024 * 1024 * 2) //2M
                    {
                        return new JsonResult(new ResultModel<string> { Code = -1, Msg = "上传的文件不能大于2M" });
                    }
                    var strDateTime = DateTime.Now.ToString("yyMMddhhmmssfff"); //取得时间字符串
                    var strRan = Convert.ToString(new Random().Next(100, 999)); //生成三位随机数
                    var saveName = strDateTime + strRan + fileExtension;
                    //插入图片数据
                    var picture = new Picture
                    {
                        ID = Guid.NewGuid(),
                        FilePath = filePath + saveName,
                    };
                    using (FileStream fs = System.IO.File.Create(webRootPath + filePath + saveName))
                    {
                        uploadfile.CopyTo(fs);
                        fs.Flush();
                    }
                    result= _pictureService.TestUpLoadPicture(picture);
                    Logger.Info(JsonConvert.SerializeObject(result)); //此处调用日志记录函数记录日志
                    return new JsonResult(new ResultModel<string> { Code = 0, Msg = "上传成功", });
                }
                return new JsonResult(new ResultModel<string> { Code = -1, Msg = "上传失败" });
            }
            catch (Exception ex)
            {
                result.Code = -1;
                result.Msg = ex.Message;
            }
            return Json(result);
        }

        /// <summary>
        /// 测试图片下载
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpGet("TestDownLoadPicture")]
        public JsonResult TestDownLoadPicture(Guid ID)
        {
            var result = new ResultModel<bool>();
            try
            {
                var webRootPath = @"D:\Github\Nzh.Master\Nzh.Master\";
                Picture picture=new Picture();
                picture = _pictureService.TestDownLoadPicture(ID);
                var addrUrl = Path.Combine(Directory.GetCurrentDirectory(), $@"{webRootPath + picture.FilePath}");
                FileStream fs = new FileStream(addrUrl, FileMode.Open);
                var info = File(fs, "application/vnd.android.package-archive", picture.FilePath);
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