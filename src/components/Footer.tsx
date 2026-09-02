import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent text-sm text-center p-4 absolute bottom-0 left-0 pointer-events-auto">
      <div className="max-w-screen-lg mx-auto text-foreground/80 flex items-center justify-center gap-3">
        <img
          src="https://github.com/LouayeG.png?size=96"
          alt="LouayeG GitHub avatar"
          className="w-8 h-8 rounded-full object-cover border border-white/20"
        />
        <div>
          Made by <strong>LouayeG</strong>
          {' - '}
          <a
            href="https://github.com/LouayeG"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1 mr-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/louaye-gafaiti/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline ml-1"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
