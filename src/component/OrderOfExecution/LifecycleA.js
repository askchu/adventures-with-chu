import React, { Component } from 'react'
import LifecycleB from './LifecycleB';


class LifecycleA extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Alex'
        }
        console.log('lifeCycleA constructor');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('lifeCycleA getderivedStateFromProps')
        return null
    }

    componentDidMount() {
        console.log('lifeCycleA componentdidmount');
    }

    shouldComponentUpdate() {
        console.log('lifeCycleA shouldComponentUpdate');
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('lifeCycleA getSnapshitBeforeUpdate');
        return null
    }

    componentDidUpdate() {
        console.log('lifeCycleA shouldComponentDidUpdate')
    }

    changeState = () => {
        this.setState({
            name: 'Grace Luuuuuu'
        })
    }

    render() {
        console.log('lifeCycleA render');
        return (
            <div>
                <h5>LifeCycleA</h5>
                <button onClick={this.changeState}>Change State</button>
                <LifecycleB />
            </div>
        )
    }
}

export default LifecycleA
