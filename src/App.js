import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import uuid from "uuid/v1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlanSelect: true,
      showPlanOptions: false,
      showPlanComplete: false,
      selectedPlan: null
    };
  }

  setPlan = plan => {
    this.setState({
      showPlanSelect: false,
      showPlanOptions: true,
      selectedPlan: plan
    });
  };

  startSaving = planStartDate => {
    this.setState({
      showPlanOptions: false,
      showPlanComplete: true,
      planStartDate: planStartDate
    });
    this.createSavingPlan(this.state.selectedPlan, planStartDate);
  };

  createSavingPlan = (selectedPlan, planStartDate) => {
    const plan = {
      plan: selectedPlan,
      startDate: planStartDate
    };

    localStorage.setItem(uuid(), JSON.stringify(plan));
  };

  render() {
    const { showPlanSelect, showPlanOptions, selectedPlan } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to 365 Savings. Save everyday!</h1>
        </header>
        {showPlanSelect && (
          <section className="plans">
            <h2>Choose a Savings challenge</h2>
            <div className="plan-selector">
              <div key="new-plan-1" className="plan-new">
                <button onClick={e => this.setPlan("1p", e)}>
                  1p Challenge
                </button>
              </div>
            </div>
          </section>
        )}
        {showPlanOptions && (
          <section className="options">
            Selected Challenge is {selectedPlan}.
            <h2>When do you want to start?</h2>
            <div className="options-selector">
              <div key="plan-option-1" className="plan-option">
                <table>
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>1st Deposit</th>
                      <th>For a total of</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>January 1st 2018</td>
                      <td>£324.50</td>
                      <td>£324.50</td>
                      <td>
                        <button>Start saving!</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>1p</td>
                      <td>1p</td>
                      <td>
                        <button onClick={e => this.startSaving(new Date(), e)}>
                          Start saving!
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default App;
