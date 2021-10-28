import React from 'react'

const UploadTemplate = () => {

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Upload Template</h1>
            <form className = "ui form" style={{width: '1000px', margin: '0 auto'}} onSubmit = {handleSubmit}>
                <label>Name of Form:</label>
                <input type="text" required /><br /><br />
                <label>Fields(Enter all the required fields seperated by a ,):</label>
                <input type="text" required /><br /><br />
                <label>Form Template:</label>
                <input type="file" required /><br /><br /><br />
                
                <input type="submit" className="ui button primary" value="Upload" />
            </form>
        </div>
    )
}

export default UploadTemplate