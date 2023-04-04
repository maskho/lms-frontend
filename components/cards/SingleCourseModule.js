import { Avatar, List } from "antd";
import Item from "antd/lib/list/Item";

const SingleCourseModule = ({
  modules,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col module-list">
            {modules && <h4>{modules.length} Modules</h4>}
            <hr />
            <List
              itemLayout="horizontal"
              dataSource={modules}
              renderItem={(item, index) => (
                <Item>
                  <Item.Meta
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                  />
                  {item.video && item.video !== null && item.free_preview && (
                    <span
                      className="text-primary pointer"
                      onClick={() => {
                        setPreview(item.video.Location);
                        setShowModal(!showModal);
                      }}
                    >
                      Preview
                    </span>
                  )}
                </Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCourseModule;
