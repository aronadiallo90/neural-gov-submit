import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="neural-bg min-h-screen flex items-center justify-center">
      <div className="holographic rounded-lg p-8 text-center max-w-md mx-4">
        <h1 className="mb-4 text-4xl font-bold text-primary font-heading glitch-text">
          <i className="fas fa-exclamation-triangle icon-3d mr-3"></i>
          404
        </h1>
        <p className="mb-6 text-xl text-foreground">Page non trouvée</p>
        <p className="mb-6 text-muted-foreground">
          La page que vous cherchez n'existe pas dans l'univers Gov'athon.
        </p>
        <a 
          href="/" 
          className="btn-futuristic inline-block text-decoration-none"
        >
          <i className="fas fa-home mr-2"></i>
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
