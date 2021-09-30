import React from 'react';
import { useHistory } from 'react-router-dom';

const NoFoundComponent = () => {
    let history = useHistory();
        setTimeout(() => {
            history.push("/")
      }, 500)

        return(
            <>
                <p>Not Found</p>
            </>
        )
}
export default NoFoundComponent