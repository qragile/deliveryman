import React from 'react';

export default function ScannerSteps(props) {
  return (
    <div className="row scanner-steps">
      <div className={props.step1 ? 'active' : ''}>Sign-In</div>
      <div className={props.step2 ? 'active' : ''}>Scanner</div>
      <div className={props.step3 ? 'active' : ''}>Confirm</div>
      <div className={props.step4 ? 'active' : ''}>Load</div>
    </div>
  );
}