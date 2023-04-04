import CourseCreateForm from "@/components/forms/CourseCreateForm";
import UpdateModuleForm from "@/components/forms/UpdateModuleForm";
import ProviderRoute from "@/components/routes/ProviderRoute";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, List, Modal } from "antd";
import Item from "antd/lib/list/Item";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import { toast } from "react-toastify";

const CourseEdit = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "50000",
    uploading: false,
    paid: true,
    keyword: "",
    loading: false,
    modules: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  useEffect(() => {
    if (router.isReady) {
      loadCourse();
    }
  }, [router.isReady]);

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
          console.log("Image uploaded", data);
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
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast("Course updated!");
    } catch (error) {
      toast(error.response.data);
    }
  };

  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allModules = values.modules;

    let movingItem = allModules[movingItemIndex];
    allModules.splice(movingItemIndex, 1);
    allModules.splice(targetItemIndex, 0, movingItem);

    setValues({ ...values, modules: [...allModules] });

    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast("Modules reordered successfully!");
    } catch (error) {
      toast(error.response.data);
    }
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allModules = values.modules;
    const removed = allModules.splice(index, 1);
    setValues({ ...values, modules: allModules });

    try {
      const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
      toast("Module deleted successfully!");
    } catch (error) {
      toast(error.response.data);
    }
  };

  const handleVideo = async (e) => {
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${values.provider._id}`,
        current.video
      );

      const file = e.target.files[0];
      setUploadVideoButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      videoData.append("courseId", values._id);

      const { data } = await axios.post(
        `/api/course/video-upload/${values.provider._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            setProgress(Math.round((100 * e.loaded) / e.total)),
        }
      );
      console.log(data);
      setCurrent({ ...current, video: data });
      setUploading(false);
    }
  };

  const handleUpdateModule = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/module/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video");
    setVisible(false);
    // setCourse(data);

    if (data.ok) {
      let arr = values.modules;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, modules: arr });
      toast("Module updated");
    }
  };
  return (
    <ProviderRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">Update Course Page</h1>
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
          editPage={true}
        />
      </div>
      <hr />
      <div className="row pb-5">
        <div className="col module-list">
          <h4>{values && values.modules && values.modules.length} Modules</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.modules}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger float-right"
                />
              </Item>
            )}
          />
        </div>
      </div>
      <Modal
        title="Update module"
        centered
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateModuleForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateModule={handleUpdateModule}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
          // handleVideoRemove={handleVideoRemove}
        />
      </Modal>
    </ProviderRoute>
  );
};

export default CourseEdit;
