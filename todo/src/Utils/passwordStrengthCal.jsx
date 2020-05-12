import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import * as zxcvbn from 'zxcvbn';

export default class PasswordStrengthCal extends React.Component {
    render(){
        const { password } = this.props;
        const testedResult = zxcvbn(password);
        return(
            <div>
                <ProgressBar variant="success" animated min={0} max={4} now={testedResult.score}/>
            </div>
        )
    }
}