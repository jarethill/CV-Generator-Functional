import React, { useReducer, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ExperienceForm from './ExperienceForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const plusCircleStyle = { fontSize: '1.25rem', marginBottom: '.18em', cursor: 'pointer' };

const DEFAULT_COMPANY = {
    companyName: '',
    positionTitle: '',
    jobTasks: [''],
    dateFrom: '',
    dateTo: '',
};

function containsUndefined(...args) {
    for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === 'undefined') return true;
    }

    return false;
}

function companyReducer(state, action) {
    const { type, companyIndex, jobIndex, name, value } = action;

    const updatedState = state.map((obj, index) => ({ ...obj, jobTasks: [...state[index].jobTasks] }));

    switch (type) {
        case 'addCompany':
            updatedState.push({ ...DEFAULT_COMPANY });

            return updatedState;
        case 'removeCompany':
            if (containsUndefined(companyIndex)) return state;

            updatedState.splice(companyIndex, 1);

            return updatedState;
        case 'editCompany':
            if (containsUndefined(companyIndex, name, value)) return state;

            updatedState[companyIndex][name] = value;

            return updatedState;
        case 'addTask':
            if (containsUndefined(companyIndex)) return state;

            updatedState[companyIndex].jobTasks.push('');

            return updatedState;
        case 'removeTask':
            if (containsUndefined(companyIndex, jobIndex)) return state;

            updatedState[companyIndex].jobTasks.splice(jobIndex, 1);

            return updatedState;
        case 'editTask':
            if (containsUndefined(companyIndex, jobIndex, value)) return state;

            updatedState[companyIndex].jobTasks[jobIndex] = value;

            return updatedState;
        default:
            throw new Error('Type must be included.');
    }
}

const Experience = ({ updateInformation }) => {
    const [companies, modifyCompanies] = useReducer(companyReducer, [{ ...DEFAULT_COMPANY }]);
    const numberOfCompanies = companies.length;

    useEffect(() => {
        updateInformation('Experience', companies);
    }, [companies, updateInformation]);

    return (
        <Container id='experience' className='mt-5' as='section' style={{ maxWidth: '650px' }}>
            <h2 className='text-center'>
                Experience{' '}
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={plusCircleStyle}
                    onMouseDown={() => modifyCompanies({ type: 'addCompany' })}
                />
            </h2>

            {companies.map((company, index) => {
                if (index === numberOfCompanies - 1) {
                    // If this is the last company, return form without a divider below it
                    return (
                        <ExperienceForm
                            key={index}
                            company={companies[index]}
                            companyIndex={index}
                            modifyCompany={modifyCompanies}
                            numberOfCompanies={numberOfCompanies}
                        />
                    );
                }

                return (
                    <React.Fragment key={index}>
                        <ExperienceForm
                            company={companies[index]}
                            companyIndex={index}
                            modifyCompany={modifyCompanies}
                            numberOfCompanies={numberOfCompanies}
                        />
                        <div className='divider mt-4'></div>
                    </React.Fragment>
                );
            })}
        </Container>
    );
};

export default Experience;
