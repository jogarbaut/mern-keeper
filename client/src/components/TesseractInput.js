import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

import Form from 'react-bootstrap/Form'

const TesseractInput = ({body, setBody}) => {
  const [imageFile, setImageFile] = useState("")

  useEffect(() =>{
    if (imageFile) {
      Tesseract.recognize(
        imageFile,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        setBody(text)
      })
    }
  }, [imageFile])


  return (
    <>
      <Form.Group>
        <label className="imageFileInput">
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
          <span className="material-symbols-outlined">auto_stories</span>
        </label>
      </Form.Group>
    </>
  )
}

export default TesseractInput