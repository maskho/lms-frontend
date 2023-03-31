import UserRoute from "@/components/routes/UserRoute";
import { Context } from "@/context";
import { useContext } from "react";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <div className="p-5 mb-4 bg-primary bg-gradient rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">
            <pre>{JSON.stringify(user, null, 4)}</pre>
          </h1>
        </div>
      </div>
    </UserRoute>
  );
};

export default UserIndex;
