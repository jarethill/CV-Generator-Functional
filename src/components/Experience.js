import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ExperienceForm from './ExperienceForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class Experience extends Component {
    constructor(props) {
        super(props);

        this.modifyCompany = this.modifyCompany.bind(this);
    }

    modifyCompany(companiesArray, method = 'add', companyIndex = null) {
        const updatedCompanies = [...companiesArray];
        const { updateState, rootName } = this.props;

        if (method === 'add') {
            // Return an object with all the company fields set to an empty string or array for job tasks
            const emptyCompany = Object.keys(updatedCompanies[0]).reduce((accum, current) => {
                if (Array.isArray(updatedCompanies[0][current])) {
                    return {
                        ...accum,
                        [current]: [''],
                    };
                } else {
                    return {
                        ...accum,
                        [current]: '',
                    };
                }
            }, {});

            updatedCompanies.push(emptyCompany);
        } else if (method === 'remove' && companiesArray.length > 1 && companyIndex >= 0) {
            updatedCompanies.splice(companyIndex, 1);
        } else {
            return;
        }

        updateState(rootName, {
            companies: updatedCompanies,
        });
    }

    render() {
        const { companies } = this.props.info;
        const numberOfCompanies = companies.length;

        const { updateState, rootName } = this.props;
        const plusCircleStyle = { fontSize: '1.25rem', marginBottom: '.18em', cursor: 'pointer' };

        return (
            <Container id='experience' className='mt-5' as='section' style={{ maxWidth: '650px' }}>
                <h2 className='text-center'>
                    Experience{' '}
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        style={plusCircleStyle}
                        onMouseDown={() => this.modifyCompany(companies, 'add')}
                    />
                </h2>

                {companies.map((company, index) => {
                    if (index === numberOfCompanies - 1) {
                        // If this is the last company, no divider is added below
                        return (
                            <ExperienceForm
                                key={index}
                                companies={companies}
                                companyIndex={index}
                                updateState={updateState}
                                modifyCompany={this.modifyCompany}
                                rootName={rootName}
                            />
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <ExperienceForm
                                companies={companies}
                                companyIndex={index}
                                updateState={updateState}
                                modifyCompany={this.modifyCompany}
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

export default Experience;
