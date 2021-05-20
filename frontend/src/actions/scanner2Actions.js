import React, { Component } from 'react';
import './App.css';
import QrReader from 'react-qr-scanner'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qr_results: [],
        };

        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data) {
        if (!data) {
            return;
        }

        if (this.state.qr_results.includes(data)) {
            return;
        }

        this.setState({
            qr_results: [
                ...this.state.qr_results,
                data
            ],
        });
    }

    render() {
        let qr_results_a_tags = this.state.qr_results.map((qr_result, idx) =>
            <div>
                {idx}: <a target="_blank" href={qr_result} key={idx} >{qr_result}</a>
                <br/>
            </div>
        );

        return (
            <div className="App">
                <header className="App-header">
                    {qr_results_a_tags}
                    <QrReader
                        delay={100}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                </header>
            </div>
        );
    }
}

export default scannerActions;