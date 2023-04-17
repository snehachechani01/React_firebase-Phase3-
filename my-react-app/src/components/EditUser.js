import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
        .get(`http://localhost:80/Phase3/phase-backed/index.php/${id}`)
        .then(function (response) {
          console.log(response.data);
          setInputs(response.data[0]);
          /*console.log(inputs);*/
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = validationForm();
    if (valid) {
      axios
          .put(`http://localhost:80/Phase3/phase-backed/index.php/${id}/edit`, inputs)
          .then(function (response) {
            console.log(response.data);
            navigate('/ListUser');
          })
          .catch(function (error) {
            console.log(error);
          });
    } else {
      console.log(error);
    }
  };

  const validationForm = () => {
    const { name, mobile, email } = inputs;

    // Name regex for testing name
    let nameReg = /^[A-Za-z\s]+$/;

    // Email regex for testing email
    let emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Mobile regex for testing mobile number
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
  };

  return (
      <>
        <div className={'title'}><h2>Update Contact Us</h2></div>
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
                             value={inputs.name}
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
                             value={inputs.mobile}
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
                             value={inputs.email}
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
                      <button className={'submit-button'} type="submit">Update</button>
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

export default EditUser