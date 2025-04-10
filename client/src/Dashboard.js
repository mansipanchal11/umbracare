import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBaby, FaCalendarAlt, FaFlask, FaUserMd } from "react-icons/fa";
import Plot from "react-plotly.js";
import Plotly from "plotly.js-dist-min";
import axios from "axios";
// Remove framer-motion import since it's causing context errors
import { FaCheck, FaPlus } from "react-icons/fa"; // Add these to your existing Fa imports
import * as d3 from "d3";

function list(start, end) {
  return Array.from({ length: end - start + 1 }, (v, k) => k + start);
}

const cycleData = {
  daysUntilPeriod: 6,
  currentCycle: 28,
  history: {
    "2024": [28, 26, 29, 27, 28, 26, 25, 28, 27, 29, 26, 28],
    "2025": [28, 26, 29, 27, 28],
  },
};

// Function to fetch period prediction data from the backend
const fetchPredictionData = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `http://localhost:5000/api/period-tracker/prediction/${userId}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching period prediction data:", error);
    return null;
  }
};

// Function to calculate days until next period
const calculateDaysUntilPeriod = (nextPeriodStart) => {
  if (!nextPeriodStart) return null;

  const today = new Date();
  const nextPeriod = new Date(nextPeriodStart);
  const diffTime = nextPeriod - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

// Function to format prediction dates
const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

// Function to organize cycle length data by month and year
const organizeCycleLengthData = (cycleLengths) => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const result = {
    [lastYear.toString()]: [],
    [currentYear.toString()]: [],
  };

  if (cycleLengths && cycleLengths.length > 0) {
    const midpoint = Math.floor(cycleLengths.length / 2);
    result[lastYear.toString()] = cycleLengths.slice(0, midpoint);
    result[currentYear.toString()] = cycleLengths.slice(midpoint);
  }

  return result;
};

// function for risk factor and insights and Pregnancy Journey

const getRiskFactor = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `http://localhost:5000/api/pregnancy/latest/${userId}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//heart rate and blood pressure and blood sugar

const allParameter = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const response = await axios.get(
    `http://localhost:5000/api/pregnancy/allparameter/${userId}`,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

const pregnancyData = {
  weeks: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
  ],
  sizes: [
    0.0,
    0.0,
    0.01,
    0.04,
    0.13,
    0.25,
    0.51,
    0.63,
    0.9,
    1.22,
    1.61,
    2.13,
    2.91,
    3.42,
    3.98,
    4.57,
    5.12,
    5.59,
    6.02,
    6.46,
    10.51,
    10.94,
    11.38,
    11.81,
    13.62,
    14.02,
    14.41,
    14.8,
    15.2,
    15.71,
    16.18,
    16.69,
    17.2,
    17.72,
    18.19,
    18.66,
    19.13,
    19.61,
    19.96,
    20.16,
  ],
  comparisons: [
    "Pinhead",
    "Poppy seed",
    "Sesame seed",
    "Apple seed",
    "Blueberry",
    "Sweet pea",
    "Kidney bean",
    "Raspberry",
    "Grape",
    "Strawberry",
    "Lime",
    "Brussels sprout",
    "Fig",
    "Passport photo",
    "Peach",
    "Plum",
    "Peach",
    "Lemon",
    "Avocado",
    "Onion",
    "Pear",
    "Orange",
    "Bell pepper",
    "Sweet potato",
    "Banana",
    "Mango",
    "Grapefruit",
    "Small eggplant",
    "Carrot",
    "Corn cob",
    "Papaya",
    "Cantaloupe",
    "Large banana",
    "Zucchini",
    "Rutabaga",
    "Head of lettuce",
    "Cauliflower",
    "Butternut squash",
    "Cabbage",
    "Acorn squash",
    "Butternut squash",
    "Coconut",
    "Pineapple",
    "Honeydew melon",
    "Mini watermelon",
    "Small pumpkin",
    "Pineapple",
    "Romaine lettuce",
    "Swiss chard",
    "Large pumpkin",
    "Newborn size",
    "Full-term baby",
  ],
};

// Function to determine the current phase of the menstrual cycle
const getCurrentPhase = (dayOfCycle) => {
  if (dayOfCycle <= 5) return "Menstrual Phase";
  if (dayOfCycle <= 11) return "Follicular Phase";
  if (dayOfCycle <= 15) return "Ovulation Phase";
  return "Luteal Phase";
};

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [daysUntilPeriod, setDaysUntilPeriod] = useState(
    cycleData.daysUntilPeriod
  );
  const [cycleHistory, setCycleHistory] = useState(cycleData.history);
  const svgRef = useRef();
  const [currentWeek, setCurrentWeek] = useState(12);
  const [riskFactor, setRiskFactor] = useState(null);
  const [healthData, setHealthData] = useState([]);
  const [week, setWeek] = useState(null);
  const [pregnancyData, setPregnancyData] = useState(null);
  const [pregnancyInsights, setPregnancyInsights] = useState(null);
  // const [useFor, setUseFor] = useState('');
  const [useFor, setUseFor] = useState(
    localStorage.getItem("useFor") || "periods"
  );

  useEffect(() => {
    const storedUseFor = localStorage.getItem("useFor");
    if (storedUseFor) {
      setUseFor(storedUseFor);
    }
  }, []);

  // Function to process health data for graphs
  const processHealthData = (data) => {
    if (!data || !data.vitalData || !Array.isArray(data.vitalData)) return null;

    // Sort data by date
    const sortedData = [...data.vitalData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Get last 7 entries
    const last7Entries = sortedData.slice(-7);

    // Format data for graphs
    return {
      dates: last7Entries.map((entry) =>
        new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })
      ),
      heartRates: last7Entries.map((entry) => entry.heartRate),
      bloodSugars: last7Entries.map((entry) => entry.bloodSugar),
      bloodPressures: last7Entries.map((entry) => entry.bloodPressure.systolic),
      diastolicPressures: last7Entries.map(
        (entry) => entry.bloodPressure.diastolic
      ),
      stats: data.stats || {
        heartRate: { lowest: 43, highest: 80 },
        bloodSugar: { lowest: 44, highest: 90 },
        bloodPressure: {
          systolic: { lowest: 123, highest: 444 },
          diastolic: { lowest: 44, highest: 90 },
        },
      },
    };
  };

  useEffect(() => {
    setIsVisible(true);

    const getPredictionData = async () => {
      const data = await fetchPredictionData();
      const riskFactor = await getRiskFactor();
      const allParameters = await allParameter();

      if (allParameters) {
        setHealthData(processHealthData(allParameters));
      }

      if (data) {
        setPredictionData(data);
        const daysUntil = calculateDaysUntilPeriod(
          data.prediction.nextPeriodStart
        );
        if (daysUntil !== null) {
          setDaysUntilPeriod(daysUntil);
        }

        if (data.cycleLengths) {
          const organizedData = organizeCycleLengthData(data.cycleLengths);
          setCycleHistory(organizedData);
        }
      }
      if (riskFactor) {
        setRiskFactor(riskFactor);
        setWeek(riskFactor.week);

        if (riskFactor.riskFactor) {
          setPregnancyData(riskFactor.riskFactor);
        }
        if (riskFactor.pregnancyData.insights) {
          setPregnancyInsights(riskFactor.pregnancyData.insights);
        }
      }
    };

    getPredictionData();

    // D3 Pregnancy Progress Graph
    const width = 350;
    const height = 250;
    const radius = 80; // Smaller radius to create more space
    const progress = currentWeek / 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Background circles - more subtle
    g.append("circle")
      .attr("r", radius + 25)
      .attr("fill", "rgba(255, 140, 0, 0.03)")
      .attr("stroke", "rgba(255, 140, 0, 0.08)")
      .attr("stroke-width", 1);

    // Background ring - lighter color
    g.append("path")
      .datum({ endAngle: 2 * Math.PI })
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius - 15)
          .outerRadius(radius)
          .startAngle(0)
      )
      .attr("fill", "#FFF5E6")
      .attr("stroke", "#FFD4A3")
      .attr("stroke-width", 1);

    // Gradient for progress arc
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "progress-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FF9E40");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF6B00");

    // Progress arc - thicker
    g.append("path")
      .datum({ endAngle: 2 * Math.PI * progress })
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(radius - 15)
          .outerRadius(radius)
          .startAngle(0)
      )
      .attr("fill", "url(#progress-gradient)")
      .attr("stroke", "#FF4500")
      .attr("stroke-width", 1.5);

    // Trimester markers - moved outward and styled
    const trimesterAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
    trimesterAngles.forEach((angle, i) => {
      g.append("line")
        .attr("x1", (radius - 10) * Math.cos(angle))
        .attr("y1", (radius - 10) * Math.sin(angle))
        .attr("x2", (radius + 20) * Math.cos(angle))
        .attr("y2", (radius + 20) * Math.sin(angle))
        .attr("stroke", "#FF8C00")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,2")
        .attr("opacity", 0.7);

      // Trimester labels - moved further out
      g.append("text")
        .attr("x", (radius + 35) * Math.cos(angle))
        .attr("y", (radius + 35) * Math.sin(angle))
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .style("font-size", "11px")
        .style("fill", "#FF8C00")
        .style("font-weight", "600")
        .style("opacity", 0.9)
        .text(`Trimester ${i + 1}`);
    });

    // Developmental stage text - moved down
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "40") // Increased from 30
      .style("font-size", "13px")
      .style("fill", "#FF6B00")
      .style("font-weight", "bold")
      .style("text-shadow", "0 1px 2px rgba(255,255,255,0.8)")
      .text(() => {
        if (currentWeek <= 4) return "Zygote Stage";
        if (currentWeek <= 8) return "Embryonic Stage";
        if (currentWeek <= 12) return "Fetal Stage";
        if (currentWeek <= 16) return "Developing Features";
        if (currentWeek <= 20) return "Movement Begins";
        if (currentWeek <= 24) return "Viable if Born";
        if (currentWeek <= 28) return "Third Trimester";
        if (currentWeek <= 32) return "Rapid Growth";
        if (currentWeek <= 36) return "Final Preparations";
        return "Full Term";
      });
    // ===== END OF NEW SECTION =====
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
        <p style={styles.subHeading}>PREDICT.PLAN.PROSPER - SMARTER WOMEN'S HEALTH</p> */}

        <div
          style={{
            ...styles.headerContainer,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
        >
          <h1 style={styles.mainHeading}>Welcome to Umbracare</h1>
          <p style={styles.subHeading}>
            Your personalized women's health companion
          </p>
          <div style={styles.divider}></div>
        </div>
        <div style={styles.toggleContainer}>
  <button
    onClick={() => setUseFor("periods")}
    style={{
      ...styles.toggleButton,
      ...(useFor === "periods" ? styles.activePeriod : {}),
    }}
  >
    Period Tracking
  </button>
  <button
    onClick={() => setUseFor("pregnancy")}
    style={{
      ...styles.toggleButton,
      ...(useFor === "pregnancy" ? styles.activePregnancy : {}),
    }}
  >
    Pregnancy Mode
  </button>
</div>

{useFor === "periods" && (
  <>
        {/* First Row: 3 Charts */}
        <div style={styles.graphRow}>
          {/* Cycle Length Analysis */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Cycle Length Analysis</h3>
            </div>
            <div style={styles.graphCard}>
              <div style={styles.chartContainer}>
                <Plot
                  data={[
                    {
                      type: "scatter",
                      x: Object.keys(cycleHistory["2024"]),
                      y: cycleHistory["2024"].map((val, i) =>
                        isVisible ? val : 20
                      ),
                      name: "2024",
                      line: {
                        color: "#B85170",
                        width: 2,
                        shape: "spline",
                        smoothing: 1.3,
                      }, // Changed to secondary color
                      marker: { size: 6 },
                    },
                    {
                      type: "scatter",
                      x: Object.keys(cycleHistory["2025"]),
                      y: cycleHistory["2025"].map((val, i) =>
                        isVisible ? val : 20
                      ),
                      name: "2025",
                      line: {
                        color: "#B85170",
                        width: 3,
                        shape: "spline",
                        smoothing: 1.3,
                      }, // Changed to primary color
                      marker: { size: 8 },
                    },
                  ]}
                  layout={{
                    width: 350,
                    height: 250,
                    margin: { t: 30, l: 50, r: 20, b: 50 },
                    yaxis: {
                      title: "Days",
                      range: [20, 35],
                      gridcolor: "#f5f5f5",
                      titlefont: { size: 10 },
                    },
                    xaxis: {
                      title: "Month",
                      titlefont: { size: 10 },
                      automargin: true,
                    },
                    legend: { orientation: "h", y: -0.3, font: { size: 10 } },
                    plot_bgcolor: "#FFF5F5", // Adjusted to light pink background
                    paper_bgcolor: "rgba(0,0,0,0)",
                    transition: { duration: 800, easing: "cubic-out" },
                  }}
                  config={{ displayModeBar: false, staticPlot: false }}
                />
              </div>
              <div style={styles.metricsGrid}>
                <div style={styles.metricColumn}>
                  <div style={styles.metricHeader}>Shortest</div>
                  <div style={styles.metricValue}>
                    {predictionData?.statistics?.shortestCycle || "0 days"}
                  </div>
                </div>
                <div style={styles.metricColumn}>
                  <div style={styles.metricHeader}>Average</div>
                  <div style={styles.metricValue}>
                    {predictionData?.statistics?.averageCycle || "0 days"}
                  </div>
                </div>
                <div style={styles.metricColumn}>
                  <div style={styles.metricHeader}>Longest</div>
                  <div style={styles.metricValue}>
                    {predictionData?.statistics?.longestCycle || "0 days"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Period Prediction */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Next Period Prediction</h3>
            </div>
            <div style={styles.graphCard}>
              <div style={styles.chartContainer}>
                <Plot
                  data={[
                    {
                      type: "indicator",
                      mode: "number+gauge+delta",
                      value: isVisible
                        ? daysUntilPeriod
                        : predictionData?.prediction?.daysUntilNextPeriod || 0,
                      delta: {
                        reference: 30,
                        decreasing: { color: "#B85170" },
                        font: { size: 12 },
                      }, // Changed to primary color
                      number: {
                        font: { size: 22, color: "#B85170" },
                        suffix: " days",
                      }, // Changed to primary color
                      gauge: {
                        axis: { range: [0, 30], tickfont: { size: 10 } },
                        bar: {
                          color: "#B85170",
                          thickness: 0.2,
                          line: {
                            color: isVisible ? "#B85170" : "transparent",
                            width: 2,
                          },
                        }, // Changed to primary color
                        bgcolor: "#FFF5F5", // Adjusted to light pink
                        steps: [
                          { range: [0, 10], color: "#FFF5F5" }, // Light pink
                          { range: [10, 20], color: "#FFD9E1" }, // Slightly darker pink
                          { range: [20, 30], color: "#B85170" }, // Secondary color
                        ],
                        threshold: {
                          line: { color: "#B85170", width: 2 },
                          thickness: 0.2,
                          value: isVisible
                            ? daysUntilPeriod
                            : predictionData?.prediction?.daysUntilNextPeriod ||
                              0,
                        }, // Changed to secondary color
                      },
                    },
                  ]}
                  layout={{
                    width: 350,
                    height: 250,
                    margin: { t: 30, l: 30, r: 30, b: 30 },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    transition: { duration: 1000, easing: "elastic-out" },
                  }}
                  config={{ displayModeBar: false, staticPlot: false }}
                />
              </div>
              <div style={styles.predictionGrid}>
                <div style={styles.predictionColumn}>
                  <div style={styles.predictionHeader}>Expected Start</div>
                  <div style={styles.predictionDate}>
                    {predictionData?.prediction?.nextPeriodStart
                      ? formatDate(predictionData.prediction.nextPeriodStart)
                      : new Date(
                          new Date().getTime() +
                            daysUntilPeriod * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                  </div>
                </div>
                <div style={styles.predictionColumn}>
                  <div style={styles.predictionHeader}>Expected End</div>
                  <div style={styles.predictionDate}>
                    {predictionData?.prediction?.nextPeriodEnd
                      ? formatDate(predictionData.prediction.nextPeriodEnd)
                      : new Date(
                          new Date().getTime() +
                            (daysUntilPeriod + 5) * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menstrual Cycle Phases */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Menstrual Cycle Phases</h3>
              {predictionData?.prediction?.currentDayOfCycle && (
                <div style={styles.currentDayBadge}>
                  Day {predictionData.prediction.currentDayOfCycle}
                </div>
              )}
            </div>
            <div style={styles.graphCard}>
              <Plot
                data={[
                  {
                    type: "sunburst",
                    labels: [
                      "Cycle",
                      "Menstrual",
                      "Follicular",
                      "Ovulation",
                      "Luteal",
                      "Day 1-5",
                      "Day 6-11",
                      "Day 12-15",
                      "Day 15-17",
                      "Day 18-28",
                    ],
                    parents: [
                      "",
                      "Cycle",
                      "Cycle",
                      "Cycle",
                      "Cycle",
                      "Menstrual",
                      "Follicular",
                      "Follicular",
                      "Ovulation",
                      "Luteal",
                    ],
                    marker: {
                      colors: [
                        "#FFF5F5",
                        "#B85170",
                        "#FFD9E1",
                        "#FFCAD3",
                        "#B85170",
                        "#FFE6EB",
                        "#FFD9E1",
                        "#FFCAD3",
                        "#B85170",
                        "#B85170",
                      ], // Adjusted to pink shades
                      line: { width: 1, color: "#B85170" }, // Changed to primary color
                    },
                    branchvalues: "total",
                    textinfo: "label",
                    hoverinfo: "label+percent",
                    textfont: { size: 12, color: "#333" },
                    insidetextorientation: "radial",
                  },
                ]}
                layout={{
                  width: 350,
                  height: 250,
                  margin: { t: 0, b: 0, l: 0, r: 0 },
                  paper_bgcolor: "rgba(0,0,0,0)",
                  transition: { duration: 800, easing: "cubic-out" },
                  annotations: predictionData?.prediction?.currentDayOfCycle
                    ? [
                        {
                          text: `Current Day: ${predictionData.prediction.currentDayOfCycle}`,
                          showarrow: false,
                          x: 0.5,
                          y: 1.1,
                          font: {
                            family: "Poppins",
                            size: 14,
                            color: "#B85170", // Changed to primary color
                            weight: "bold",
                          },
                        },
                      ]
                    : [],
                }}
                config={{ displayModeBar: false, responsive: true }}
              />

              {predictionData?.prediction?.currentDayOfCycle && (
                <div style={styles.phaseIndicator}>
                  {getCurrentPhase(predictionData.prediction.currentDayOfCycle)}
                </div>
              )}
            </div>
          </div>
        </div>
        </>
)}
{useFor === "pregnancy" && (
  <>
        {/* Second Row: 3 Charts */}
        <div style={styles.graphRow}>
          {/* Pregnancy Journey */}
          <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Pregnancy Journey</h3>
            </div>

            <div style={styles.graphCard}>
              <div
                style={{
                  ...styles.graphCard,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <svg
                  ref={svgRef}
                  width={350}
                  height={250}
                  style={{ display: "block", margin: "0 auto" }}
                ></svg>

                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: `${15 + currentWeek * 1.2}px`,
                    height: `${15 + currentWeek * 1.2}px`,
                    backgroundImage:
                      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjRkY4QzAwIiBkPSJNMjU2IDQ0OGMtMTA2IDAtMTkyLTg2LTE5Mi0xOTJTMTUwIDY0IDI1NiA2NHMxOTIgODYgMTkyIDE5Mi04NiAxOTItMTkyIDE5MnpNMTI4IDI3MmMwLTM1LjMgMjguNy02NCA2NC02NHM2NCAyOC43IDY0IDY0LTI4LjcgNjQtNjQgNjQtNjQtMjguNy02NC02NHptMTI4IDBjMC0zNS4zIDI4LjctNjQgNjQtNjRzNjQgMjguNyA2NCA2NC0yOC43IDY0LTY0IDY0LTY0LTI4LjctNjQtNjR6Ii8+PC9zdmc+")',
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    opacity: 0.8,
                    transition: "all 0.5s ease",
                    zIndex: 10,
                  }}
                ></div>

                <div
                  style={{
                    position: "absolute",
                    top: "20%",
                    right: "10%",
                    backgroundColor: "white",
                    color: "#FF8C00",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "22px",
                    boxShadow: "0 4px 12px rgba(255, 140, 0, 0.3)",
                    border: "3px solid #FF8C00",
                    zIndex: 20,
                  }}
                >
                  {week}
                </div>

                <p
                  style={{
                    marginTop: "15px",
                    color: "#FF8C00",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "0 20px",
                    position: "relative",
                    zIndex: 20,
                    backgroundColor: "rgba(255, 236, 219, 0.7)",
                    borderRadius: "8px",
                    margin: "15px auto 0",
                    maxWidth: "90%",
                  }}
                >
                  {pregnancyInsights}
                </p>
              </div>
            </div>
          </div>

          {/* Health Parameters Card */}
          <div
            style={{
              ...styles.cardContainer,
              flex: "1 1 45%",
              maxWidth: "750px",
            }}
          >
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Health Parameters</h3>
            </div>
            <div style={styles.graphCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "100%",
                  gap: "10px",
                }}
              >
                {/* Heart Rate */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid #FFD4A3",
                    padding: "0 5px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#FF6B8B",
                      marginBottom: "10px",
                    }}
                  >
                    Heart Rate
                  </div>
                  <div style={{ width: "100%", height: "120px" }}>
                    <Plot
                      data={[
                        {
                          type: "scatter",
                          mode: "lines+markers",
                          x: healthData?.dates || [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ],
                          y: healthData?.heartRates || [
                            72,
                            85,
                            78,
                            90,
                            82,
                            76,
                            68,
                          ],
                          line: {
                            color: "#FF6B8B",
                            width: 2,
                            shape: "spline",
                            smoothing: 1.3,
                          },
                          marker: {
                            size: 6,
                            color: "#FF6B8B",
                          },
                          fill: "tozeroy",
                          fillcolor: "rgba(255, 107, 139, 0.1)",
                        },
                      ]}
                      layout={{
                        width: 120,
                        height: 120,
                        margin: { t: 10, l: 30, r: 10, b: 30 },
                        plot_bgcolor: "rgba(0,0,0,0)",
                        paper_bgcolor: "rgba(0,0,0,0)",
                        xaxis: {
                          showgrid: false,
                          zeroline: false,
                          tickfont: { size: 8 },
                        },
                        yaxis: {
                          showgrid: false,
                          zeroline: false,
                          tickfont: { size: 8 },
                          range: [
                            healthData?.stats?.heartRate?.lowest || 60,
                            healthData?.stats?.heartRate?.highest || 100,
                          ],
                        },
                        showlegend: false,
                        hovermode: "closest",
                        hoverlabel: {
                          bgcolor: "#FF6B8B",
                          font: { color: "white" },
                        },
                      }}
                      config={{ displayModeBar: false }}
                    />
                    Journey
                  </div>
                  <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Lowest: {healthData?.stats?.heartRate?.lowest || 68} bpm
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Highest: {healthData?.stats?.heartRate?.highest || 90} bpm
                    </div>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: "1px solid #FFD4A3",
                    padding: "0 5px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#FFA500",
                      marginBottom: "10px",
                    }}
                  >
                    Blood Pressure
                  </div>
                  <div style={{ width: "100%", height: "120px" }}>
                    <Plot
                      data={[
                        {
                          type: "scatter",
                          mode: "lines+markers",
                          x: healthData?.dates || [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ],
                          y: healthData?.bloodPressures || [
                            115,
                            125,
                            118,
                            130,
                            122,
                            120,
                            110,
                          ],
                          name: "Systolic",
                          line: {
                            color: "#FFA500",
                            width: 2,
                            shape: "spline",
                            smoothing: 1.3,
                          },
                          marker: {
                            size: 6,
                            color: "#FFA500",
                          },
                          fill: "tozeroy",
                          fillcolor: "rgba(255, 165, 0, 0.1)",
                        },
                        {
                          type: "scatter",
                          mode: "lines+markers",
                          x: healthData?.dates || [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ],
                          y: healthData?.diastolicPressures || [
                            70,
                            75,
                            72,
                            80,
                            78,
                            75,
                            70,
                          ],
                          name: "Diastolic",
                          line: {
                            color: "#FF8C00",
                            width: 2,
                            shape: "spline",
                            smoothing: 1.3,
                          },
                          marker: {
                            size: 6,
                            color: "#FF8C00",
                          },
                          fill: "tozeroy",
                          fillcolor: "rgba(255, 140, 0, 0.1)",
                        },
                      ]}
                      layout={{
                        width: 120,
                        height: 120,
                        margin: { t: 10, l: 30, r: 10, b: 30 },
                        plot_bgcolor: "rgba(0,0,0,0)",
                        paper_bgcolor: "rgba(0,0,0,0)",
                        xaxis: {
                          showgrid: false,
                          zeroline: false,
                          tickfont: { size: 8 },
                        },
                        yaxis: {
                          showgrid: false,
                          zeroline: false,
                          tickfont: { size: 8 },
                          range: [
                            Math.min(
                              ...(healthData?.diastolicPressures || [60])
                            ),
                            Math.max(...(healthData?.bloodPressures || [140])),
                          ],
                        },
                        showlegend: false,
                        hovermode: "closest",
                        hoverlabel: {
                          bgcolor: "#FFA500",
                          font: { color: "white" },
                        },
                      }}
                      config={{ displayModeBar: false }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Systolic:{" "}
                      {healthData?.stats?.bloodPressure?.systolic?.lowest ||
                        110}{" "}
                      -{" "}
                      {healthData?.stats?.bloodPressure?.systolic?.highest ||
                        130}{" "}
                      mmHg
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Diastolic:{" "}
                      {healthData?.stats?.bloodPressure?.diastolic?.lowest ||
                        70}{" "}
                      -{" "}
                      {healthData?.stats?.bloodPressure?.diastolic?.highest ||
                        90}{" "}
                      mmHg
                    </div>
                  </div>
                </div>

                {/* Blood Sugar */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 5px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#FF4500",
                      marginBottom: "10px",
                    }}
                  >
                    Blood Sugar
                  </div>
                  <div style={{ width: "100%", height: "120px" }}>
                    <Plot
                      data={[
                        {
                          type: "scatter",
                          mode: "lines+markers",
                          x: healthData?.dates || [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ],
                          y: healthData?.bloodSugars || [
                            90,
                            110,
                            95,
                            105,
                            100,
                            92,
                            88,
                          ],
                          line: {
                            color: "#FF4500",
                            width: 2,
                            shape: "spline",
                            smoothing: 1.3,
                          },
                          marker: {
                            size: 6,
                            color: "#FF4500",
                          },
                          fill: "tozeroy",
                          fillcolor: "rgba(255, 69, 0, 0.1)",
                        },
                      ]}
                      layout={{
                        width: 120,
                        height: 120,
                        margin: { t: 10, l: 30, r: 10, b: 30 },
                        plot_bgcolor: "rgba(0,0,0,0)",
                        paper_bgcolor: "rgba(0,0,0,0)",
                        xaxis: {
                          showgrid: false,
                          zeroline: false,
                          tickfont: { size: 8 },
                        },
                        yaxis: {
                          showgrid: false,
                          zeroline: false,
                          tickfont: { size: 8 },
                          range: [
                            healthData?.stats?.bloodSugar?.lowest || 80,
                            healthData?.stats?.bloodSugar?.highest || 120,
                          ],
                        },
                        showlegend: false,
                        hovermode: "closest",
                        hoverlabel: {
                          bgcolor: "#FF4500",
                          font: { color: "white" },
                        },
                      }}
                      config={{ displayModeBar: false }}
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Lowest: {healthData?.stats?.bloodSugar?.lowest || 88}{" "}
                      mg/dL
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      Highest: {healthData?.stats?.bloodSugar?.highest || 110}{" "}
                      mg/dL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Predicted Pregnancy Risk Card */}
          <div
            className="image-container"
            style={{
              display: "flex",
              gap: "50px",
              justifyContent: "end",
              alignItems: "center",
              maxWidth: "500px",
            }}
          >
            <div style={styles.cardContainer}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Predicted Pregnancy Risk</h3>
              </div>
              <div
                style={{
                  ...styles.graphCard,
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {/* Risk Level Indicator */}
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      backgroundColor: "#FF7E79",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                      border: "4px solid #FFB6C1",
                    }}
                  >
                    {pregnancyData}
                  </div>

                  {/* Last Prediction Info */}
                  <div
                    style={{
                      backgroundColor: "#FFF5EB",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      border: "1px solid #FFD4A3",
                      width: "80%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#FF8C00",
                        fontWeight: "600",
                      }}
                    >
                      Last prediction: Week {week}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div
                    style={{
                      marginTop: "20px",
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: "1.5",
                      maxWidth: "80%",
                    }}
                  >
                    Based on your health parameters and history, your{" "}
                    <strong>{pregnancyData}</strong>.
                  </div>
                </div>
              </div>
            </div>
            <div
              className="image-container"
              style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
            >
              <img
                src="/uuu.jpg"
                alt="Pregnancy Risk"
                style={{ width: "750px", height: "auto", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
        </>
)}

        <div style={styles.buttonGrid}>
          <Link to="/pregnancy-postpartum-tracker" style={styles.gridButton}>
            <FaBaby style={styles.icon} />
            <span>Pregnancy & Postpartum Tracker</span>
          </Link>
          <Link to="/period-tracker" style={styles.gridButton}>
            <FaCalendarAlt style={styles.icon} />
            <span>Period Tracker</span>
          </Link>
          <Link to="/ivf-tracker" style={styles.gridButton}>
            <FaFlask style={styles.icon} />
            <span>IVF Tracker</span>
          </Link>
          <Link to="/doctor-info" style={styles.gridButton}>
            <FaUserMd style={styles.icon} />
            <span>Doctor Info</span>
          </Link>
        </div>

        <div style={styles.newsletterBox}>
          <Link to="/newsletter" style={styles.newsletterHeading}>
            Subscribe to Our Newsletter
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    boxSizing: "border-box",
    paddingTop: "50px",
    backgroundImage: "url(/background.jpg)", // Added from Newsletter
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",

    zIndex: 1,
  },
  toggleContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    padding: "10px 20px",
    flexWrap: "wrap",
  },
  
  toggleButton: {
    padding: "14px 28px",
    borderRadius: "30px",
    border: "2px solid #B85170",
    fontSize: "17px",
    fontWeight: "600",
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
    backgroundColor: "#FFF5F5",
    color: "#B85170",
    transition: "all 0.3s ease",
    minWidth: "180px",
    boxShadow: "0 4px 12px rgba(184, 81, 112, 0.1)",
    textTransform: "capitalize",
  },
  
  activePeriod: {
    backgroundColor: "#B85170",
    color: "#FFFFFF",
    boxShadow: "0 8px 18px rgba(184, 81, 112, 0.25)",
  },
  
  activePregnancy: {
    backgroundColor: "#1976d2",
    color: "#FFFFFF",
    borderColor: "#1976d2",
    boxShadow: "0 8px 18px rgba(25, 118, 210, 0.25)",
  },
  
  toggleButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  },  
  content: {
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1400px",
  },
  mainHeading: {
    fontSize: "38px",
    color: "#B85170", // Changed to primary color
    marginBottom: "4px",
    fontWeight: "600",
    textAlign: "center",
  },
  subHeading: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  },
  graphRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 0 30px",
    flexWrap: "wrap",
    opacity: (isVisible) => (isVisible ? 1 : 0),
    transform: (isVisible) =>
      isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s ease-out",
  },
  cardContainer: {
    flex: "1 1 31%",
    minWidth: "300px",
    maxWidth: "700px",
    border: "1px solid #B85170", // Changed to primary color
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(184,81,112,0.1)", // Adjusted shadow color
    willChange: "transform, opacity",
    backgroundColor: "#FFF5F5", // Light pink background
    transform: (isVisible) => (isVisible ? "scale(1)" : "scale(0.95)"),
    transition: "transform 0.4s ease-out 0.2s",
  },
  cardHeader: {
    backgroundColor: "#B85170", // Changed to primary color
    padding: "12px 15px",
    color: "#FFFFFF",
    textAlign: "center",
    borderBottom: "1px solid #B85170", // Changed to secondary color
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: "600",
  },
  graphCard: {
    padding: "15px",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  chartContainer: {
    height: "250px",
    marginBottom: "15px",
    width: "100%",
  },
  metricsGrid: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    borderTop: "1px dashed #B85170", // Changed to secondary color
    paddingTop: "15px",
  },
  metricColumn: {
    textAlign: "center",
    padding: "8px 12px",
    borderRadius: "6px",
    backgroundColor: "#FFF5F5", // Light pink background
    flex: 1,
    margin: "0 5px",
    border: "1px solid #B85170", // Changed to secondary color
    transition: "all 0.3s ease",
  },
  metricHeader: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "600",
    marginBottom: "5px",
  },
  metricValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#B85170", // Changed to primary color
  },
  predictionGrid: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    borderTop: "1px dashed #B85170", // Changed to secondary color
    paddingTop: "15px",
  },
  predictionColumn: {
    textAlign: "center",
    padding: "8px 12px",
    borderRadius: "6px",
    backgroundColor: "#FFF5F5", // Light pink background
    flex: 1,
    margin: "0 5px",
    border: "1px solid #B85170", // Changed to secondary color
    transition: "all 0.3s ease",
  },
  predictionHeader: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "600",
    marginBottom: "5px",
  },
  predictionDate: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#B85170", // Changed to primary color
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "30px",
    marginBottom: "30px",
  },
  gridButton: {
    backgroundColor: "#B85170", // Changed to primary color
    color: "#FFFFFF",
    padding: "15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textDecoration: "none",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "220px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "15px",
  },
  newsletterBox: {
    backgroundColor: "#B85170", // Changed to primary color
    borderRadius: "8px",
    padding: "7px",
    height: "100%",
    width: "300px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  newsletterHeading: {
    color: "#FFFFFF", // Changed to white for contrast
    fontSize: "15px",
  },
  currentDayBadge: {
    fontSize: "12px",
    color: "#FFFFFF",
    backgroundColor: "#B85170", // Changed to secondary color
    padding: "2px 8px",
    borderRadius: "12px",
    marginLeft: "10px",
    display: "inline-block",
  },
  phaseIndicator: {
    fontSize: "14px",
    color: "#B85170", // Changed to primary color
    fontWeight: "600",
    marginTop: "10px",
  },
};

export default Dashboard;
