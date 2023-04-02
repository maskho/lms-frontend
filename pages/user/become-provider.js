import { Context } from "@/context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const BecomeProvider = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/make-provider", { email }).then((res) => {
        toast.success(
          `Add provider success. Please instruct ${res.data.name} to logout and login again.`
        );
      });
      setEmail("");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-5 mb-4 bg-primary bg-gradient rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">Add Provider Page</h1>
        </div>
      </div>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!email || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BecomeProvider;
