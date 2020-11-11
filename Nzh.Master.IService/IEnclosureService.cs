using Nzh.Master.IRepository.Base;
using Nzh.Master.IService.Base;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface IEnclosureService : IBaseService
    {
        /// <summary>
        /// 测试图片上传
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> TestUpLoadPicture(Enclosure model);

        /// <summary>
        /// 测试图片下载
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        Enclosure TestDownLoadPicture(string Id);
    }
}
