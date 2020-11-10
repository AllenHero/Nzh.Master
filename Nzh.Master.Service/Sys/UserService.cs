using Nzh.Master.Common.Helper;
using Nzh.Master.IRepository.Sys;
using Nzh.Master.IService.Sys;
using Nzh.Master.Model.Base;
using Nzh.Master.Model.Enum;
using Nzh.Master.Model.Sys;
using Nzh.Master.Service.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Service.Sys
{
    public class UserService : BaseService, IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public dynamic CheckLogin(string UserName,string Password) 
        {
            var result = new ResultModel<Sys_User>();
            Sys_User user = GetUserByUserName(UserName);
            if (user!=null)
            {
                if (user.UserStatus == (int)Status.Enable)
                {
                    if (user.Password == EncryptionHelper.DesEncrypt(Password))
                    {
                        user.LoginCount++;
                        if (user.FirstVisit==null)
                        {
                            user.FirstVisit = DateTime.Now;
                        }
                        user.LastVisit = DateTime.Now;
                        result.Code = 1;
                        result.Msg = "登录成功。";
                        result.Data = user;
                    }
                    else
                    {
                        result.Code = -1;
                        result.Msg = "密码不正确，请重新输入。";
                        result.Data = null;
                    }
                }
                else
                {
                    result.Code = -1;
                    result.Msg = "账号被禁用，请联系管理员。";
                    result.Data = null;
                }
            }
            else
            {
                result.Code = -1;
                result.Msg = "账号不存在，请重新输入。";
                result.Data = null;
            }
            return result;
        }


        public dynamic GetUserByUserName(string UserName)
        {
            string sql = "SELECT * from  Sys_User where UserName=@UserName";
            Sys_User userModel = _userRepository.Get(sql, new { UserName = UserName });
            return userModel;
        }

        public dynamic UpDateUser(Sys_User user) 
        {
            var result = new ResultModel<bool>();
            Sys_User useModel = new Sys_User();
            try
            {
                _userRepository.BeginTran();//开始事务
                if (user != null)
                {
                    useModel.LoginCount = user.LoginCount;
                    useModel.FirstVisit = user.FirstVisit;
                    useModel.LastVisit = user.LastVisit;
                    result.Data = _userRepository.Update(useModel);
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
