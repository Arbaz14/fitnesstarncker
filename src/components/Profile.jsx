import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [weight, setWeight] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');

  useEffect(() => {
    const savedWeight = localStorage.getItem('weight');
    const savedCalorieGoal = localStorage.getItem('calorieGoal');
    if (savedWeight) setWeight(savedWeight);
    if (savedCalorieGoal) setCalorieGoal(savedCalorieGoal);
  }, []);

  const handleSave = () => {
    localStorage.setItem('weight', weight);
    localStorage.setItem('calorieGoal', calorieGoal);
    alert('Profile saved!');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Profile</h2>
        <form onSubmit={(e) => e.preventDefault()} className="profile-form">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>
          <div className="form-group">
            <label>Daily Calorie Goal</label>
            <input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              placeholder="Enter your calorie goal"
            />
          </div>
          <button type="button" onClick={handleSave} className="save-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
