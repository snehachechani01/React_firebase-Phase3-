import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(values => ({...values, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await validationForm();
    if (valid) {
      axios.post("http://localhost:80/Phase3/phase-backed/index.php", formData)
          .then(function (response) {
            console.log(response.data);
            navigate('/ListUser');
          });
    } else {
      console.log(error);
    }
  }

  const validationForm = () => {
    const { name, mobile, email } = formData;

    let nameReg = /^[A-Za-z\s]+$/;
    let emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    let mobileReg = /^[0-9]{10}$/;

    if (!nameReg.test(name)) {
      setError('Name not valid!!!');
      return false;
    }

    if (!emailReg.test(email)) {
      setError('Email not valid!!!');
      return false;
    }

    if (!mobileReg.test(mobile)) {
      setError('Mobile number not valid!!!');
      return false;
    }

    return true;
  }

  return (
      <>
        <div className={'title'}><h2>Contact Us</h2></div>
        <div className="container">
          <div className="form-div">
            <form onSubmit={handleSubmit}>
              <div className="table-div">
                <table cellSpacing="10">
                  <tbody>
                  <tr>
                    <th>
                      <label className={'label-text'}>Name :</label>
                    </th>
                    <td>
                      <input type="text" name="name"
                             className={'input-field'}
                             onChange={handleChange}
                             required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label className={'label-text'}>Mobile :</label>
                    </th>
                    <td>
                      <input type="number" name="mobile"
                             className={'input-field'}
                             onChange={handleChange}
                             required
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label className={'label-text'}>Email :</label>
                    </th>
                    <td>
                      <input type="email" name="email"
                             className={'input-field'}
                             onChange={handleChange}
                             required
                      />
                    </td>
                  </tr>
                  {error && (
                      <tr>
                        <td colSpan="2" className={'error-text'}>
                          {error}
                        </td>
                      </tr>
                  )}
                  <tr>
                    <td colSpan="2" align="right">
                      <button className={'submit-button'} type="submit">Submit</button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </>
  )
}

export default CreateUser;