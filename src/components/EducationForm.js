import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/button';

export default class EducationForm extends Component {
    constructor(props) {
        super(props);

        this.updateSchool = this.updateSchool.bind(this);

        this.state = {
            editMode: true,
        };
    }

    updateSchool(schoolsArray, schoolIndex, propertyName, value) {
        const updatedSchools = [...schoolsArray];
        const { updateState, rootName } = this.props;

        updatedSchools[schoolIndex] = {
            ...updatedSchools[schoolIndex],
            [propertyName]: value,
        };

        updateState(rootName, {
            schools: updatedSchools,
        });
    }

    toggleEditMode() {
        this.setState((prevState) => ({
            editMode: !prevState.editMode,
        }));
    }

    render() {
        const { editMode } = this.state;
        const { schools, schoolIndex, modifySchool } = this.props;
        const { schoolName, schoolTitle, dateFrom, dateTo } = schools[schoolIndex];

        return (
            <Form className='mt-4' onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId='formBasicSchool'>
                    <Form.Label className='font-weight-bold'>School Name</Form.Label>
                    {editMode ? (
                        <Form.Control
                            type='text'
                            placeholder='Enter school name'
                            value={schoolName}
                            onChange={(e) => {
                                this.updateSchool(schools, schoolIndex, 'schoolName', e.target.value);
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
                            value={schoolTitle}
                            onChange={(e) => {
                                this.updateSchool(schools, schoolIndex, 'schoolTitle', e.target.value);
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
                                value={dateFrom}
                                onChange={(e) => {
                                    this.updateSchool(schools, schoolIndex, 'dateFrom', e.target.value);
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
                                value={dateTo}
                                onChange={(e) => {
                                    this.updateSchool(schools, schoolIndex, 'dateTo', e.target.value);
                                }}
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
                    {schools.length > 1 && (
                        <Button variant='danger' onMouseDown={() => modifySchool(schools, 'remove', schoolIndex)}>
                            Delete
                        </Button>
                    )}
                </Form.Row>
            </Form>
        );
    }
}
