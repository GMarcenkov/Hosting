import React, { Component } from 'react';
import './customer.css';

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            customers: []
        };
    }

    componentDidMount() {
        fetch('/users/')
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
    }

    render() {
        return (
            <div>
                <h2>Customers</h2>
                <ul>
                    {this.state.customers.map(customer =>
                        <li key={customer._id}>{customer.name} {customer.familyName}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Customers;
