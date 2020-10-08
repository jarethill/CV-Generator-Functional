import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import EducationForm from './EducationForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class Education extends Component {
    constructor(props) {
        super(props);

        this.modifySchool = this.modifySchool.bind(this);
    }
    modifySchool(schoolsArray, method = 'add', schoolIndex = null) {
        const { updateState, rootName } = this.props;
        const updatedSchools = [...schoolsArray];

        if (method === 'add') {
            // Return an object with all the school fields set to an empty string
            const emptySchool = Object.keys(updatedSchools[0]).reduce((accum, current) => {
                return {
                    ...accum,
                    [current]: '',
                };
            }, {});

            updatedSchools.push(emptySchool);
        } else if (method === 'remove' && updatedSchools.length > 1 && schoolIndex >= 0) {
            updatedSchools.splice(schoolIndex, 1);
        } else {
            return;
        }

        updateState(rootName, {
            schools: updatedSchools,
        });
    }

    render() {
        const { schools } = this.props.info;
        const numberOfSchools = schools.length;

        const { updateState, rootName } = this.props;

        const plusCircleStyle = { fontSize: '1.25rem', marginBottom: '.18em', cursor: 'pointer' };

        return (
            <Container id='education' className='mt-5' as='section' style={{ maxWidth: '650px' }}>
                <h2 className='text-center'>
                    Education{' '}
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        style={plusCircleStyle}
                        onMouseDown={() => this.modifySchool(schools, 'add')}
                    />
                </h2>

                {schools.map((school, index) => {
                    if (index === numberOfSchools - 1) {
                        // If this is the last school, no divider is added below
                        return (
                            <EducationForm
                                key={index}
                                schools={schools}
                                schoolIndex={index}
                                updateState={updateState}
                                modifySchool={this.modifySchool}
                                rootName={rootName}
                            />
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <EducationForm
                                schools={schools}
                                schoolIndex={index}
                                updateState={updateState}
                                modifySchool={this.modifySchool}
                                rootName={rootName}
                            />
                            <div className='divider mt-4'></div>
                        </React.Fragment>
                    );
                })}
            </Container>
        );
    }
}

export default Education;
