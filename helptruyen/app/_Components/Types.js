"use client";


function Type({ children, edit, id, onDelete }) {
  
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-blue-50 text-white-50 rounded-4xl py-1 px-2 text-[16px] ">
          {children}
        </div>
       
  
      </div>
    </>
  );
}

export default Type;
