using System;
using System.Collections.Generic;
using System.Text;

namespace Nzh.Master.Common.Helper
{
    /// <summary>
    /// 日期辅助类
    /// </summary>
    public static class DateHelper
    {
        /// <summary>
        /// 开始时间
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime BeginDay(this DateTime date)
        {
            return date.Date;
        }

        /// <summary>
        /// 结束时间
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime EndDay(this DateTime date)
        {
            return date.Date.AddDays(1).AddSeconds(-1);
        }

        /// <summary>
        ///  开始时间（可为空）
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime? BeginDay(this DateTime? date)
        {
            if (date == null)
                return null;
            return date.Value.BeginDay();
        }

        /// <summary>
        /// 结束时间（可为空）
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateTime? EndDay(this DateTime? date)
        {
            if (date == null)
                return null;
            return date.Value.EndDay();
        }

        /// <summary>
        /// 这个月
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetThisMonth(this DateTime date)
        {
            var begindate = new DateTime(date.Year, date.Month, 1);
            var enddate = begindate.AddMonths(1).AddDays(-1);
            return new DateRange(begindate.BeginDay(), enddate.EndDay());
        }

        /// <summary>
        /// 上个月
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetLastMonth(this DateTime date)
        {
            var firstDay = new DateTime(date.Year, date.Month, 1).AddMonths(-1);
            var endDay = firstDay.AddMonths(1).AddDays(-1);
            return new DateRange(firstDay.BeginDay(), endDay.EndDay());
        }

        /// <summary>
        /// 这周
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetThisWeek(this DateTime date)
        {
            var diff = (int)date.DayOfWeek;
            diff = diff == 0 ? 6 : diff - 1;
            var monday = date.AddDays(diff * -1);
            var sunday = date.AddDays(6 - diff);
            return new DateRange(monday.BeginDay(), sunday.EndDay());
        }

        /// <summary>
        /// 上周
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetLastWeek(this DateTime date)
        {
            date = date.AddDays(-7);
            var diff = (int)date.DayOfWeek;
            diff = diff == 0 ? 6 : diff - 1;
            var monday = date.AddDays(diff * -1);
            var sunday = date.AddDays(6 - diff);
            return new DateRange(monday.BeginDay(), sunday.EndDay());
        }

        /// <summary>
        /// 下周
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetNextWeek(this DateTime date)
        {
            date = date.AddDays(7);
            var diff = (int)date.DayOfWeek;
            diff = diff == 0 ? 6 : diff - 1;
            var monday = date.AddDays(diff * -1);
            var sunday = date.AddDays(6 - diff);
            return new DateRange(monday.BeginDay(), sunday.EndDay());
        }

        /// <summary>
        /// 这季度
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetThisSeason(this DateTime date)
        {
            var tmp = date.Month % 3;
            if (tmp == 0)
                tmp = 3;
            var firstMonth = date.Month + (tmp * -1 + 1);
            var firstday = new DateTime(date.Year, firstMonth, 1);
            var lastday = firstday.AddMonths(3).AddDays(-1);
            return new DateRange(firstday.BeginDay(), lastday.EndDay());
        }

        /// <summary>
        /// 上季度
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetLastSeason(this DateTime date)
        {
            var tmp = date.Month % 3;
            if (tmp == 0)
                tmp = 3;
            var firstMonth = date.Month + (tmp * -1 + 1);
            var firstday = new DateTime(date.Year, firstMonth, 1).AddMonths(-3);
            var lastday = firstday.AddMonths(3).AddDays(-1);
            return new DateRange(firstday.BeginDay(), lastday.EndDay());
        }

        /// <summary>
        /// 这年
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetThisYear(this DateTime date)
        {
            var begindate = new DateTime(date.Year, 1, 1);
            var enddate = begindate.AddYears(1).AddDays(-1);
            return new DateRange(begindate.BeginDay(), enddate.EndDay());
        }

        /// <summary>
        /// 去年
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static DateRange GetLastYear(this DateTime date)
        {
            var begindate = new DateTime(date.Year, 1, 1).AddYears(-1);
            var enddate = begindate.AddYears(1).AddDays(-1);
            return new DateRange(begindate.BeginDay(), enddate.EndDay());
        }

        /// <summary>
        ///  年范围
        /// </summary>
        /// <param name="dateTime"></param>
        /// <param name="startDateTime"></param>
        /// <returns></returns>
        public static List<YearRange> GetYearRanges(this DateTime dateTime, DateTime? startDateTime)
        {
            List<YearRange> list = new List<YearRange>();
            if (!startDateTime.HasValue)
                startDateTime = DateTime.Now.AddYears(-15);
            if (startDateTime > dateTime)
                throw new NotSupportedException("起始时间不能大于当前时间!");
            int startYear = startDateTime.Value.Year;
            int endYear = dateTime.Year;
            int diffYear = (endYear - startYear) + 1;
            for (int i = 0; i < diffYear; i++)
            {
                list.Add(new YearRange() { Value = endYear, Text = $"{endYear}年" });
                if (endYear == startYear) break;
                endYear--;
            }
            return list;
        }
    }

    /// <summary>
    /// 年范围
    /// </summary>
    public class YearRange
    {
        /// <summary>
        /// 值
        /// </summary>
        public int Value { get; set; }

        /// <summary>
        /// 文本
        /// </summary>
        public string Text { get; set; }
    }

    /// <summary>
    /// 天范围
    /// </summary>
    public class DateRange
    {
        private DateTime? _dateStart;
        private DateTime? _dateEnd;

        /// <summary>
        /// 天范围
        /// </summary>
        public DateRange() : this(null, null) { }

         /// <summary>
         /// 天范围
         /// </summary>
         /// <param name="dateStart"></param>
         /// <param name="dateEnd"></param>
        public DateRange(DateTime? dateStart, DateTime? dateEnd)
        {
            this._dateStart = dateStart;
            this._dateEnd = dateEnd;
        }

        /// <summary>
        /// 开始
        /// </summary>
        public DateTime? Start { get { return _dateStart; } set { _dateStart = value; } }

        /// <summary>
        /// 结束 
        /// </summary>
        public DateTime? End { get { return _dateEnd; } set { _dateEnd = value; } }
    }
}
