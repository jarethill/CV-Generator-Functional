import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

class ExperienceForm extends Component {
    constructor(props) {
        super(props);

        this.updateCompany = this.updateCompany.bind(this);
        this.modifyTask = this.modifyTask.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);

        this.state = {
            editMode: true,
        };
    }

    updateCompany(companiesArray, companyIndex, propertyName, value) {
        const updatedCompanies = [...companiesArray];
        const { updateState, rootName } = this.props;

        updatedCompanies[companyIndex] = {
            ...updatedCompanies[companyIndex],
            [propertyName]: value,
        };

        updateState(rootName, {
            companies: updatedCompanies,
        });
    }

    updateCompanyTasks(companiesArray, companyIndex, taskIndex, value) {
        const updatedCompanies = [...companiesArray];
        const updatedTasks = [...updatedCompanies[companyIndex].jobTasks];
        const { updateState, rootName } = this.props;

        updatedTasks[taskIndex] = value;

        updatedCompanies[companyIndex] = {
            ...updatedCompanies[companyIndex],
            jobTasks: updatedTasks,
        };

        updateState(rootName, {
            companies: updatedCompanies,
        });
    }

    modifyTask(companiesArray, companyIndex, method = 'add', taskIndex = null) {
        const updatedCompanies = [...companiesArray];
        const updatedTasks = [...updatedCompanies[companyIndex].jobTasks];
        const { updateState, rootName } = this.props;

        if (method === 'add') {
            updatedTasks.push('');
        } else if (method === 'remove' && updatedTasks.length > 1 && taskIndex >= 0) {
            updatedTasks.splice(taskIndex, 1);
        } else {
            return;
        }

        updatedCompanies[companyIndex] = {
            ...updatedCompanies[companyIndex],
            jobTasks: updatedTasks,
        };

        updateState(rootName, {
            companies: updatedCompanies,
        });
    }

    toggleEditMode() {
        this.setState((prevState) => ({
            editMode: !prevState.editMode,
        }));
    }

    render() {
        const { editMode } = this.state;
        const { companies, companyIndex, modifyCompany } = this.props;
        const { companyName, positionTitle, jobTasks, dateFrom, dateTo } = companies[companyIndex];

        const minusCircleStyle = { cursor: 'pointer', position: 'absolute', right: '.75em', top: '.75em' };

        return (
            <Form className='mt-4 mb-4' onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId='formBasicCompany'>
                    <Form.Label className='font-weight-bold'>Company Name</Form.Label>
                    {editMode ? (
                        <Form.Control
                            type='text'
                            placeholder='Enter company name'
                            value={companyName}
                            onChange={(e) => this.updateCompany(companies, companyIndex, 'companyName', e.target.value)}
                        />
                    ) : (
                        <p>{companyName}</p>
                    )}
                </Form.Group>

                <Form.Group controlId='formBasicPositionTitle'>
                    <Form.Label className='font-weight-bold'>Position Title</Form.Label>
                    {editMode ? (
                        <Form.Control
                            type='text'
                            placeholder='Enter title'
                            value={positionTitle}
                            onChange={(e) =>
                                this.updateCompany(companies, companyIndex, 'positionTitle', e.target.value)
                            }
                        />
                    ) : (
                        <p>{positionTitle}</p>
                    )}
                </Form.Group>

                <Form.Group controlId='formBasicTasks'>
                    <Form.Label className='font-weight-bold'>
                        Main Tasks of Job{' '}
                        {editMode && (
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                style={{ cursor: 'pointer' }}
                                onMouseDown={() => this.modifyTask(companies, companyIndex, 'add')}
                            />
                        )}
                    </Form.Label>
                    {!editMode ? (
                        <ul>
                            {jobTasks.map((task, index) => (
                                <li key={index} style={{ marginLeft: '1.25em' }}>
                                    <div style={{ position: 'relative' }}>
                                        <p>{task}</p>
                                        {jobTasks.length > 1 && (
                                            // Render delete button only if there's more than 1 task
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                                style={minusCircleStyle}
                                                onMouseDown={() =>
                                                    this.modifyTask(companies, companyIndex, 'remove', index)
                                                }
                                            />
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        jobTasks.map((task, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter task'
                                    className='mt-2'
                                    value={task}
                                    onChange={(e) =>
                                        this.updateCompanyTasks(companies, companyIndex, index, e.target.value)
                                    }
                                />

                                {jobTasks.length > 1 && (
                                    // Render delete button only if there's more than 1 task
                                    <FontAwesomeIcon
                                        icon={faMinusCircle}
                                        style={minusCircleStyle}
                                        onMouseDown={() => this.modifyTask(companies, companyIndex, 'remove', index)}
                                    />
                                )}
                            </div>
                        ))
                    )}
                </Form.Group>

                <Form.Row className='justify-content-between w-100 mr-0 ml-0'>
                    <Form.Group controlId='formBasicDate'>
                        <Form.Label className='font-weight-bold'>Date of Employment</Form.Label>
                        {editMode ? (
                            <Form.Control
                                type='date'
                                value={dateFrom}
                                onChange={(e) =>
                                    this.updateCompany(companies, companyIndex, 'dateFrom', e.target.value)
                                }
                            />
                        ) : (
                            <p>{dateFrom}</p>
                        )}
                    </Form.Group>
                    <Form.Group controlId='formBasicDate2'>
                        <Form.Label className='font-weight-bold'>To</Form.Label>

                        {editMode ? (
                            <Form.Control
                                type='date'
                                value={dateTo}
                                onChange={(e) => this.updateCompany(companies, companyIndex, 'dateTo', e.target.value)}
                            />
                        ) : (
                            <p>{dateTo}</p>
                        )}
                    </Form.Group>
                </Form.Row>
                <Form.Row className='justify-content-between w-100 mr-0 ml-0'>
                    <Button variant={editMode ? 'info' : 'secondary'} onMouseDown={() => this.toggleEditMode()}>
                        {editMode ? 'Submit' : 'Edit'}
                    </Button>
                    {companies.length > 1 && (
                        <Button variant='danger' onMouseDown={() => modifyCompany(companies, 'remove', companyIndex)}>
                            Delete
                        </Button>
                    )}
                </Form.Row>
            </Form>
        );
    }
}

export default ExperienceForm;
