<h1 align="center">📡 Serverless Uptime Monitor</h1>

<p align="center">
  <em>A lightweight, zero-cost API and Website monitoring solution built entirely on GitHub Actions.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

### ⚡ Elevator Pitch

This project is a **Site Reliability Engineering (SRE)** and **DevOps** proof-of-concept. It replaces expensive monitoring tools (like Pingdom or Datadog) with a 100% serverless, zero-cost alternative. A Node.js script runs on a continuous **GitHub Actions cron schedule**, pinging target endpoints, calculating response times, and logging the status. The data is instantly visualized on a dark-themed, responsive dashboard hosted continuously on **GitHub Pages**.

### 🏗️ System Architecture

```text
Serverless-Uptime-Monitor/
├── .github/workflows/
│   └── uptime.yml        # Automation engine (Cron job every 20 mins)
├── monitor.js            # Node.js ping & logging script
├── uptime-log.json       # Time-series JSON database (Auto-updated)
└── index.html            # Dark-mode status dashboard
```

🚀 Live Status Dashboard
👉 View Live Uptime Dashboard Here

⚙️ How It Works
Automated Ping: Every 20 minutes, GitHub Actions spins up an Ubuntu environment.

Health Check: monitor.js sends HTTP requests to predefined endpoints, logging HTTP status codes and response latency (in ms).

Data Retention: Results are appended to uptime-log.json, keeping a rolling window of the last 50 checks to ensure optimal repository performance.

Live Visualization: GitHub Pages automatically serves index.html, which fetches the latest JSON log and renders the real-time system health status.