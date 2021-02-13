import React, { Component } from 'react'


class LifecycleB extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Alex'
        }
        console.log('lifeCycleB constructor');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('lifeCycleB getderivedStateFromProps')
        return null
    }

    componentDidMount() {
        console.log('lifeCycleB componentdidmount');
    }

    shouldComponentUpdate() {
        console.log('lifeCycleB shouldComponentUpdate');
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('lifeCycleB getSnapshitBeforeUpdate');
        return null
    }

    componentDidUpdate() {
        console.log('lifeCycleB shouldComponentDidUpdate')
    }

    render() {
        console.log('lifeCycleB render');
        return (
            <div>
                <h5>LifeCycleB</h5>
            </div>
        )
    }
}

export default LifecycleB
