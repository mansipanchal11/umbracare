import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const symptomsList = [
  "chronic pelvic pain",
  "delayed cycle",
  "fatigue",
  "heavy bleeding",
  "irregular spotting",
  "light flow",
  "mild cramps",
  "mood swings",
  "normal flow",
  "painful periods",
  "severe cramps",
  "weight gain",
];

const PeriodTracker = () => {
  const [mode, setMode] = useState("track"); // 'track' or 'irregularity'

  // Shared states
  const [startDate, setStartDate] = useState(new Date());
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [result, setResult] = useState("");

  // Track Mode states
  const [endDate, setEndDate] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodEntries, setPeriodEntries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState(null);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Irregularity Detection states
  const [ovulationDay, setOvulationDay] = useState(14);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    if (mode === "track") fetchPeriodEntries();
  }, [mode]);

  const fetchPeriodEntries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const response = await axios.get(
        "http://localhost:5000/api/period-tracker",
        {
          headers: { "x-auth-token": token },
        }
      );
      setPeriodEntries(response.data);
      setLoading(false);
    } catch (err) {
      setError(
        `Error fetching period entries: ${err.response?.data?.msg ||
          err.message}`
      );
      setLoading(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      const periodData = { startDate, endDate };
      if (editMode && currentEntryId) {
        await axios.put(
          `http://localhost:5000/api/period-tracker/${currentEntryId}`,
          periodData,
          {
            headers: {
              "x-auth-token": token,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Period entry updated successfully!");
        setEditMode(false);
        setCurrentEntryId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/period-tracker",
          periodData,
          {
            headers: {
              "x-auth-token": token,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Period entry added successfully!");
      }

      fetchPeriodEntries();
      setStartDate(new Date());
      setEndDate(null);

      const nextPeriod = new Date(startDate);
      nextPeriod.setDate(startDate.getDate() + parseInt(cycleLength));
      setResult(
        `Your next period is expected around ${nextPeriod.toDateString()}.`
      );
    } catch (err) {
      toast.error(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");

      await axios.delete(`http://localhost:5000/api/period-tracker/${id}`, {
        headers: { "x-auth-token": token },
      });
      toast.success("Period entry deleted successfully!");
      fetchPeriodEntries();
    } catch (err) {
      toast.error(`Error: ${err.response?.data?.msg || err.message}`);
    }
  };

  const handleEdit = (entry) => {
    setStartDate(new Date(entry.startDate));
    setEndDate(entry.endDate ? new Date(entry.endDate) : null);
    setEditMode(true);
    setCurrentEntryId(entry._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSymptoms(
      checked
        ? [...selectedSymptoms, value]
        : selectedSymptoms.filter((s) => s !== value)
    );
  };

  const handleIrregularitySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://period-model-api-1.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cycle_length: parseFloat(cycleLength),
          ovulation_day: ovulationDay === "" ? "none" : String(ovulationDay),
          symptoms: selectedSymptoms,
        }),
      });
      const data = await response.json();
      if (data && data.predicted_condition) {
        setResult(`Prediction: ${data.predicted_condition}`);
      } else {
        setResult("Error: Invalid API response.");
      }
    } catch (error) {
      setResult("Error: Could not connect to the prediction service.");
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.trackerContainer}>
        <h2 style={styles.heading}>Period Tracker</h2>

        {/* Toggle Buttons */}
        <div style={styles.toggleButtons}>
          <button
            onClick={() => setMode("track")}
            style={mode === "track" ? styles.activeToggle : styles.toggle}
          >
            Track Period
          </button>
          <button
            onClick={() => setMode("irregularity")}
            style={
              mode === "irregularity" ? styles.activeToggle : styles.toggle
            }
          >
            Detect Irregularity
          </button>
        </div>

        {mode === "track" ? (
          <form onSubmit={handleTrackSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Period Start Date:</label>
              <div style={styles.calendarInput}>
                <input
                  type="text"
                  value={startDate.toDateString()}
                  readOnly
                  style={styles.input}
                />
                <FaCalendarAlt
                  onClick={() => setShowStartCalendar(!showStartCalendar)}
                  style={styles.calendarIcon}
                />
                {showStartCalendar && (
                  <Calendar
                    onChange={(date) => {
                      setStartDate(date);
                      setShowStartCalendar(false);
                    }}
                    value={startDate}
                  />
                )}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>Period End Date (optional):</label>
              <div style={styles.calendarInput}>
                <input
                  type="text"
                  value={endDate ? endDate.toDateString() : ""}
                  readOnly
                  style={styles.input}
                />
                <FaCalendarAlt
                  onClick={() => setShowEndCalendar(!showEndCalendar)}
                  style={styles.calendarIcon}
                />
                {showEndCalendar && (
                  <Calendar
                    onChange={(date) => {
                      setEndDate(date);
                      setShowEndCalendar(false);
                    }}
                    value={endDate}
                  />
                )}
              </div>
            </div>

            <button type="submit" style={styles.button}>
              {editMode ? "Update Period" : "Track Period"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setCurrentEntryId(null);
                  setStartDate(new Date());
                  setEndDate(null);
                }}
                style={styles.cancelButton}
              >
                Cancel Edit
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={handleIrregularitySubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Cycle Length (days):</label>
              <input
                type="number"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                style={styles.input}
                min="21"
                max="35"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Ovulation Day:</label>
              <input
                type="number"
                value={ovulationDay}
                onChange={(e) => setOvulationDay(e.target.value)}
                style={styles.input}
                min="10"
                max="20"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Symptoms:</label>
              <div style={styles.symptomGrid}>
                {symptomsList.map((symptom, index) => (
                  <label
                    key={index}
                    htmlFor={symptom}
                    style={{
                      ...styles.symptomCard,
                      ...(selectedSymptoms.includes(symptom)
                        ? styles.symptomCardSelected
                        : {}),
                    }}
                  >
                    <input
                      type="checkbox"
                      id={symptom}
                      value={symptom}
                      onChange={handleSymptomChange}
                      style={{ display: "none" }}
                    />
                    {symptom}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" style={styles.button}>
              Predict Irregularity
            </button>
          </form>
        )}

        {result && <p style={styles.result}>{result}</p>}

        {mode === "track" && (
          <div>
            <h3 style={styles.subHeading}>Your Period History</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={styles.error}>{error}</p>
            ) : periodEntries.length === 0 ? (
              <p>No period entries found. Start tracking your periods!</p>
            ) : (
              <ul style={styles.entriesList}>
                {periodEntries.map((entry) => (
                  <li key={entry._id} style={styles.entryItem}>
                    <div>
                      <strong>Start:</strong>{" "}
                      {new Date(entry.startDate).toLocaleDateString()}
                      {entry.endDate && (
                        <>
                          {" "}
                          | <strong>End:</strong>{" "}
                          {new Date(entry.endDate).toLocaleDateString()}
                        </>
                      )}
                    </div>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(entry)}
                        style={styles.editButton}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 9999 } }}
      />
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
    padding: "20px",
    paddingTop: "90px",
    backgroundImage: "url(/background.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    zIndex: 1,
  },
  symptomGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },

  symptomCard: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "1px solid #B85170",
    color: "#B85170",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "14px",
    fontWeight: "500",
    userSelect: "none",
  },

  symptomCardSelected: {
    backgroundColor: "#B85170",
    color: "#fff",
    border: "1px solid #B85170",
  },

  trackerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(5px)",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "2px solid #B85170",
    width: "100%",
    maxWidth: "600px",
    position: "relative",
    zIndex: 2,
  },
  heading: {
    fontSize: "28px",
    color: "#B85170",
    marginBottom: "20px",
    fontWeight: "600",
  },
  subHeading: {
    fontSize: "22px",
    color: "#B85170",
    marginTop: "30px",
    marginBottom: "15px",
    fontWeight: "500",
  },
  toggleButtons: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  toggle: {
    padding: "10px 20px",
    border: "1px solid #B85170",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#B85170",
    fontWeight: "500",
    transition: "all 0.3s",
  },
  activeToggle: {
    padding: "10px 20px",
    border: "1px solid #B85170",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#B85170",
    color: "#fff",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "5px",
  },
  transferLabel: {
    fontSize: "16px",
    color: "#B85170",
  },
  label: {
    fontSize: "16px",
    color: "#B85170",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%",
    boxSizing: "border-box",
    color: "#000",
  },
  calendarInput: {
    position: "relative",
    width: "100%",
  },
  calendarIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#B85170",
    fontSize: "20px",
  },
  calendar: {
    position: "absolute",
    zIndex: 1000,
    top: "100%",
    left: 0,
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#B85170",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "#333",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  result: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#000000",
  },
  entriesSection: {
    marginTop: "30px",
    textAlign: "left",
    height: "300px",
    overflowY: "auto",
  },
  entriesList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  entryItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
    marginBottom: "5px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "#ff4d4d",
    marginTop: "10px",
  },
};

export default PeriodTracker;
