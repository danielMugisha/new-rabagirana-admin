import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TextEditor = (handleChange) => {
    
  return (
    <div>
      <Editor
      apiKey='wvg3xm3sog3b04e0m2ahy1g15n7s70whihvq83f9k9ucu4sl'
          initialValue=""
          init={{
            branding: false,
            height: 300,
            menubar: true,
            plugins:
              "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
            toolbar:
              "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
            image_advtab: true
          }}
          onChange={handleChange}
        />
    </div>
  )
}

export default TextEditor
