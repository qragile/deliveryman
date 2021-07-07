import React from 'react';
import { Link } from 'react-router-dom';

export default function Scanner(props) {
  const { scanner } = props;
  return (
    <div key={scanner._id} className="card">
      <div className="card-body">
        <Link to={`/scanner/${scanner._id}`}>
          <h2>{scanner._id}</h2>
        </Link>
        <div className="row">
          <div className="price">${scanner.email}</div>
          <div>
            <Link to={`/seller/${scanner.email}`}>
              {scanner.sender_id}
            </Link>
          </div>  
        </div>
      </div>
    </div>
  );
}
