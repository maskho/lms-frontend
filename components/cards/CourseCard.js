import { rupiah } from "@/utils/currency";
import { Badge, Card } from "antd";
import Link from "next/link";

const CourseCard = ({ course }) => {
  const { name, provider, price, image, slug, paid, keyword } = course;

  return (
    <Link href={`/course/${slug}`}>
      <Card
        className="mb-4"
        cover={
          <img
            src={image.Location}
            alt={name}
            style={{ height: "200px", objectFit: "cover" }}
            className="p-1"
          />
        }
      >
        <h2 className="font-weight-bold">{name}</h2>
        <p>by {provider.name}</p>
        <Badge
          count={keyword}
          style={{ backgroundColor: "blue" }}
          className="pb-2 mr-2"
        />
        <h4 className="pt-2">{paid ? rupiah(price) : "Free"}</h4>
      </Card>
    </Link>
  );
};

export default CourseCard;
