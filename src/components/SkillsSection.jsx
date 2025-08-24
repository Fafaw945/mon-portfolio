import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";

const SkillsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Mes Compétences Techniques</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center space-y-2">
          <FaHtml5 className="text-orange-600 text-8xl" />
          <span>HTML5</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaCss3Alt className="text-blue-600 text-8xl" />
          <span>CSS3</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaJsSquare className="text-yellow-400 text-8xl" />
          <span>JavaScript</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaReact className="text-sky-400 text-8xl" />
          <span>React</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <FaNodeJs className="text-green-600 text-8xl" />
          <span>Node.js</span>
        </div>
      </div>
      {/* Tu peux rajouter des descriptions, animations ou autres sections ici */}
    </div>
  );
};

export default SkillsPage;
