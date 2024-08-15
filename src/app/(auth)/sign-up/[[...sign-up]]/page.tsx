import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="z-10">
        <SignUp />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000"
            fill-opacity="1"
            d="M0,96L34.3,133.3C68.6,171,137,245,206,250.7C274.3,256,343,192,411,176C480,160,549,192,617,176C685.7,160,754,96,823,74.7C891.4,53,960,75,1029,122.7C1097.1,171,1166,245,1234,256C1302.9,267,1371,213,1406,186.7L1440,160L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
