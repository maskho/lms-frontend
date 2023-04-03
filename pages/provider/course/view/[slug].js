import AddModuleForm from "@/components/forms/AddModuleForm";
import ProviderRoute from "@/components/routes/ProviderRoute";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Modal, Tooltip } from "antd";
import Item from "antd/lib/list/Item";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/module/${slug}/${course.provider._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });
      setVisible(false);
      setUploadButtonText("Upload Video");
      setCourse(data);
      toast("Module added");
    } catch (error) {
      console.log(error);
      toast("Module add failed");
    }
  };

  const handleVideo = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      setUploadButtonText(file.name);

      const videoData = new FormData();
      videoData.append("video", file);

      const { data } = await axios.post(
        `/api/course/video-upload/${course.provider._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (error) {
      console.log(error);
      toast("Video upload failed.");
      setUploading(false);
    }
  };

  const handleVideoRemove = async (e) => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.provider._id}`,
        values.video
      );

      console.log(data);
      setValues({ ...values, video: {} });
      setProgress(0);
      setUploadButtonText("Upload another video");
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast("Video remove failed");
    }
  };

  return (
    <ProviderRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.jpg"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.modules && course.modules.length} Modules
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="d-flex pt-4">
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() =>
                          router.push(`/provider/course/edit/${slug}`)
                        }
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>
                    <Tooltip title="Publish">
                      <CheckOutlined className="h5 pointer text-danger" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <ReactMarkdown children={course.description} />
              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Module
              </Button>
            </div>
            <br />

            <Modal
              title="+ Add Module"
              centered
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddModuleForm
                values={values}
                setValues={setValues}
                handleAddModule={handleAddModule}
                uploading={uploading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col module-list">
                <h4>
                  {course && course.modules && course.modules.length} Modules
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.modules}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      />
                    </Item>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ProviderRoute>
  );
};

export default CourseView;
