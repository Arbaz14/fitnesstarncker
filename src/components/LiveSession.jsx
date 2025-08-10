import React, { useState, useEffect, useRef } from 'react';
import { exerciseData } from '../data/exercises';
import { FaDumbbell, FaPlay, FaPause, FaSync, FaSave } from 'react-icons/fa';
import './LiveSession.css';

const LiveSession = () => {
  const [mode, setMode] = useState('manual');
  const [selectedExercise, setSelectedExercise] = useState('running');
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [exerciseInstructions, setExerciseInstructions] = useState('');
  const timerRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (time > 0) {
      calculateMetrics();
    }
  }, [time, selectedExercise]);

  useEffect(() => {
    if (mode === 'automatic') {
      if (speed > 1 && !isRunning) {
        setIsRunning(true);
      } else if (speed <= 1 && isRunning) {
        setIsRunning(false);
      }

      if (speed > 5.5) {
        setSelectedExercise('running');
        setExerciseInstructions(exerciseData['running']?.instructions || '');
      } else if (speed > 3.5) {
        setSelectedExercise('jogging');
        setExerciseInstructions(exerciseData['jogging']?.instructions || '');
      } else if (speed > 1) {
        setSelectedExercise('walking');
        setExerciseInstructions(exerciseData['walking']?.instructions || '');
      }
    }
  }, [speed, mode, isRunning]);

  useEffect(() => {
    setExerciseInstructions(exerciseData[selectedExercise]?.instructions || '');
  }, [selectedExercise]);

  const calculateMetrics = () => {
    const exercise = exerciseData[selectedExercise];
    const weight = parseFloat(localStorage.getItem('weight')) || 70;

    if (exercise) {
      const caloriesPerMinute = (exercise.met * weight * 3.5) / 200;
      const totalCalories = (caloriesPerMinute / 60) * time;
      setCalories(totalCalories);

      const totalFatCalories = totalCalories * exercise.fatRatio;
      const totalCarbCalories = totalCalories * exercise.carbRatio;
      setFat(totalFatCalories / 9);
      setCarbs(totalCarbCalories / 4);
    }
  };

  const handleStartStopAutomatic = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsRunning(false);
      setSpeed(0);
    } else {
      setIsRunning(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          setSpeed(position.coords.speed ? position.coords.speed * 2.23694 : 0);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Error getting location. Please enable GPS.');
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setCalories(0);
    setFat(0);
    setCarbs(0);
    setSpeed(0);
  };

  const handleSaveWorkout = () => {
    const workout = {
      date: new Date().toISOString(),
      exercise: selectedExercise,
      duration: time,
      calories: calories.toFixed(2),
      fat: fat.toFixed(2),
      carbs: carbs.toFixed(2),
    };

    const workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));

    alert('Workout saved!');
    handleReset();
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');
  };

  return (
    <div className="livesession-container">
      <h2 className="livesession-title">
        <FaDumbbell className="title-icon" /> Workout Timer
      </h2>
      <div className="mode-selection">
        <button
          className={`mode-button ${mode === 'manual' ? 'active' : ''}`}
          onClick={() => setMode('manual')}
        >
          Manual
        </button>
        <button
          className={`mode-button ${mode === 'automatic' ? 'active' : ''}`}
          onClick={() => setMode('automatic')}
        >
          Automatic
        </button>
      </div>

      <div className="session-card">
        {mode === 'manual' && (
          <div className="manual-mode">
            <h3 className="section-title">Manual Mode</h3>
            <div className="exercise-selector">
              <label className="selector-label">
                Select Exercise:
                <select
                  value={selectedExercise}
                  onChange={(e) => {
                    const selectedEx = e.target.value;
                    setSelectedExercise(selectedEx);
                    setExerciseInstructions(exerciseData[selectedEx]?.instructions || '');
                  }}
                  className="exercise-select"
                >
                  {Object.keys(exerciseData).map((ex) => (
                    <option key={ex} value={ex}>
                      {ex}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {exerciseInstructions && (
              <div className="exercise-instructions">
                <h4 className="instructions-title">Instructions</h4>
                <p>{exerciseInstructions}</p>
              </div>
            )}
            <div className="timer-display">
              <h1 className="timer">{formatTime(time)}</h1>
              <div className="control-buttons">
                <button
                  onClick={handleStartStop}
                  className={`control-button ${isRunning ? 'stop' : 'start'}`}
                >
                  {isRunning ? <FaPause /> : <FaPlay />}
                  {isRunning ? 'Stop' : 'Start'}
                </button>
                <button onClick={handleReset} className="control-button reset">
                  <FaSync /> Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === 'automatic' && (
          <div className="automatic-mode">
            <h3 className="section-title">Automatic Mode</h3>
            <p className="speed-display">Current Speed: {speed.toFixed(2)} mph</p>
            <p className="current-exercise">Exercise: {selectedExercise}</p>
            <div className="timer-display">
              <h1 className="timer">{formatTime(time)}</h1>
              <button
                onClick={handleStartStopAutomatic}
                className={`control-button ${isRunning ? 'stop' : 'start'}`}
              >
                {isRunning ? <FaPause /> : <FaPlay />}
                {isRunning ? 'Stop Tracking' : 'Start Tracking'}
              </button>
            </div>
          </div>
        )}

        <div className="stats-card">
          <h3 className="section-title">Workout Stats</h3>
          <div className="stats-content">
            <p className="stat-item">
              <strong>Calories:</strong> {calories.toFixed(2)} cal
            </p>
            <p className="stat-item">
              <strong>Fat:</strong> {fat.toFixed(2)} g
            </p>
            <p className="stat-item">
              <strong>Carbs:</strong> {carbs.toFixed(2)} g
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveWorkout}
        disabled={!time}
        className={`save-button ${!time ? 'disabled' : ''}`}
      >
        <FaSave /> Save Workout
      </button>
    </div>
  );
};

export default LiveSession;