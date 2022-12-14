import { AiFillStar } from 'react-icons/ai';

const Message = ({ children, description, username }) => {
  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg my-10 hover:shadow-xl duration-1000">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-yellow-400">
            <AiFillStar size={27}/>
          </div>
          <div className="mt-1">
            <h2 className="font-semibold text-2xl text-gray-700 font-medium">Statement</h2>
          </div>
        </div>
      </div>

      <div className="py-4">
        <p className="text-gray-700 font-medium text-l whitespace-pre-line break-words">{description}</p>
      </div>
      <div className="text-gray-700">
        <p className="font-medium text-sm">{children}</p>
      </div>
    </div>
  );
}

export default Message;
