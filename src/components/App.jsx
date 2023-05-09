import React, { Component } from 'react';
import { ContactForm } from './contactForm/ContactForm';
import { ContactsList } from './contactsList/ContactsList';
import { Filter } from './filter/Filter';
import toast, { Toaster } from 'react-hot-toast';
import css from './APP.module.css';

 const LS_KEY = 'Contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

 
  
   componentDidMount() {
    const savedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      this.setState(() => ({ contacts: parsedContacts }));
    }
  }

  componentDidUpdate(_, prevState) {
    const prevContacts = prevState.contacts;
    const currentContacts = this.state.contacts;
    if (prevContacts !== currentContacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(currentContacts));
    }
  }

  formSubmitHandler = data => {
    console.log(data);
  };
  handleAddContact = contact => {
    if (this.state.contacts.some(item => item.name === contact.name)) {
      toast.error('Contact already exists');
      return true;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
    return false;
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  handleFilterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
    return (
      <div className={css.wraper}>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.formSubmitHandler}
          addContact={this.handleAddContact}
        />
        <Filter
          value={this.state.filter}
          handleChange={this.handleChangeFilter}
        />
        <h2>Contacts</h2>
        <ContactsList
          contacts={this.handleFilterContacts()}
          deleteContact={this.handleDeleteContact}
        />
        <Toaster />
      </div>
    );
  }
}
