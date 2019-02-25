using Nzh.Master.Common.Helper;
using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using Nzh.Master.Service.Base;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Nzh.Master.Service
{
    public class UserService : BaseService, IUserService
    {

        IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        ///  获取用户分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="UserName"></param>
        /// <returns></returns>
        public ResultModel<User> GetUserPageList(int PageIndex, int PageSize, string UserName)
        {
            PageModel pm = new PageModel() { PageIndex = PageIndex, PageSize = PageSize };
            Expression<Func<User, bool>> expression = ex => ex.UserName == UserName;
            dynamic data = _userRepository.GetPageList(expression, pm);
            ResultModel<User> rm = new ResultModel<User>();
            rm.Count = pm.PageCount;
            rm.Data = data;
            return rm;
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> AddUser(User model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _userRepository.BeginTran();//开始事务
                User User = new User();
                User.UserID = Guid.NewGuid();
                User.UserCode = model.UserCode;
                User.UserName = model.UserName;
                User.UserPwd = EncryptionHelper.DesEncrypt(model.UserPwd); //DES加密操作
                User.UserEmail = model.UserEmail;
                User.UserPhone = model.UserPhone;
                User.CreateTime = GetSystemCurrentTime();
                User.CreateUserID = GetSystemCurrentUserID();
                User.IsDelete = IsDelete.No;
                result.Data = _userRepository.Insert(User);
                _userRepository.CommitTran();//提交事务
                return result;
            }
            catch (Exception ex)
            {
                _userRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 修改用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ResultModel<bool> UpdateUser(User model)
        {
            var result = new ResultModel<bool>();
            try
            {
                _userRepository.BeginTran();//开始事务
                var User = _userRepository.GetById(model.UserID);
                if (User!=null)
                {
                    User.UserCode = model.UserCode;
                    User.UserName = model.UserName;
                    User.UserPwd = EncryptionHelper.DesEncrypt(model.UserPwd); //DES加密操作
                    User.UserEmail = model.UserEmail;
                    User.UserPhone = model.UserPhone;
                    result.Data = _userRepository.Update(User);
                    _userRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _userRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public ResultModel<bool> DeleteUser(Guid UserID)
        {
            var result = new ResultModel<bool>();
            try
            {
                _userRepository.BeginTran();//开始事务
                var User = _userRepository.GetById(UserID);
                if (User != null)
                {
                    User.IsDelete = IsDelete.Yes; //标识符删除
                    result.Data = _userRepository.Update(User);
                    _userRepository.CommitTran();//提交事务
                }
                return result;
            }
            catch (Exception ex)
            {
                _userRepository.RollbackTran();//回滚事务
                throw ex;
            }
        }
    }
}
