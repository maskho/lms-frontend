import { rupiah } from "@/utils/currency";
import { Select, Button, Avatar, Badge } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove,
  editPage = false,
}) => {
  const children = [];
  for (let i = 50000; i <= 500000; i += 50000) {
    children.push(<Option key={i}>{rupiah(i)}</Option>);
  }
  return (
    <>
      {values && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="7"
              rows="7"
              value={values.description}
              className="form-control"
              onChange={handleChange}
              placeholder="You can write description using Markdown"
            />
          </div>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={values.paid}
                  onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Free</Option>
                </Select>
              </div>
            </div>

            {values.paid && (
              <div className="form-group">
                <Select
                  placeholder="Set course price"
                  defaultValue={500000}
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="keyword"
              className="form-control"
              placeholder="Keyword"
              value={values.keyword}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label className="btn btn-outline-secondary btn-block text-left">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
            {preview && (
              <Badge count="X" onClick={handleImageRemove} className="pointer">
                <Avatar width={200} src={preview} />
              </Badge>
            )}
            {editPage && values.image && (
              <Avatar width={200} src={values.image.Location} />
            )}
          </div>
          <div className="form-row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary"
                type="primary"
                loading={values.loading}
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & continue"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;
