import React, { useState } from 'react';
import './WaterTracker.css';

const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [reminders, setReminders] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [waterLog, setWaterLog] = useState([]);

  const addReminder = (hour) => {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hour, 0, 0, 0);

    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const id = setTimeout(() => {
      if (notificationsEnabled) {
        alert(`Reminder: Time to drink water at ${hour}:00!`);
      }
    }, reminderTime - now);

    setReminders((prev) => [...prev, { id, hour, enabled: true }]);
  };

  const toggleReminder = (index) => {
    setReminders((prev) =>
      prev.map((reminder, i) =>
        i === index ? { ...reminder, enabled: !reminder.enabled } : reminder
      )
    );
  };

  const removeReminder = (index) => {
    clearTimeout(reminders[index].id);
    setReminders((prev) => prev.filter((_, i) => i !== index));
  };

  const logWaterIntake = (amount) => {
    setWaterLog((prev) => [...prev, { amount, time: new Date() }]);
  };

  const totalWater = waterLog.reduce((sum, log) => sum + log.amount, 0);

  const handleAddWater = (amount) => {
    setWaterIntake((prev) => prev + amount);
    logWaterIntake(amount);
  };

  return (
    <div className="tracker-container">
      <h2 className="tracker-title">💧 Water Tracker</h2>

      <div className="button-row">
        <button className="btn btn-green" onClick={() => handleAddWater(250)}>Add 250ml</button>
        <button className="btn btn-green" onClick={() => handleAddWater(500)}>Add 500ml</button>
      </div>

      <p className="total-text">Total Water Consumed: {totalWater} ml</p>

      <div className="card">
        <h3>Reminders</h3>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled((prev) => !prev)}
          />
          Enable Notifications
        </label>
        <div className="input-row">
          <label>
            Add Reminder Hour:
            <input
              type="number"
              min="0"
              max="23"
              onChange={(e) => addReminder(Number(e.target.value))}
            />
          </label>
        </div>
        <ul className="list">
          {reminders.map((reminder, index) => (
            <li key={index} className="list-item">
              <span>
                Reminder at {reminder.hour}:00 - {reminder.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <div>
                <button className="btn btn-yellow" onClick={() => toggleReminder(index)}>
                  {reminder.enabled ? 'Disable' : 'Enable'}
                </button>
                <button className="btn btn-red" onClick={() => removeReminder(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Water Log</h3>
        <ul className="list">
          {waterLog.map((log, index) => (
            <li key={index}>
              {log.amount} ml at {log.time.toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="card text-center">
        <h3>Sponsored Ads</h3>
        <p>Your ad could be here!</p>
      </div>
    </div>
  );
};

export default WaterTracker;
