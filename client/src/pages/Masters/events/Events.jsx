import React, { useState } from "react";
import axios from "axios";
import { uploadImages } from "../../../zustand/actions/commonActions";

export function FileUpload() {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = async (event) => {
    console.log("event", event);
    event.preventDefault();

    const formData = new FormData();
    formData.append("type", "event");
    formData.append("myFile", file);

    try {
      const response = await uploadImages(formData);

      console.log("File Uploaded", response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
