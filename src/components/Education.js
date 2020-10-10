import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import EducationForm from './EducationForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_SCHOOL = {
    schoolName: '',
    schoolTitle: '',
    dateFrom: '',
    dateTo: '',
};

const plusCircleStyle = { fontSize: '1.25rem', marginBottom: '.18em', cursor: 'pointer' };

const Education = ({ updateInformation }) => {
    const [schools, setSchools] = useState([{ ...DEFAULT_SCHOOL }]);
    const numberOfSchools = schools.length;

    function modifySchool(schoolIndex, propertyName, value) {
        const updatedSchools = schools.map((school) => ({ ...school }));

        updatedSchools[schoolIndex][propertyName] = value;

        setSchools(updatedSchools);
    }

    function deleteSchool(schoolIndex) {
        const updatedSchools = schools.map((school) => ({ ...school }));

        updatedSchools.splice(schoolIndex, 1);

        setSchools(updatedSchools);
    }

    useEffect(() => {
        updateInformation('Education', schools);
    }, [schools, updateInformation]);

    return (
        <Container id='education' className='mt-5' as='section' style={{ maxWidth: '650px' }}>
            <h2 className='text-center'>
                Education{' '}
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={plusCircleStyle}
                    onMouseDown={() => setSchools([...schools, { ...DEFAULT_SCHOOL }])}
                />
            </h2>

            {schools.map((school, index) => {
                if (index === numberOfSchools - 1) {
                    // If this is the last school, no divider is added below
                    return (
                        <EducationForm
                            key={index}
                            school={schools[index]}
                            schoolIndex={index}
                            modifySchool={modifySchool}
                            deleteSchool={deleteSchool}
                            numberOfSchools={numberOfSchools}
                        />
                    );
                }

                return (
                    <React.Fragment key={index}>
                        <EducationForm
                            school={schools[index]}
                            schoolIndex={index}
                            modifySchool={modifySchool}
                            deleteSchool={deleteSchool}
                            numberOfSchools={numberOfSchools}
                        />
                        <div className='divider mt-4'></div>
                    </React.Fragment>
                );
            })}
        </Container>
    );
};

export default Education;
