import ProviderRoute from "@/components/routes/ProviderRoute";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProviderIndex = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/provider-courses");
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <ProviderRoute>
      <div className="p-5 mb-4 jumbotron rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">
            Provider Dashboard Page
          </h1>
        </div>
      </div>
      {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.jpg"}
              />
              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={`/provider/course/view/${course.slug}`}
                      className="pointer mt-2 text-primary"
                    >
                      <h5 className="pt-2">{course.name}</h5>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.modules.length} Modules
                    </p>
                    {course.modules.length < 1 ? (
                      <p style={myStyle} className="text-warning">
                        At least 1 modules are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-success">
                        Your course is alive
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <CloseCircleOutlined className="h5 pointer text-warning" />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </ProviderRoute>
  );
};

export default ProviderIndex;
