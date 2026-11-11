(()=>{
'use strict';
const art=[{"src": "images/creative/parkour.jpg", "title": "Parkour", "alt": "Black human figures in running, climbing, and jumping poses around a stepped white structure.", "year": "", "medium": "", "description": "I won an award for this sculpture. I arranged black figures in running, climbing, and jumping poses around a white structure."}, {"src": "images/creative/standing-figure-relief.jpg", "title": "Standing Figure Relief", "alt": "A standing person in draped clothing, sculpted in relief on a tall rectangular panel.", "year": "", "medium": "Relief Sculpture", "description": "I made this relief for my application to the art academy in Italy. I shaped the folds around a standing figure."}, {"src": "images/creative/all-spark.jpg", "title": "All Spark", "alt": "A cube sculpture with circular carved patterns and warm brown and gold surfaces.", "year": "", "medium": "", "description": "I made this cube sculpture of the All Spark. I worked patterns into each face."}, {"src": "images/creative/toyota-supra.jpg", "title": "Toyota Supra", "alt": "A red Toyota Supra 3D model viewed from the front and side, with detailed wheels, windows, and rear wing.", "year": "2006", "medium": "3D Model and Render", "description": "I modeled and rendered this Toyota Supra at Clover Park. I worked on the body, windows, wheels, and rear wing."}, {"src": "images/creative/sig-sauer-p220.jpg", "title": "SIG-Sauer P220", "alt": "Two views of a purple-gray 3D pistol model, one with the magazine extended below the grip.", "year": "2006", "medium": "3D Model and Render", "description": "I modeled this SIG-Sauer P220 at Clover Park. I rendered two views of the model."}, {"src": "images/creative/abydos-frost-portal.jpg", "title": "Abydos Frost Portal", "alt": "A circular science-fiction portal on a round stone base, with part of the ring shown as a wireframe.", "year": "2006", "medium": "3D Model and Render", "description": "I made this portal model for Abydos Frost. I paired the finished surface with a wireframe view."}, {"src": "images/creative/color-and-composition.jpg", "title": "Color and Composition", "alt": "A gray sphere at the center of a painting, surrounded by bright red, orange, blue, and white forms against dark space.", "year": "", "medium": "Paint", "description": "I used warm and cool colors around a gray sphere in this painting."}, {"src": "images/creative/painting-study-2.jpg", "title": "Painting Study 2", "alt": "Pink and orange domed buildings beside blue-green water and trees, beneath a pale sky.", "year": "", "medium": "Paint", "description": "I painted domed buildings beside the water. I used soft colors for the sky, trees, and reflections."}, {"src": "images/creative/rooftops.jpg", "title": "Rooftops", "alt": "A painting of steep rooftops, chimneys, and round windows in yellow, orange, and purple against a blue sky.", "year": "", "medium": "Paint", "description": "I painted these rooftops for Art 21 at Sacramento State. I used warm yellow and orange against a blue sky."}, {"src": "images/creative/architectural-studies.jpg", "title": "Architectural Studies", "alt": "A wall display of charcoal architectural drawings, with buildings and interiors studied from several viewpoints.", "year": "", "medium": "Charcoal", "description": "I practiced line, shadow, and perspective in these charcoal drawings for Art 120."}, {"src": "images/creative/church-study.jpg", "title": "Church Study", "alt": "A detailed church facade in three-quarter view, with arches, columns, a circular window, and a triangular pediment.", "year": "", "medium": "", "description": "I drew churches while I studied in Italy. I practiced the arches, columns, and patterns across each building."}, {"src": "images/creative/journal-architecture.jpg", "title": "Journal Architecture", "alt": "A journal sketch of a hilltop temple with columns, nearby ruins, and rough lines describing the surrounding ground.", "year": "", "medium": "", "description": "I sketched buildings and ruins in my journal. I used quick lines to work through the shapes and space."}];
const dialog=document.getElementById('art-viewer');
let opener;
document.querySelectorAll('[data-art]').forEach(card=>card.addEventListener('click',event=>{
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 if(!dialog.showModal)return;
 event.preventDefault();opener=card;const item=art[Number(card.dataset.art)];
 const img=document.getElementById('art-large');img.src=item.src;img.alt=item.alt;
 document.getElementById('art-title').textContent=item.title;
 document.getElementById('art-meta').textContent=[item.year,item.medium].filter(Boolean).join(' · ');
 document.getElementById('art-description').textContent=item.description;
 dialog.showModal();document.getElementById('art-close').focus();
}));
document.getElementById('art-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>opener?.focus());
})();


// A configured HTTPS relay writes statements to the LRS with server-side credentials.
(() => {
  const form = document.getElementById('visitor-greeting');
  if (!form) return;

  const field = document.getElementById('visitor-name');
  const message = document.getElementById('visitor-response');
  const button = form.querySelector('button');
  const origin = 'https://rlethcoe.com';
  const endpoint = form.dataset.xapiEndpoint;
  const recording = location.origin === origin && endpoint.startsWith('https://');
  let visitorId;

  if (recording) {
    const key = 'portfolio-visitor-id';
    visitorId = crypto.randomUUID();
    try {
      const savedId = localStorage.getItem(key);
      if (savedId) visitorId = savedId;
      else localStorage.setItem(key, visitorId);
    } catch {
      // When storage is unavailable, use the identifier for this visit only.
    }
  }

  async function record(verb, name) {
    const actor = { objectType: 'Agent', account: { homePage: origin, name: visitorId } };
    if (name) actor.name = name;
    const statement = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      actor,
      verb: { id: origin + '/xapi/verbs/' + verb, display: { 'en-US': verb } },
      object: {
        objectType: 'Activity',
        id: origin + '/',
        definition: { name: { 'en-US': 'Learning design portfolio' } },
      },
    };
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statement),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      keepalive: true,
    });
    if (!response.ok) throw new Error('The visitor log could not save this statement.');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    const name = field.value.trim().slice(0, 40);
    const welcome = 'Thanks for visiting my portfolio. Open any section below to see work from my time in higher education as a student, teacher, and instructional designer.';
    message.textContent = name ? 'Hey, ' + name + '! ' + welcome : welcome;
    if (!recording || !name) return;
    button.disabled = true;
    try {
      await record('greeted', name);
    } catch {
      message.textContent += ' The visitor log is unavailable right now.';
    } finally {
      button.disabled = false;
    }
  });

  form.hidden = false;
  if (recording) {
    document.getElementById('visitor-notice').hidden = false;
    record('visited').catch(() => {});
  }
})();
