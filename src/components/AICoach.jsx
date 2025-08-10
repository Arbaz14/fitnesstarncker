import React, { useState } from 'react';
import { exerciseData } from '../data/exercises';
import { FaDumbbell, FaFire } from 'react-icons/fa';
import './AICoach.css';

const AICoach = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState('All');

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  const filteredExercises = Object.keys(exerciseData).filter(
    (exercise) =>
      selectedEquipment === 'All' || exerciseData[exercise].equipment === selectedEquipment
  );

  const equipmentOptions = [
    'All',
    ...new Set(Object.values(exerciseData).map((data) => data.equipment)),
  ];

  return (
    <div className="aicoach-container">
      <h2 className="aicoach-title">
        <FaDumbbell className="title-icon" /> AI Coach
      </h2>
      <div className="exercise-selection-card">
        <h3 className="section-title">Choose Your Exercise</h3>
        <div className="filter-container">
          <label className="filter-label">
            Filter by Equipment:
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="equipment-select"
            >
              {equipmentOptions.map((equipment) => (
                <option key={equipment} value={equipment}>
                  {equipment}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ul className="exercise-list">
          {filteredExercises.length === 0 ? (
            <li className="no-exercises">No exercises found for this equipment.</li>
          ) : (
            filteredExercises.map((exercise) => (
              <li key={exercise} className="exercise-item">
                <button
                  onClick={() => handleSelectExercise(exercise)}
                  className={`exercise-button ${selectedExercise === exercise ? 'active' : ''}`}
                >
                  {exercise}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      {selectedExercise && (
        <div className="exercise-details-card">
          <h3 className="section-title">Exercise Details</h3>
          <div className="details-content">
            <p className="detail-item">
              <strong>Name:</strong> <span>{selectedExercise}</span>
            </p>
            <p className="detail-item">
              <strong>Level:</strong> <span>{exerciseData[selectedExercise].level}</span>
            </p>
            <p className="detail-item">
              <strong>MET:</strong> <span>{exerciseData[selectedExercise].met}</span>
              <FaFire className="detail-icon" />
            </p>
            <p className="detail-item">
              <strong>Fat Ratio:</strong> <span>{exerciseData[selectedExercise].fatRatio}</span>
            </p>
            <p className="detail-item">
              <strong>Carb Ratio:</strong> <span>{exerciseData[selectedExercise].carbRatio}</span>
            </p>
            <p className="detail-item instructions">
              <strong>Instructions:</strong> <span>{exerciseData[selectedExercise].instructions}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICoach;