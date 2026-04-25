import React from "react";

interface AdsterraBannerProps {
  className?: string;
}

// Adsterra 728x90 banner. Rendered inside an isolated <iframe srcdoc=...> so
// the script's global `atOptions` does not collide if multiple banners share
// a page, and so the ad can never break the host React tree.
const SRC_DOC = `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  html,body{margin:0;padding:0;background:transparent;}
  body{display:flex;align-items:center;justify-content:center;}
</style>
</head>
<body>
<script type="text/javascript">
  atOptions = {
    'key' : '21fc2a87277a3f1a11b4bae6ebe8e4ae',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://shorteroverflowmartyr.com/21fc2a87277a3f1a11b4bae6ebe8e4ae/invoke.js"></script>
</body></html>`;

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ className = "" }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <iframe
        title="Sponsored"
        srcDoc={SRC_DOC}
        width={728}
        height={90}
        scrolling="no"
        frameBorder={0}
        style={{ border: 0, maxWidth: "100%" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};
