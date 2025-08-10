import React, { useState } from 'react';
import './WorkoutPlans.css';

const WorkoutPlans = () => {
  const [plans, setPlans] = useState([]);
  const [newPlanName, setNewPlanName] = useState('');

  const handleAddPlan = () => {
    if (newPlanName.trim()) {
      setPlans([...plans, { name: newPlanName, exercises: [] }]);
      setNewPlanName('');
    }
  };

  const handleDeletePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  return (
    <div className="plans-container">
      <h2 className="plans-title">🏋 Workout Plans</h2>

      <div className="add-plan">
        <input
          type="text"
          placeholder="Enter new plan name"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
        />
        <button className="btn btn-green" onClick={handleAddPlan}>Add Plan</button>
      </div>

      <ul className="plans-list">
        {plans.map((plan, index) => (
          <li key={index} className="plan-item">
            <span>{plan.name}</span>
            <button className="btn btn-red" onClick={() => handleDeletePlan(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlans;
