import { useState } from "react";
import "./CreateCompany.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../api/cloudinary";
import { createCompany } from "../../api/company";
import Resizer from "react-image-file-resizer";
import {Avatar} from "antd";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [ctc, setCtc] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState({});

  const handleUploadImage = (e) => {
    let files = e.target.files; // 3

    if (files) {
        Resizer.imageFileResizer(
          files[0],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            // console.log(uri);
            uploadImage(uri).
            then(res => {
              setImage(res.data);
            })
            .catch(err => console.log(err));
          },
          "base64"
        );
    }
    
  };

  const handleSubmit = () => {
    let url=image.url;
    createCompany({name,ctc,companyType,info,url})
    .then(res => {
      console.log(res.data);
    })
    .catch(err =>  console.log(err));
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="form shadow-lg p-4 mt-4">
              <h2 className="text-center">Create Company</h2>
              <input
                type="text"
                placeholder="Company Name"
                className="m-2 mb-4 form-control"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="CTC"
                className="m-2 mb-4 form-control"
                onChange={(e) => setCtc(e.target.value)}
              />
              <select
                className="form-select form-select-sm form-control mb-4 m-2"
                aria-label=".form-select-sm example"
                onChange={(e) => setCompanyType(e.target.value)}
              >
                <option value="Service Based IT">Service Based IT</option>
                <option value="Product Based IT">Product Based IT</option>
                <option value="Semiconductors">Semiconductors</option>
              </select>
              <ReactQuill
                className="m-2"
                theme="snow"
                value={info}
                onChange={setInfo}
              />
              <button className="btn btn-secondary btn-block mt-4" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="selectImageDiv shadow-lg mt-4 p-4">
              <input
                className="btn btn-secondary btn-block"
                type="file"
                accept="images/*"
                onChange={handleUploadImage}
              />
              {
                image.url && 
                <Avatar key={image.public_id} shape="square" src={image.url} size={70} className="m-3" />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCompany;
