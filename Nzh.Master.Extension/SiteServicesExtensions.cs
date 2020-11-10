using Microsoft.Extensions.DependencyInjection;
using Nzh.Master.IRepository;
using Nzh.Master.IRepository.Sys;
using Nzh.Master.IService;
using Nzh.Master.IService.Sys;
using Nzh.Master.Repository;
using Nzh.Master.Repository.Sys;
using Nzh.Master.Service;
using Nzh.Master.Service.Sys;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Extension
{
    public static class SiteServicesExtensions
    {
        /// <summary>
        /// 注入服务、仓储类
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));

            services.AddScoped<IDemoRepository, DemoRepository>();
            services.AddScoped<IDemoService, DemoService>();

            services.AddScoped<ITestRepository, TestRepository>();
            services.AddScoped<ITestService, TestService>();

            services.AddScoped<IEnclosureRepository, EnclosureRepository>();
            services.AddScoped<IEnclosureService, EnclosureService>();

            services.AddScoped<ILogRepository, LogRepository>();
            services.AddScoped<ILogService, LogService>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
