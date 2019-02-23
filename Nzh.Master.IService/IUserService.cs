using Nzh.Master.IRepository.Base;
using Nzh.Master.IService.Base;
using Nzh.Master.Model;
using Nzh.Master.Model.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.IService
{
    public interface IUserService: IBaseService
    {
        /// <summary>
        ///  获取用户分页
        /// </summary>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="UserName"></param>
        /// <returns></returns>
        ResultModel<User> GetUserPageList(int PageIndex, int PageSize, string UserName);

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> AddUser(User model);

        /// <summary>
        /// 修改用户
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResultModel<bool> UpdateUser(User model);

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        ResultModel<bool> DeleteUser(Guid UserID);
    }
}
