/* ═══════════════════════════════════════════════════════════
   PROFESSIONAL CV (PDF) — generated in the browser with jsPDF
   Edit CV_DATA below to change anything on the PDF.
   ═══════════════════════════════════════════════════════════ */
const CV_DATA = {
  name: 'EYOB SISAY ABAY',
  title: 'Anesthesia Student · Software Developer',
  org: 'Department of Anesthesia',
  school: 'Wollo University',
  photo: 'eyobe.jpg',                     // falls back to initials if missing
  initials: 'EA',
  contact: [
    ['Email', 'jobaje1557@gmail.com'],
    ['Phone', '0955773470'],
    ['Location', 'North Shoa, Ethiopia'],
    ['Portfolio', () => window.location.href.split('#')[0]],
  ],
  summary: 'Dual-field professional combining clinical precision in anesthesia with modern software engineering. Currently a second-year Anesthesia student at Wollo University, building production-quality web and mobile applications with React, TypeScript and Flutter. Passionate about safe, systematic care and accessible, well-engineered digital products. Time split: 55% anesthesia, 45% web development.',
  education: [
    ['Anesthesia Program (2nd Year)', 'Wollo University, Department of Anesthesia', 'Present'],
    ['Software Engineering (Self-taught)', 'Online courses, open-source projects & freelance work', '2021 – Present'],
  ],
  experience: [
    ['Anesthesia Student / Professional', 'Clinical rotations: General, Obstetric, Orthopaedic and Emergency anesthesia', '2022 – Present'],
    ['Freelance Software Architect', 'Frontend architecture, component libraries and clinical tools for clients', '2023 – Present'],
    ['Mobile Application Developer', 'Cross-platform apps with Flutter and React Native', '2022 – 2023'],
    ['Junior Web Developer', 'Responsive websites and UI implementation', '2021 – 2022'],
  ],
  anesthesia: [
    'Airway management: direct / video laryngoscopy, LMA insertion, RSI protocols',
    'Regional anesthesia: spinal, epidural and peripheral nerve blocks',
    'Pharmacology: propofol, ketamine, fentanyl, NMBA management, reversal agents',
    'Monitoring: ECG, SpO2, EtCO2, BIS and invasive monitoring',
    'Emergency protocols: MH, CICO, anaphylaxis, LAST, cardiac arrest',
  ],
  skills: [
    ['Frontend', 'React 18, TypeScript, Next.js 14, CSS / Sass, WebGL'],
    ['Backend', 'Node.js, PostgreSQL, GraphQL, REST APIs'],
    ['Mobile', 'Flutter, React Native, Expo'],
    ['DevOps', 'Docker, AWS, GitHub Actions, CI/CD'],
    ['Design', 'Figma, Design Systems, UI / UX, WCAG 2.2 AA'],
  ],
  languages: [['Amharic', 'Native'], ['English', 'Professional']],
};

/* load + square-crop the photo to a data URL (null on failure) */
function cvLoadPhoto(src){
  return new Promise(res=>{
    const img=new Image();
    img.onload=()=>{
      try{
        const s=Math.min(img.naturalWidth,img.naturalHeight),c=document.createElement('canvas');
        c.width=c.height=320;
        c.getContext('2d').drawImage(img,(img.naturalWidth-s)/2,(img.naturalHeight-s)*0.1,s,s,0,0,320,320);
        res(c.toDataURL('image/jpeg',.9));
      }catch(e){res(null);}
    };
    img.onerror=()=>res(null);
    img.src=src;
  });
}

function buildCvPdf(jsPDF, photo){
  const D=CV_DATA, doc=new jsPDF({unit:'pt',format:'a4'});
  const W=595.28,H=841.89,M=48,CW=W-2*M,BOT=H-62;
  const BLUE=[11,90,168],GOLD=[201,162,39],NAVY=[16,42,84],INK=[28,36,52],MUTE=[110,122,142],LINE=[221,227,236],CARD=[243,246,251];
  const now=new Date();
  const ymd=now.getFullYear()+String(now.getMonth()+1).padStart(2,'0')+String(now.getDate()).padStart(2,'0');
  const ref='EYB-CV-'+ymd+'-'+Math.random().toString(16).slice(2,6).toUpperCase();
  const dateStr=now.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  const col=c=>doc.setTextColor(c[0],c[1],c[2]);
  const fill=c=>doc.setFillColor(c[0],c[1],c[2]);
  const stroke=c=>doc.setDrawColor(c[0],c[1],c[2]);
  let y=0;

  function topBar(){fill(BLUE);doc.rect(0,0,W*0.72,9,'F');fill(GOLD);doc.rect(W*0.72,0,W*0.28,9,'F');}
  function avatar(x,yy,s){
    if(photo){doc.addImage(photo,'JPEG',x,yy,s,s);stroke(LINE);doc.setLineWidth(.8);doc.roundedRect(x,yy,s,s,6,6,'S');}
    else{fill(NAVY);doc.roundedRect(x,yy,s,s,6,6,'F');col([255,255,255]);doc.setFont('helvetica','bold');doc.setFontSize(s*.36);doc.text(D.initials,x+s/2,yy+s*.62,{align:'center'});}
  }
  function pageHead(first){
    topBar();
    if(first){
      avatar(M,30,62);
      col(BLUE);doc.setFont('helvetica','bold');doc.setFontSize(19);doc.text(D.school,M+78,56);
      col(MUTE);doc.setFontSize(10.5);doc.text(D.org,M+78,74);
      doc.setFont('helvetica','normal');doc.setFontSize(9);
      col(MUTE);doc.text('Ref. No.:',W-M-132,48,{align:'right'});col(INK);doc.setFont('helvetica','bold');doc.text(ref,W-M,48,{align:'right'});
      col(MUTE);doc.setFont('helvetica','normal');doc.text('Date issued:',W-M-60,62,{align:'right'});col(INK);doc.setFont('helvetica','bold');doc.text(dateStr,W-M,62,{align:'right'});
      stroke(BLUE);doc.setLineWidth(1.4);doc.line(M,104,W-M,104);
      y=104;
    }else{
      col(MUTE);doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.text(D.name+'  |  Curriculum Vitae',M,32);
      stroke(LINE);doc.setLineWidth(.6);doc.line(M,42,W-M,42);
      y=62;
    }
  }
  function ensure(h){if(y+h>BOT){doc.addPage();pageHead(false);}}
  function section(t){
    ensure(46);y+=18;
    fill(BLUE);doc.rect(M,y-9,3,12,'F');
    col(BLUE);doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text(t.toUpperCase().split('').join(String.fromCharCode(8202)),M+10,y);
    y+=6;stroke(LINE);doc.setLineWidth(.7);doc.line(M,y,W-M,y);y+=15;
  }
  function paragraph(t,size=10,lh=14.5){
    doc.setFont('helvetica','normal');doc.setFontSize(size);col(INK);
    const lines=doc.splitTextToSize(t,CW);
    lines.forEach(l=>{ensure(lh);doc.text(l,M,y);y+=lh;});
  }
  function grid(pairs){
    const cw=CW/2;
    for(let i=0;i<pairs.length;i+=2){
      ensure(36);
      [pairs[i],pairs[i+1]].forEach((p,k)=>{
        if(!p)return;let v=typeof p[1]==='function'?p[1]():p[1];const x=M+k*cw;
        col(MUTE);doc.setFont('helvetica','bold');doc.setFontSize(7.5);doc.text(p[0].toUpperCase(),x,y);
        col(INK);doc.setFont('helvetica','normal');doc.setFontSize(10.5);
        const t=doc.splitTextToSize(String(v),cw-14)[0];doc.text(t,x,y+14);
        stroke(LINE);doc.setLineDashPattern([1.5,2],0);doc.setLineWidth(.6);doc.line(x,y+20,x+cw-14,y+20);doc.setLineDashPattern([],0);
      });
      y+=34;
    }
  }
  function entries(list){
    list.forEach(e=>{
      ensure(40);
      col(INK);doc.setFont('helvetica','bold');doc.setFontSize(10.5);doc.text(e[0],M,y);
      col(BLUE);doc.setFontSize(9);doc.text(e[2],W-M,y,{align:'right'});
      y+=13.5;col(MUTE);doc.setFont('helvetica','normal');doc.setFontSize(9.5);
      doc.splitTextToSize(e[1],CW-90).forEach(l=>{ensure(13);doc.text(l,M,y);y+=13;});
      y+=7;
    });
  }
  function bullets(list){
    list.forEach(t=>{
      doc.setFont('helvetica','normal');doc.setFontSize(10);
      const lines=doc.splitTextToSize(t,CW-16);ensure(lines.length*14+4);
      fill(GOLD);doc.circle(M+3,y-3,1.6,'F');col(INK);
      lines.forEach(l=>{doc.text(l,M+14,y);y+=14;});y+=2.5;
    });
  }
  function kv(list){
    list.forEach(p=>{
      ensure(18);col(NAVY);doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.text(p[0],M,y);
      col(INK);doc.setFont('helvetica','normal');doc.text(doc.splitTextToSize(p[1],CW-90)[0],M+85,y);y+=17;
    });
  }

  /* ── page 1 ── */
  pageHead(true);
  col(NAVY);doc.setFont('helvetica','bold');doc.setFontSize(21);doc.text('CURRICULUM VITAE',W/2,142,{align:'center'});
  fill(GOLD);doc.rect(W/2-22,150,44,2.5,'F');
  col(MUTE);doc.setFont('helvetica','normal');doc.setFontSize(10);doc.text('Official Professional Profile',W/2,170,{align:'center'});

  /* profile card */
  fill(CARD);doc.roundedRect(M,186,CW,92,7,7,'F');fill(BLUE);doc.roundedRect(M,186,4,92,2,2,'F');
  avatar(M+22,200,64);
  col(INK);doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text(D.name,M+104,222);
  col(MUTE);doc.setFont('helvetica','normal');doc.setFontSize(10.5);doc.text(D.title,M+104,240);
  fill([225,244,235]);doc.roundedRect(M+104,250,58,17,8.5,8.5,'F');
  fill([20,160,100]);doc.circle(M+115,258.5,2.6,'F');col([16,130,82]);doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.text('Active',M+122,261.5);
  y=278;

  section('Contact Information');grid(D.contact);
  section('Professional Summary');paragraph(D.summary);
  section('Education');entries(D.education);
  section('Experience');entries(D.experience);
  section('Anesthesia Expertise');bullets(D.anesthesia);
  section('Software Skills');kv(D.skills);
  section('Languages');kv(D.languages);

  /* signature */
  ensure(78);y+=26;
  stroke(INK);doc.setLineWidth(.7);
  doc.line(M,y,M+190,y);doc.line(W-M-190,y,W-M,y);
  col(INK);doc.setFont('helvetica','bold');doc.setFontSize(9.5);
  doc.text('Signature of the Holder',M+95,y+14,{align:'center'});
  doc.text('Department Head / Registrar',W-M-95,y+14,{align:'center'});
  col(MUTE);doc.setFont('helvetica','normal');doc.setFontSize(8.5);
  doc.text('Date: ____ / ____ / ________',M+95,y+27,{align:'center'});
  doc.text('Official stamp & date',W-M-95,y+27,{align:'center'});

  /* watermark + footer on every page */
  const n=doc.getNumberOfPages();
  for(let i=1;i<=n;i++){
    doc.setPage(i);
    doc.saveGraphicsState();doc.setGState(new doc.GState({opacity:0.055}));
    col(BLUE);doc.setFont('helvetica','bold');doc.setFontSize(54);
    doc.text(D.name,W/2,H/2+40,{align:'center',angle:38});
    doc.restoreGraphicsState();
    stroke(LINE);doc.setLineWidth(.7);doc.line(M,H-52,W-M,H-52);
    col(MUTE);doc.setFont('helvetica','normal');doc.setFontSize(8);
    doc.text('Portfolio  |  '+D.org,M,H-38);
    doc.text('Ref. No. '+ref,W/2,H-38,{align:'center'});
    doc.text('Page '+i+' of '+n,W-M,H-38,{align:'right'});
    col([205,70,70]);doc.text('CONFIDENTIAL - FOR OFFICIAL USE ONLY',W/2,H-26,{align:'center'});
  }
  doc.setProperties({title:'Curriculum Vitae - '+D.name,author:D.name,subject:'Curriculum Vitae',keywords:'CV, anesthesia, software'});
  return doc;
}
