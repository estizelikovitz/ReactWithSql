import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import UpdatePerson from './UpdatePerson';
import axios from 'axios';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },

        isAdding: false,
        isLoading: true,
        isTableHidden: false,
        update:false
    }

    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, isLoading: false });
        });
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onAddClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.setState({ isLoading: true });
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isAdding: false,
                    isLoading: false
                });
            });
        });
    }
    onDeleteClick = p => {
        axios.post('/api/people/deleteperson', p).then(() => {
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isAdding: false,
                    isLoading: false
                });
            });


        });
    }
    onUpdateClick = p => {
        this.setState({ update: true, person:p});
    }
    onCancelClick = () => {
        this.setState({
            update: false,
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        });
    }
    onSaveClick = () => {
        axios.post('/api/people/updateperson', this.state.person).then(() => {
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isAdding: false,
                    isLoading: false,
                    update:false
                });
            })
        })
    }

    generateBody = () => {
        const { isLoading, people } = this.state;
        if (isLoading) {
            return <h1>Loading....</h1>
        }
        return people.map(p => <PersonRow person={p} key={p.id} onDeleteClick={() => this.onDeleteClick(p)} onUpdateClick={() => this.onUpdateClick(p)}/>);
    }

    render() {
        const { person, isAdding, isTableHidden,update } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <div className='container mt-5'>
                <PersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                />
                <div className='row'>
    
                    <div className='col-md-2'>
                        <button className='btn btn-primary' onClick={() => this.setState({ isTableHidden: true })}>Hide Table</button>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-danger' onClick={() => this.setState({ isTableHidden: false })}>Show Table</button>
                    </div>
                </div>
                {!isTableHidden && <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Button</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateBody()}
                    </tbody>
                </table>
                }
                {!!update && <div>
                    <UpdatePerson
                        firstName={this.state.person.firstName}
                        lastName={this.state.person.lastName}
                        age={this.state.person.age}
                        onTextChange={this.onTextChange}
                        onSaveClick={this.onSaveClick}
                        onCancelClick={this.onCancelClick}
                    />
                    </div>
                }
            </div>
        )
    }
}
export default PeopleTable;