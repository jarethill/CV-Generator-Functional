import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const STATES = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
};

const GeneralInformation = ({ updateInformation }) => {
    const [editMode, setEditMode] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => {
        const updatedInformation = {
            firstName,
            lastName,
            addressOne,
            addressTwo,
            city,
            state,
            zip,
        };

        updateInformation('GeneralInformation', updatedInformation);
    }, [addressOne, addressTwo, city, firstName, lastName, state, updateInformation, zip]);

    return (
        <Container id='general' className='mt-5' as='section' style={{ maxWidth: '650px' }}>
            <h2 className='text-center'>General Information</h2>

            <Form className='mt-4' onSubmit={(e) => e.preventDefault()}>
                <Form.Row className='justify-content-between w-100 mr-0 ml-0'>
                    <Form.Group as='div' controlId='formGridFirstName' style={{ width: '48%' }}>
                        <Form.Label className='font-weight-bold'>First Name</Form.Label>
                        {editMode ? (
                            <Form.Control
                                type='text'
                                placeholder='Enter first name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        ) : (
                            <p>{firstName}</p>
                        )}
                    </Form.Group>
                    <Form.Group as='div' controlId='formGridLastName' style={{ width: '48%' }}>
                        <Form.Label className='font-weight-bold'>Last Name</Form.Label>
                        {editMode ? (
                            <Form.Control
                                type='text'
                                placeholder='Enter last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        ) : (
                            <p>{lastName}</p>
                        )}
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId='formGridAddress1'>
                    <Form.Label className='font-weight-bold'>Address</Form.Label>
                    {editMode ? (
                        <Form.Control
                            placeholder='1234 Main St'
                            value={addressOne}
                            onChange={(e) => setAddressOne(e.target.value)}
                        />
                    ) : (
                        <p>{addressOne}</p>
                    )}
                </Form.Group>

                <Form.Group controlId='formGridAddress2'>
                    <Form.Label className='font-weight-bold'>Address 2</Form.Label>
                    {editMode ? (
                        <Form.Control
                            placeholder='Apartment, studio, or floor'
                            value={addressTwo}
                            onChange={(e) => setAddressTwo(e.target.value)}
                        />
                    ) : (
                        <p>{addressTwo}</p>
                    )}
                </Form.Group>

                <Form.Row className='justify-content-between w-100 mr-0 ml-0'>
                    <Form.Group as='div' controlId='formGridCity' style={{ width: '65%' }}>
                        <Form.Label className='font-weight-bold'>City</Form.Label>
                        {editMode ? (
                            <Form.Control
                                value={city}
                                placeholder='Enter city'
                                onChange={(e) => setCity(e.target.value)}
                            />
                        ) : (
                            <p>{city}</p>
                        )}
                    </Form.Group>

                    <Form.Group as='div' controlId='formGridState'>
                        <Form.Label className='font-weight-bold'>State</Form.Label>
                        {editMode ? (
                            <Form.Control
                                as='select'
                                value={state !== '' ? state : 'Select...'}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option disabled>Select...</option>
                                {Object.keys(STATES).map((st) => {
                                    return <option key={st}>{st}</option>;
                                })}
                            </Form.Control>
                        ) : (
                            <p>{state}</p>
                        )}
                    </Form.Group>

                    <Form.Group as='div' controlId='formGridZip'>
                        <Form.Label className='font-weight-bold'>Zip</Form.Label>
                        {editMode ? (
                            <Form.Control
                                value={zip}
                                placeholder='Enter zip'
                                onChange={(e) => setZip(e.target.value)}
                            />
                        ) : (
                            <p>{zip}</p>
                        )}
                    </Form.Group>
                </Form.Row>

                <Button variant={editMode ? 'info' : 'secondary'} onMouseDown={() => setEditMode(!editMode)}>
                    {editMode ? 'Submit' : 'Edit'}
                </Button>
            </Form>
        </Container>
    );
};

export default GeneralInformation;
