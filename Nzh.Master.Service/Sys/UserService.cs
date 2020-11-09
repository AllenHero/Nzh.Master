using Nzh.Master.IRepository.Sys;
using Nzh.Master.IService.Sys;
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
    }
}
