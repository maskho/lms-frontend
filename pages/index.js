// import CourseCard from "@/components/cards/CourseCard";
import dynamic from "next/dynamic";
const CourseCard = dynamic(() => import("@/components/cards/CourseCard"), {
  ssr: false,
});
import { Card } from "antd";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = ({ courses }) => {
  return (
    <>
      <div className="p-5 mb-4 bg-primary bg-gradient rounded-0">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-center">Lelero LMS</h1>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);

  return {
    props: {
      courses: data,
    },
  };
}

export default Home;
