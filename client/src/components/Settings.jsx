import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../apiBaseUrl.js';

const Settings = () => {
  const [arn, setArn] = useState('');
  const [currentArn, setCurrentArn] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('in useffect');
    fetch(`${getApiBaseUrl()}/getCurrentArn`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data.rows[0].role_arn);
        if (data.rows[0].role_arn !== null) {
          setCurrentArn(data.rows[0].role_arn);
        }
      });
    // console.log(result);
    // setCurrentArn(result);
  }, []);

  const addArn = (e) => {
    console.log('adding arn');
    let userData = { userARN: arn };
    fetch(`${getApiBaseUrl()}/setUserARN`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((result) => {
        console.log('this is result', result);
        setSuccess('User ARN successfully updated!');
      })
      .catch((err) => console.log(err));
    console.log('finished adding arn');
  };
  return (
    <div>
      <h2>Settings</h2>
      <p>Current Arn: {currentArn}</p>
      <p>
        Click{' '}
        <a href='https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?stackName=lambdaPulseDelegationRoleStack&param_ExternalId&templateURL=https://lambdapulse.s3.amazonaws.com/cloudFormation.yaml'>
          here
        </a>
        , create your stack, navigate to the outputs tab, and paste your ARN key
        into the field below!
      </p>
      <p style={{ color: 'red' }}>{success}</p>
      <form
        id='arn-form'
        onSubmit={(e) => {
          e.preventDefault();
          addArn(e);
        }}
      >
        <input
          type='text'
          onChange={(e) => setArn(e.target.value)}
          placeholder='ARN Key'
        />
        <button id='arn-button' type='submit'>
          Set ARN
        </button>
      </form>
    </div>
  );
};

export default Settings;
