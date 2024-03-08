import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const UserInteraction = () => {
  const { messageOpen } = useSelector((state) => state.domStatus);
  return (
   
    <div className={`md:w-[60%] min-h-screen md:flex justify-center items-center ${messageOpen ? 'w-[100%] mobile-flex' : 'w-[0%] mobile-hidden'}`}>
      <Link to='/messages/ai' className="text-homegreen pointer-cursor px-3 py-2 border-2 border-homegreen rounded hover:bg-white">Quick Chat - AI</Link>
    </div>
  );
};
export default UserInteraction;
