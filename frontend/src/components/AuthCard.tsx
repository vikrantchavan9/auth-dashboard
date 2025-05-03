const AuthCard = ({ title, children }) => (
     <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
       <h2 className="text-2xl font-semibold text-black mb-6">{title}</h2>
       {children}
     </div>
   );
   
   export default AuthCard;
   