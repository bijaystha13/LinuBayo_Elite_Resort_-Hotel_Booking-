"use client";

import React, { useState } from "react";
import styles from "./adminReports.module.css";

const AdminReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  // Sample data
  const overviewStats = {
    totalRevenue: 48750,
    totalBookings: 156,
    occupancyRate: 87.5,
    avgDailyRate: 312,
    revenueChange: 12.5,
    bookingsChange: 8.3,
    occupancyChange: 5.2,
    rateChange: 3.8,
  };

  const revenueData = [
    { month: "Jan", revenue: 42000, bookings: 125 },
    { month: "Feb", revenue: 38500, bookings: 118 },
    { month: "Mar", revenue: 45200, bookings: 142 },
    { month: "Apr", revenue: 48750, bookings: 156 },
    { month: "May", revenue: 51200, bookings: 165 },
    { month: "Jun", revenue: 49800, bookings: 158 },
  ];

  const roomTypeData = [
    { type: "Single", bookings: 45, revenue: 5400, percentage: 28.8 },
    { type: "Double", bookings: 68, revenue: 12240, percentage: 43.6 },
    { type: "Suite", bookings: 43, revenue: 15050, percentage: 27.6 },
  ];

  const topPerformers = [
    { name: "Room 305", bookings: 28, revenue: 8400, rating: 4.9 },
    { name: "Room 412", bookings: 26, revenue: 9880, rating: 4.8 },
    { name: "Room 201", bookings: 24, revenue: 4320, rating: 4.7 },
    { name: "Room 508", bookings: 23, revenue: 8050, rating: 4.9 },
    { name: "Room 607", bookings: 22, revenue: 3960, rating: 4.6 },
  ];

  const monthlyComparison = [
    { metric: "Revenue", current: 48750, previous: 43400, change: 12.3 },
    { metric: "Bookings", current: 156, previous: 144, change: 8.3 },
    { metric: "Avg. Stay", current: 3.2, previous: 2.9, change: 10.3 },
    { metric: "Occupancy", current: 87.5, previous: 83.0, change: 5.4 },
  ];

  const guestDemographics = [
    { country: "USA", guests: 45, percentage: 28.8 },
    { country: "Canada", guests: 32, percentage: 20.5 },
    { country: "UK", guests: 28, percentage: 17.9 },
    { country: "Australia", guests: 24, percentage: 15.4 },
    { country: "Mexico", guests: 18, percentage: 11.5 },
    { country: "Others", guests: 9, percentage: 5.8 },
  ];

  const bookingChannels = [
    {
      channel: "Direct Website",
      bookings: 68,
      percentage: 43.6,
      revenue: 21250,
    },
    { channel: "Booking.com", bookings: 45, percentage: 28.8, revenue: 14062 },
    { channel: "Expedia", bookings: 28, percentage: 17.9, revenue: 8750 },
    { channel: "Walk-in", bookings: 15, percentage: 9.6, revenue: 4688 },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getChangeColor = (change) => {
    return change >= 0 ? styles.positive : styles.negative;
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? "↑" : "↓";
  };

  return (
    <div className={styles.adminPage}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.titleSection}>
              <h1 className={styles.pageTitle}>📊 Reports & Analytics</h1>
              <p className={styles.pageSubtitle}>
                Comprehensive business insights and metrics
              </p>
            </div>
            <div className={styles.headerActions}>
              <select
                className={styles.periodSelect}
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button className={styles.exportButton}>
                <span className={styles.exportIcon}>📥</span>
                Export
              </button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statIcon}>💰</span>
                <span className={styles.statLabel}>Total Revenue</span>
              </div>
              <div className={styles.statValue}>
                {formatCurrency(overviewStats.totalRevenue)}
              </div>
              <div
                className={`${styles.statChange} ${getChangeColor(
                  overviewStats.revenueChange
                )}`}
              >
                <span className={styles.changeIcon}>
                  {getChangeIcon(overviewStats.revenueChange)}
                </span>
                {Math.abs(overviewStats.revenueChange)}% from last period
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statIcon}>📅</span>
                <span className={styles.statLabel}>Total Bookings</span>
              </div>
              <div className={styles.statValue}>
                {overviewStats.totalBookings}
              </div>
              <div
                className={`${styles.statChange} ${getChangeColor(
                  overviewStats.bookingsChange
                )}`}
              >
                <span className={styles.changeIcon}>
                  {getChangeIcon(overviewStats.bookingsChange)}
                </span>
                {Math.abs(overviewStats.bookingsChange)}% from last period
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statIcon}>🏨</span>
                <span className={styles.statLabel}>Occupancy Rate</span>
              </div>
              <div className={styles.statValue}>
                {overviewStats.occupancyRate}%
              </div>
              <div
                className={`${styles.statChange} ${getChangeColor(
                  overviewStats.occupancyChange
                )}`}
              >
                <span className={styles.changeIcon}>
                  {getChangeIcon(overviewStats.occupancyChange)}
                </span>
                {Math.abs(overviewStats.occupancyChange)}% from last period
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statIcon}>💵</span>
                <span className={styles.statLabel}>Avg. Daily Rate</span>
              </div>
              <div className={styles.statValue}>
                {formatCurrency(overviewStats.avgDailyRate)}
              </div>
              <div
                className={`${styles.statChange} ${getChangeColor(
                  overviewStats.rateChange
                )}`}
              >
                <span className={styles.changeIcon}>
                  {getChangeIcon(overviewStats.rateChange)}
                </span>
                {Math.abs(overviewStats.rateChange)}% from last period
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className={styles.reportsGrid}>
          {/* Revenue Trend */}
          <div className={styles.reportCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>📈 Revenue Trend</h3>
              <div className={styles.cardBadge}>Last 6 Months</div>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.chart}>
                {revenueData.map((data, index) => (
                  <div key={index} className={styles.chartBar}>
                    <div className={styles.barWrapper}>
                      <div
                        className={styles.bar}
                        style={{ height: `${(data.revenue / 52000) * 100}%` }}
                      >
                        <span className={styles.barValue}>
                          {formatCurrency(data.revenue)}
                        </span>
                      </div>
                    </div>
                    <span className={styles.barLabel}>{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Room Type Distribution */}
          <div className={styles.reportCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>🏨 Room Type Performance</h3>
              <div className={styles.cardBadge}>By Revenue</div>
            </div>
            <div className={styles.cardBody}>
              {roomTypeData.map((room, index) => (
                <div key={index} className={styles.dataRow}>
                  <div className={styles.rowInfo}>
                    <span className={styles.rowLabel}>{room.type}</span>
                    <span className={styles.rowMeta}>
                      {room.bookings} bookings
                    </span>
                  </div>
                  <div className={styles.rowValue}>
                    <span className={styles.valueAmount}>
                      {formatCurrency(room.revenue)}
                    </span>
                    <span className={styles.valuePercentage}>
                      {room.percentage}%
                    </span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${room.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className={styles.reportCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>🌟 Top Performing Rooms</h3>
              <div className={styles.cardBadge}>By Bookings</div>
            </div>
            <div className={styles.cardBody}>
              {topPerformers.map((room, index) => (
                <div key={index} className={styles.performerRow}>
                  <div className={styles.performerRank}>#{index + 1}</div>
                  <div className={styles.performerInfo}>
                    <div className={styles.performerName}>{room.name}</div>
                    <div className={styles.performerStats}>
                      <span>{room.bookings} bookings</span>
                      <span className={styles.dot}>•</span>
                      <span>{formatCurrency(room.revenue)}</span>
                    </div>
                  </div>
                  <div className={styles.performerRating}>
                    <span className={styles.star}>⭐</span>
                    {room.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Comparison */}
          <div className={styles.reportCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>📊 Month-over-Month</h3>
              <div className={styles.cardBadge}>Comparison</div>
            </div>
            <div className={styles.cardBody}>
              {monthlyComparison.map((item, index) => (
                <div key={index} className={styles.comparisonRow}>
                  <div className={styles.comparisonMetric}>{item.metric}</div>
                  <div className={styles.comparisonValues}>
                    <div className={styles.comparisonValue}>
                      <span className={styles.comparisonLabel}>Current</span>
                      <span className={styles.comparisonNumber}>
                        {item.metric === "Revenue"
                          ? formatCurrency(item.current)
                          : item.metric === "Occupancy"
                          ? `${item.current}%`
                          : item.metric === "Avg. Stay"
                          ? `${item.current} days`
                          : item.current}
                      </span>
                    </div>
                    <div className={styles.comparisonArrow}>→</div>
                    <div className={styles.comparisonValue}>
                      <span className={styles.comparisonLabel}>Previous</span>
                      <span className={styles.comparisonNumber}>
                        {item.metric === "Revenue"
                          ? formatCurrency(item.previous)
                          : item.metric === "Occupancy"
                          ? `${item.previous}%`
                          : item.metric === "Avg. Stay"
                          ? `${item.previous} days`
                          : item.previous}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.comparisonChange} ${getChangeColor(
                      item.change
                    )}`}
                  >
                    {getChangeIcon(item.change)} {Math.abs(item.change)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Demographics */}
          <div className={styles.reportCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>🌍 Guest Demographics</h3>
              <div className={styles.cardBadge}>By Country</div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.demographicsChart}>
                {guestDemographics.map((demo, index) => (
                  <div key={index} className={styles.demoBar}>
                    <div className={styles.demoHeader}>
                      <span className={styles.demoCountry}>{demo.country}</span>
                      <span className={styles.demoValue}>{demo.guests}</span>
                    </div>
                    <div className={styles.demoProgress}>
                      <div
                        className={styles.demoFill}
                        style={{ width: `${demo.percentage}%` }}
                      >
                        <span className={styles.demoPercentage}>
                          {demo.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Channels */}
          <div className={styles.reportCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>📱 Booking Channels</h3>
              <div className={styles.cardBadge}>Distribution</div>
            </div>
            <div className={styles.cardBody}>
              {bookingChannels.map((channel, index) => (
                <div key={index} className={styles.channelRow}>
                  <div className={styles.channelInfo}>
                    <div className={styles.channelName}>{channel.channel}</div>
                    <div className={styles.channelMeta}>
                      {channel.bookings} bookings • {channel.percentage}%
                    </div>
                  </div>
                  <div className={styles.channelRevenue}>
                    {formatCurrency(channel.revenue)}
                  </div>
                  <div className={styles.channelProgress}>
                    <div
                      className={styles.channelFill}
                      style={{ width: `${channel.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
