import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => {
  console.log('da4425dbc98c46059145b67131433001');
  const { onInputChange, onButtonSubmit } = props;
  return (
    <div>
      <p className='f3'>
        {'Detect face in your pictures'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input type='text' className='f4 p2 w-70 center' onChange={onInputChange} />
          <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;