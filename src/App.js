import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);

  const handleRoleChange = (e) => {
    const { value } = e.target;
    if (roles.includes(value)) {
      setRoles(roles.filter(role => role !== value));
    } else {
      setRoles([...roles, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users', { full_name: fullName, email, roles });
      alert('User saved successfully!');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Roles:</label>
          <div>
            <label><input type="checkbox" value="Author" onChange={handleRoleChange} /> Author</label>
            <label><input type="checkbox" value="Editor" onChange={handleRoleChange} /> Editor</label>
            <label><input type="checkbox" value="Subscriber" onChange={handleRoleChange} /> Subscriber</label>
            <label><input type="checkbox" value="Administrator" onChange={handleRoleChange} /> Administrator</label>
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
