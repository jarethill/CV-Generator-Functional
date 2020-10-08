import React, { Component } from 'react';
import Header from './Header';
import GeneralInformation from './GeneralInformation';
import Education from './Education';
import Experience from './Experience';
import '../styles/App.scss';
import 'bootswatch/dist/flatly/bootstrap.min.css';

class App extends Component {
    constructor() {
        super();

        this.updateState = this.updateState.bind(this);

        this.state = {
            general: {
                firstName: '',
                lastName: '',
                addressOne: '',
                addressTwo: '',
                city: '',
                state: '',
                zip: '',
            },
            education: {
                schools: [
                    {
                        schoolName: '',
                        schoolTitle: '',
                        dateFrom: '',
                        dateTo: '',
                    },
                ],
            },
            experience: {
                companies: [
                    {
                        companyName: '',
                        positionTitle: '',
                        jobTasks: [''],
                        dateFrom: '',
                        dateTo: '',
                    },
                ],
            },
        };
    }

    updateState(property, data) {
        this.setState({
            [property]: data,
        });
    }
    render() {
        const { general, education, experience } = this.state;

        return (
            <section id='app'>
                <Header />
                <GeneralInformation updateState={this.updateState} info={general} rootName='general' />
                <Education updateState={this.updateState} info={education} rootName='education' />
                <Experience updateState={this.updateState} info={experience} rootName='experience' />
            </section>
        );
    }
}

export default App;
