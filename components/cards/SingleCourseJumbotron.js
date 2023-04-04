import { rupiah } from "@/utils/currency";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import ReactPlayer from "react-player";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const {
    name,
    description,
    provider,
    updatedAt,
    modules,
    image,
    price,
    paid,
    keyword,
  } = course;

  return (
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          <h1 className="text-light font-weight-bold">{name}</h1>
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          <Badge
            count={keyword}
            style={{ backgroundColor: "green" }}
            className="pb-4 mr-2"
          />
          <p>Created by {provider.name}</p>
          <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
          <h4 className="text-light">{paid ? rupiah(price) : "Free"}</h4>
        </div>
        <div className="col-md-4">
          {modules[0].video && modules[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(modules[0].video.Location);
                setShowModal(true);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={modules[0].video.Location}
                light={image.Location}
                width={"100%"}
                height={"225px"}
              />
            </div>
          ) : (
            <>
              <img src={image.Location} alt={name} className="img img-fluid" />
            </>
          )}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="primary"
              danger
              block
              shape="round"
              icon={<SafetyOutlined />}
              size="large"
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? "Go to course"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleCourseJumbotron;
