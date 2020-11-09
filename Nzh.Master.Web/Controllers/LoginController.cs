using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nzh.Master.Common.Helper;
using Nzh.Master.Model.Base;
using Nzh.Master.Web.Models;

namespace Nzh.Master.Web.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public LoginController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public dynamic Login(dynamic data) 
        {
            //var result = new ResultModel<bool>();
            //if (string.IsNullOrEmpty(data.UserName))
            //{
            //    result.Msg = "用户名不能为空。";
            //    result.Code = -1;
            //    result.Data = false;
            //    return Json(result);
            //}
            //if (string.IsNullOrEmpty(data.UserName))
            //{
            //    result.Msg = "密码不能为空。";
            //    result.Code = -1;
            //    result.Data = false;
            //    return Json(result);
            //}
            //TData<UserEntity> userObj = await userBLL.CheckLogin(userName, password, (int)PlatformEnum.Web);
            //if (userObj.Tag == 1)
            //{
            //    await new UserBLL().UpdateUser(userObj.Data);
            //    await Operator.Instance.AddCurrent(userObj.Data.WebToken);
            //}

            //string ip = NetHelper.Ip;
            //string browser = NetHelper.Browser;
            //string os = NetHelper.GetOSVersion();
            //string userAgent = NetHelper.UserAgent;

            //Action taskAction = async () =>
            //{
            //    LogLoginEntity logLoginEntity = new LogLoginEntity
            //    {
            //        LogStatus = userObj.Tag == 1 ? OperateStatusEnum.Success.ParseToInt() : OperateStatusEnum.Fail.ParseToInt(),
            //        Remark = userObj.Message,
            //        IpAddress = ip,
            //        IpLocation = IpLocationHelper.GetIpLocation(ip),
            //        Browser = browser,
            //        OS = os,
            //        ExtraRemark = userAgent,
            //        BaseCreatorId = userObj.Data?.Id
            //    };

            //    // 让底层不用获取HttpContext
            //    logLoginEntity.BaseCreatorId = logLoginEntity.BaseCreatorId ?? 0;

            //    await logLoginBLL.SaveForm(logLoginEntity);
            //};
            //AsyncTaskHelper.StartTask(taskAction);

            //obj.Tag = userObj.Tag;
            //obj.Message = userObj.Message;
            //return Json(obj);
            return data;
        }
    }
}
