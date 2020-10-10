import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/button';

const EducationForm = ({ school, schoolIndex, modifySchool, deleteSchool, numberOfSchools }) => {
    const [editMode, setEditMode] = useState(true);

    const { schoolName, schoolTitle, dateFrom, dateTo } = school;

    return (
        <Form className='mt-4' onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId='formBasicSchool'>
                <Form.Label className='font-weight-bold'>School Name</Form.Label>

                {editMode ? (
                    <Form.Control
                        type='text'
                        placeholder='Enter school name'
                        name='schoolName'
                        value={schoolName}
                        onChange={(e) => {
                            modifySchool(schoolIndex, e.target.name, e.target.value);
                        }}
                    />
                ) : (
                    <p>{schoolName}</p>
                )}
            </Form.Group>

            <Form.Group controlId='formBasicTitle'>
                <Form.Label className='font-weight-bold'>Study Title</Form.Label>

                {editMode ? (
                    <Form.Control
                        type='text'
                        placeholder='Enter title'
                        name='schoolTitle'
                        value={schoolTitle}
                        onChange={(e) => {
                            modifySchool(schoolIndex, e.target.name, e.target.value);
                        }}
                    />
                ) : (
                    <p>{schoolTitle}</p>
                )}
            </Form.Group>

            <Form.Row className='justify-content-between w-100 mr-0 ml-0'>
                <Form.Group controlId='formBasicDate'>
                    <Form.Label className='font-weight-bold'>Date of Study</Form.Label>

                    {editMode ? (
                        <Form.Control
                            type='date'
                            name='dateFrom'
                            value={dateFrom}
                            onChange={(e) => {
                                modifySchool(schoolIndex, e.target.name, e.target.value);
                            }}
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
                            name='dateTo'
                            value={dateTo}
                            onChange={(e) => {
                                modifySchool(schoolIndex, e.target.name, e.target.value);
                            }}
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

                {numberOfSchools > 1 && (
                    <Button variant='danger' onMouseDown={() => deleteSchool(schoolIndex)}>
                        Delete
                    </Button>
                )}
            </Form.Row>
        </Form>
    );
};

export default EducationForm;
