using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Service
{
    public class PictureService :  IPictureService
    {
        IPictureRepository _pictureRepository;

        public PictureService(IPictureRepository pictureRepository)
        {
            _pictureRepository = pictureRepository;
        }

        /// <summary>
        /// 测试图片上传
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> TestUpLoadPicture(Picture model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _pictureRepository.BeginTran();//开始事务
                result.Data = _pictureRepository.Insert(model);
                _pictureRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _pictureRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
