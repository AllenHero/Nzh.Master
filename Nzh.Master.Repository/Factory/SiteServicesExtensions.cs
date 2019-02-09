using Microsoft.Extensions.DependencyInjection;
using Nzh.Master.IRepository;
using Nzh.Master.IService;
using Nzh.Master.Service;
using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Repository.Factory
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

            return services;

        }
    }
}
