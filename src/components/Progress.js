import React, { Component } from 'react'

import './Progress.scss';

export default class Progress extends Component {
    render() {
        return (
            <div style={{ marginBottom: '50px' }}>
                {
                    this.props.progress.map(progressElement => (
                        <div>
                            <strong>{progressElement.category}: </strong>
                            {progressElement.completed}/{progressElement.total}
                            <div className="progress">
                                <div className="bar" style={{ width: `${(progressElement.completed / progressElement.total) * 100}%` }}></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}