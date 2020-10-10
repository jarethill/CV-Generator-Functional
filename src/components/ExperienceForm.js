import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const minusCircleStyle = { cursor: 'pointer', position: 'absolute', right: '.75em', top: '.75em' };

const ExperienceForm = ({ company, companyIndex, modifyCompanies, numberOfCompanies }) => {
    const [editMode, setEditMode] = useState(true);
    const { companyName, positionTitle, jobTasks, dateFrom, dateTo } = company;

    return (
        <Form className='mt-4 mb-4' onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId='formBasicCompany'>
                <Form.Label className='font-weight-bold'>Company Name</Form.Label>

                {editMode ? (
                    <Form.Control
                        type='text'
                        placeholder='Enter company name'
                        value={companyName}
                        name='companyName'
                        onChange={(e) =>
                            modifyCompanies({
                                type: 'editCompany',
                                companyIndex,
                                name: e.target.name,
                                value: e.target.value,
                            })
                        }
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
                        name='positionTitle'
                        onChange={(e) =>
                            modifyCompanies({
                                type: 'editCompany',
                                companyIndex,
                                name: e.target.name,
                                value: e.target.value,
                            })
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
                            onMouseDown={() => modifyCompanies({ type: 'addTask', companyIndex })}
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
                                                modifyCompanies({ type: 'removeTask', companyIndex, jobIndex: index })
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
                                    modifyCompanies({
                                        type: 'editTask',
                                        companyIndex,
                                        jobIndex: index,
                                        value: e.target.value,
                                    })
                                }
                            />

                            {jobTasks.length > 1 && (
                                // Render delete button only if there's more than 1 task
                                <FontAwesomeIcon
                                    icon={faMinusCircle}
                                    style={minusCircleStyle}
                                    onMouseDown={() =>
                                        modifyCompanies({ type: 'removeTask', companyIndex, jobIndex: index })
                                    }
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
                            name='dateFrom'
                            onChange={(e) =>
                                modifyCompanies({
                                    type: 'editCompany',
                                    companyIndex,
                                    name: e.target.name,
                                    value: e.target.value,
                                })
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
                            name='dateTo'
                            onChange={(e) =>
                                modifyCompanies({
                                    type: 'editCompany',
                                    companyIndex,
                                    name: e.target.name,
                                    value: e.target.value,
                                })
                            }
                        />
                    ) : (
                        <p>{dateTo}</p>
                    )}
                </Form.Group>
            </Form.Row>

            <Form.Row className='justify-content-between w-100 mr-0 ml-0'>
                <Button variant={editMode ? 'info' : 'secondary'} onMouseDown={() => setEditMode(!editMode)}>
                    {editMode ? 'Submit' : 'Edit'}
                </Button>

                {numberOfCompanies > 1 && (
                    <Button
                        variant='danger'
                        onMouseDown={() => modifyCompanies({ type: 'removeCompany', companyIndex })}
                    >
                        Delete
                    </Button>
                )}
            </Form.Row>
        </Form>
    );
};

export default ExperienceForm;
