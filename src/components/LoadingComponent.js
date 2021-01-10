import React from 'react';

const Loading = ({children}) => {
	console.log({children})
    return(
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
            <p>{children}</p>
        </div>
    );
};
export default Loading;
/*
flex: for sizing :
flex-basisi: like width
*/