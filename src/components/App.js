import React, { useState } from 'react';
import Header from './Header';
import GeneralInformation from './GeneralInformation';
import Education from './Education';
import Experience from './Experience';
import isEqual from 'lodash.isequal';
import '../styles/App.scss';
import 'bootswatch/dist/flatly/bootstrap.min.css';

const App = () => {
    const [generalInformation, setGeneralInformation] = useState({});
    // eslint-disable-next-line
    const [education, setEducation] = useState([]);
    // eslint-disable-next-line
    const [experience, setExperience] = useState([]);

    // Used to store passed components information into this component, needed here for when back end is implemented
    // and all components data will be sent to the server
    function updateInformation(component, data) {
        switch (component) {
            case 'GeneralInformation':
                if (!isEqual(generalInformation, data)) {
                    setGeneralInformation(data);
                }
                break;
            case 'Education':
                setEducation(data);
                break;
            case 'Experience':
                setExperience(data);
                break;
            default:
        }
    }

    return (
        <section id='app'>
            <Header />
            <GeneralInformation updateInformation={updateInformation} />
            <Education updateInformation={updateInformation} />
            <Experience updateInformation={updateInformation} />
        </section>
    );
};

export default App;
