using Nzh.Master.IService.Base;
using Nzh.Master.Model.Sys;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService.Sys
{
    public interface IUserService : IBaseService
    {
        dynamic CheckLogin(string UserName, string Password);

        dynamic GetUserByUserName(string UserName);

        dynamic UpDateUser(Sys_User user);
    }
}
