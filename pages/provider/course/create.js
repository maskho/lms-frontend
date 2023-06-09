import CourseCreateForm from "@/components/forms/CourseCreateForm";
import ProviderRoute from "@/components/routes/ProviderRoute";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import FileResizer from "react-image-file-resizer";
import { toast } from "react-toastify";

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "50000",
    uploading: false,
    paid: true,
    keyword: "",
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    FileResizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          let { data } = await axios.post("/api/course/upload-image", {
            image: uri,
          });
          console.log("Image uploaded", uri);
          setImage(data);
          setValues({ ...values, loading: false });
        } catch (error) {
          console.log(error);
          setValues({ ...values, loading: false });
          new TransformStream("Image uplaod failed. Try again later.");
        }
      }
    );
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (error) {
      console.log(error);
      setValues({ ...values, loading: false });
      toast("Image uplaod failed. Try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/course", {
        ...values,
        image,
      });
      toast("Great! Now you can start adding modules");
      router.push("/provider");
    } catch (error) {
      toast(error.response.data);
    }
  };

  return (
    <ProviderRoute>
      <div className="p-5 mb-4 jumbotron rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">Create Course Page</h1>
        </div>
      </div>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
        />
      </div>
    </ProviderRoute>
  );
};

export default CourseCreate;
