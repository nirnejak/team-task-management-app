import React, { Component } from 'react'

import './Progress.scss';

export default class Progress extends Component {
    render() {
        return (
            <div style={{ marginBottom: '50px' }}>
                {
                    this.props.progress.map(pro => (
                        <div>
                            <strong>{pro.category}: </strong>
                            {pro.completed}/{pro.total}
                            <div className="progress">
                                <div className="bar" style={{ width: `${(pro.completed / pro.total) * 100}%` }}></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}