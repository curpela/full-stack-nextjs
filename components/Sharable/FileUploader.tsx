import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

interface Props {
  children: any, 
  noClick?: boolean, 
  setThumbnail?: () => void, 
  preview: string[], 
  setPreview: (argo0: any) => void, 
  post: any, 
  setPost: (argo0: any) => void
}

const FileUploader: React.FC<Props> = ({children, noClick, setThumbnail, preview, setPreview, post, setPost}) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*, video/*',
    onDrop: acceptedFiles => {
      setPost({
        ...post, 
        media: [...post.media, ...acceptedFiles]
      })

      setPreview([...preview, ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))]);
      
    },

    noClick : noClick ? true : false
  });
  // useEffect(() => () => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   preview.forEach(file => URL.revokeObjectURL(file.preview));
  // }, [preview]);
  
  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        {children}
      {/* {thumbs} */}
     </div>
    </section>
  );
}


export default FileUploader;