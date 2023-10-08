import React from 'react';
import UploadVideo from "./components/UploadVideo";
import JobTable from "./components/JobTable";


const App = () => (
    <div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '48px'}}>
            <div style={{maxWidth: "900px", minWidth: '600px'}}>
                <UploadVideo/>
            </div>
        </div>

        <div style={{padding: '48px'}}>
            <JobTable/>
        </div>
    </div>
);

export default App;
