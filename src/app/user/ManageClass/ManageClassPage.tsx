import { PageContainer } from "../../../lib/styled/Container.styled";
import ClassComponent from "./components/ClassComponent";
import BackgroundImage from "/people-bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function ManageClassPage() {
  return (
    <PageContainer>
      <div
        className="relative px-4 py-8 min-h-[200px] bg-cover bg-center bg-no-repeat text-white rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url(${BackgroundImage})`,
        }}
      >
        <h1 className="pl-4 text-2xl font-bold border-l-4 border-blue-400">
          Manage Class List
        </h1>
        <div className="m-2 absolute bottom-0 right-0 bg-black/40 text-white font-bold text-lg">
          Image by{" "}
          <a href="https://www.freepik.com/free-vector/hand-drawn-youth-people-pattern_4799016.htm#page=2&query=people%20pattern&position=6&from_view=keyword&track=ais">
            Freepik
          </a>
        </div>
      </div>
      <div className="my-8 [&>*]:mb-4">
        <div className="w-full h-[110px] text-3xl flex justify-center items-center shadow-md shadow-black/30 rounded-lg transition-all ease duration-500 hover:bg-black/5">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <ClassComponent
          name="CIS-281"
          desc="System Analy/Des: Application"
          studentCount="10"
          deckCount="2"
        />
        <ClassComponent
          name="SCI-101"
          desc="Geology"
          studentCount="20"
          deckCount="15"
        />
      </div>
    </PageContainer>
  );
}
