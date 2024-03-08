// practicing createContext 
// import { createContext } from "react";

// const TextContext =createContext('');

// const ChildB = () => {
//   return (
//     <div>
//       <h1> child b</h1>

//       <TextContext.Consumer>
//         {anyContent => <p>{anyContent}</p>}
//       </TextContext.Consumer>
//     </div>
//   )
// }

// const Gparent = () => {
//   return (
//     <TextContext.Provider value="this value is passed">
//       <ChildB/>
//     </TextContext.Provider>
//   )
// }

const SideFeatures = () => {
  return (
    <div className="md:w-[30%] w-full p-2">
      <h2 className="h-[100px] w-full bg-white shadow-sm shadow-white rounded-sm mb-2">
        Become a Member
      </h2>
      {/* <Gparent /> */}
      {[
        { key: 1, content: "Helpfull websites" },
        { key: 2, content: "Helpfull websites" },
        { key: 3, content: "Helpfull websites" },
      ].map(({ key,content }) => (
        <div key={key} className="h-[100px] w-full bg-white ring-0 shadow-sm shadow-white rounded-sm mt-2">
          <h2>{content}</h2>
        </div>
      ))}
    </div>
  );
};



export default SideFeatures;
