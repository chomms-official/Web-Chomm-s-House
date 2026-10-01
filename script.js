const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(
  'className={py-6 flex flex-col items-center justify-center rounded-2xl transition-all',
  'className={p-2 flex flex-col items-center justify-center rounded-2xl transition-all h-full min-h-[140px]'
);

content = content.replace(
  "{pkg === '?????' && <div className=\"w-8 h-8 rounded border border-stone-200 mb-2 flex items-center justify-center text-[8px]\">LOGO</div>}",
  "{pkg === '?????' && <img src=\"/Web-Chomm-s-House/images/packaging-clear.png\" className=\"w-full h-full object-cover mix-blend-multiply rounded-xl\" alt=\"?????\" />}"
);

content = content.replace(
  "{pkg === '???????' && <div className=\"w-8 h-8 rounded border border-stone-200 mb-2 transform rotate-45 scale-75\"></div>}",
  "{pkg === '???????' && <img src=\"/Web-Chomm-s-House/images/packaging-organza.png\" className=\"w-full h-full object-cover mix-blend-multiply rounded-xl\" alt=\"???????\" />}"
);

content = content.replace(
  "{pkg === '????????????' && <div className=\"w-8 h-6 rounded bg-stone-700 mb-2\"></div>}",
  "{pkg === '????????????' && <img src=\"/Web-Chomm-s-House/images/packaging-box.png\" className=\"w-full h-full object-cover mix-blend-multiply rounded-xl\" alt=\"????????????\" />}"
);

content = content.replace(
  "<span className=\"text-xs font-medium\">{pkg}</span>",
  ""
);

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
