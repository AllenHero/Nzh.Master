using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Service
{
    public class EnclosureService : BaseService, IEnclosureService
    {
        private readonly IEnclosureRepository _enclosureRepository;

        public EnclosureService(IEnclosureRepository enclosureRepository)
        {
            _enclosureRepository = enclosureRepository;
        }

        /// <summary>
        /// 测试图片上传
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> TestUpLoadPicture(Enclosure model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _enclosureRepository.BeginTran();//开始事务
                result.Data = _enclosureRepository.Insert(model);
                _enclosureRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _enclosureRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 测试图片下载
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Enclosure TestDownLoadPicture(string Id)
        {
            var demoModel = _enclosureRepository.GetById(Id);
            return demoModel;
        }
    }
}
