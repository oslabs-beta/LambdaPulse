import { useEffect, useState } from 'react';

const Settings = () => {
    const [arn, setArn] = useState('');
    
    const addArn = (e) => {
        
        return;
    }
    return (
        <div>
            <h2>Settings</h2>
            <p>Current Arn: {arn}</p>
            <p>Click <a href='https://console.aws.amazon.com/cloudformation/home?#/stacks/quickcreate?stackName=lambdaPulseDelegationRoleStack&param_ExternalId&templateURL=https://lambdapulse.s3.amazonaws.com/cloudFormation.yaml'>
                here</a>, create your stack, navigate to the outputs tab, and paste your ARN key into the field below!</p>
            <form
              id='arn-form'
              onSubmit={(e) => {
                e.preventDefault()
                addArn(e);
              }}
            >
                <input 
                type='text'
                onChange={(e) => setArn(e.target.value)}
                placeholder='ARN Key'
                />
                <button 
                id='arn-button'
                type='submit'>
                  Set ARN
                </button>

            </form>

        </div>
    )

}

export default Settings;