// components/Container.jsx
import "./Container.scss";
const Container = ({ children, className = "" }) => {
    return (
      <div className={`custom-container ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Container;