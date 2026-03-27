<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Omniscient</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0c12; color: #e2e5f0; font-family: system-ui, sans-serif; min-height: 100vh; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
.fadein { animation: fadeIn 0.35s ease; }
.wrap { max-width: 820px; margin: 0 auto; padding: 36px 20px 80px; }
.logo { display: flex; align-items: center; gap: 9px; font-weight: 800; font-size: 19px; margin-bottom: 44px; }
.dot { width: 9px; height: 9px; border-radius: 50%; background: #5b7cfa; box-shadow: 0 0 14px #5b7cfa; }
.card { background: #111420; border: 1px solid #1f2537; border-radius: 14px; padding: 20px; margin-bottom: 20px; }
label { display: block; font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
input, select, textarea { width: 100%; background: #181c2a; border: 1px solid #1f2537; border-radius: 9px; padding: 10px 13px; color: #e2e5f0; font-size: 13px; font-family: inherit; }
input:focus, select:focus, textarea:focus { outline: none; border-color: #5b7cfa; }
textarea { min-height: 160px; resize: vertical; line-height: 1.6; }
.row { display: grid; grid-template-columns: 1fr auto; gap: 8px; }
.btn-blue { padding: 10px 18px; background: #5b7cfa; border: none; border-radius: 9px; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn-main { width: 100%; padding: 15px; background: linear-gradient(135deg, #5b7cfa, #8b5cf6); border: none; border-radius: 11px; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer; margin-top: 4px; }
.btn-main:disabled { opacity: 0.4; cursor: not-allowed; }
.tabs { display: flex; gap: 3px; background: #111420; border: 1px solid #1f2537; border-radius: 10px; padding: 3px; width: fit-content; margin-bottom: 16px; }
.tab { padding: 7px 16px; border-radius: 8px; border: none; background: none; color: #6b7280; font-size: 13px; cursor: pointer; border-bottom: 2px solid transparent; }
.tab.active { background: #181c2a; color: #e2e5f0; border-bottom-color: #5b7cfa; }
.drop { border: 1.5px dashed #1f2537; border-radius: 14px; padding: 38px 24px; text-align: center; cursor: pointer; background: #111420; margin-bottom: 14px; }
.drop:hover { border-color: #5b7cfa; background: rgba(91,124,250,0.05); }
.tags { display: flex; gap: 5px; justify-content: center; margin-top: 10px; }
.tag { padding: 2px 9px; border-radius: 20px; border: 1px solid #1f2537; color: #6b7280; font-size: 11px; }
.file-ok { display: flex; align-items: center; gap: 9px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 9px; padding: 11px 15px; margin-bottom: 14px; font-size: 13px; }
.opts { display: grid; grid-template-columns: 1fr 1fr; gap: 13px; margin-bottom: 16px; }
select { appearance: none; }
.error { background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); border-radius: 9px; padding: 11px 15px; color: #ef4444; font-size: 13px; margin-top: 12px; }
.loading { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 52px 0; }
.spinner { width: 36px; height: 36px; border: 2px solid #1f2537; border-top-color: #5b7cfa; border-radius: 50%; animation: spin 0.8s linear infinite; }
.steps { display: flex; flex-direction: column; gap: 8px; }
.step { font-size: 13px; color: #6b7280; transition: color 0.4s; }
.step.done { color: #10b981; }
.key-saved { display: flex; justify-content: space-between; align-items: center; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 9px; padding: 11px 15px; margin-bottom: 20px; font-size: 13px; color: #10b981; }
h1 { font-size: clamp(28px, 5vw, 46px); font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 10px; }
.accent { background: linear-gradient(135deg, #5b7cfa, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.desc { color: #6b7280; font-size: 14px; line-height: 1.65; max-width: 420px; margin-bottom: 28px; }
.partie-btn { text-align: left; padding: 18px 20px; background: #111420; border: 1px solid #1f2537; border-radius: 13px; color: #e2e5f0; cursor: pointer; transition: all 0.2s; width: 100%; margin-bottom: 10px; }
.partie-btn:hover { border-color: #5b7cfa; background: rgba(91,124,250,0.08); }
.partie-btn .name { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
.partie-btn .desc2 { color: #6b7280; font-size: 13px; }
.mod-card { background: #111420; border: 1px solid #1f2537; border-radius: 14px; margin-bottom: 16px; overflow: hidden; }
.mod-card.accepted { border-color: #10b981; }
.mod-card.rejected { border-color: #ef4444; opacity: 0.6; }
.mod-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #1f2537; flex-wrap: wrap; gap: 8px; }
.mod-name { font-weight: 700; font-size: 15px; }
.risk-pill { padding: 3px 10px; border-radius: 20px; font-size: 11px; white-space: nowrap; }
.mod-body { padding: 20px; }
.mod-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600; }
.mod-original { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); border-radius: 9px; padding: 14px; font-size: 13px; line-height: 1.65; margin-bottom: 12px; }
.mod-proposed { background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.2); border-radius: 9px; padding: 14px; font-size: 13px; line-height: 1.65; margin-bottom: 16px; }
.mod-reason { color: #6b7280; font-size: 12px; line-height: 1.6; margin-bottom: 16px; }
.mod-actions { display: flex; gap: 10px; }
.btn-accept { flex: 1; padding: 10px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.4); border-radius: 9px; color: #10b981; font-size: 13px; font-weight: 700; cursor: pointer; }
.btn-accept.active { background: #10b981; color: #fff; }
.btn-reject { flex: 1; padding: 10px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 9px; color: #ef4444; font-size: 13px; font-weight: 700; cursor: pointer; }
.btn-reject.active { background: #ef4444; color: #fff; }
.mod-status { text-align: center; padding: 8px; font-size: 12px; font-weight: 600; margin-top: 10px; }
.review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; padding-bottom: 18px; border-bottom: 1px solid #1f2537; flex-wrap: wrap; gap: 12px; }
.review-stats { display: flex; gap: 10px; flex-wrap: wrap; }
.stat { padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 12px; }
.stat-pending { background: rgba(91,124,250,0.15); color: #5b7cfa; }
.stat-accepted { background: rgba(16,185,129,0.15); color: #10b981; }
.stat-rejected { background: rgba(239,68,68,0.15); color: #ef4444; }
.export-section { background: #111420; border: 1px solid #1f2537; border-radius: 14px; padding: 24px; margin-top: 28px; text-align: center; }
.btn-export { display: inline-block; padding: 13px 28px; background: linear-gradient(135deg, #5b7cfa, #8b5cf6); border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; }
.btn-new { display: block; margin: 12px auto 0; padding: 10px 22px; background: none; border: 1px solid #1f2537; border-radius: 9px; color: #6b7280; font-size: 13px; cursor: pointer; }
@media (max-width: 580px) { .opts { grid-template-columns: 1fr; } .mod-actions { flex-direction: column; } }
</style>
</head>
<body>
<div class="wrap">
  <div class="logo"><div class="dot"></div>Omniscient</div>

  <!-- STEP 2: Upload form -->
  <div id="step-form">
    <h1 class="fadein">RÃÂÃÂ©visez vos contrats<br/><span class="accent">avec l'IA.</span></h1>
    <p class="desc">Uploadez votre contrat. L'IA identifie les parties, vous choisissez laquelle protÃÂÃÂ©ger, puis propose des modifications avec Track Changes.</p>

    <div class="tabs">
      <button class="tab active" id="tab-upload">ÃÂ°ÃÂÃÂÃÂ Uploader</button>
      <button class="tab" id="tab-text">ÃÂ¢ÃÂÃÂÃÂ¯ÃÂ¸ÃÂ Coller du texte</button>
    </div>

    <div id="upload-zone">
      <label class="drop" id="drop-area" for="file-input" style="cursor:pointer;display:block">
        <div style="font-size:30px;margin-bottom:10px">ÃÂ°ÃÂÃÂÃÂ</div>
        <div style="font-weight:700;font-size:15px;margin-bottom:5px">DÃÂÃÂ©posez votre contrat ici</div>
        <div style="color:#6b7280;font-size:13px">ou cliquez pour sÃÂÃÂ©lectionner</div>
        <div class="tags"><span class="tag">PDF</span><span class="tag">DOCX</span><span class="tag">TXT</span></div>
      </label>
      <input type="file" id="file-input" accept=".pdf,.docx,.txt,.doc" style="display:none"/>
      <div id="file-ok" style="display:none" class="file-ok">
        <span>ÃÂ¢ÃÂÃÂ</span>
        <span id="file-name" style="color:#10b981;font-size:13px"></span>
        <span id="file-size" style="color:#6b7280;font-size:11px;margin-left:auto"></span>
      </div>
    </div>

    <div id="text-zone" style="display:none">
      <textarea id="contract-text" placeholder="Collez le texte de votre contrat iciÃÂ¢ÃÂÃÂ¦" style="margin-bottom:14px"></textarea>
    </div>

    <div class="opts">
      <div>
        <label>Type</label>
        <select id="type">
          <option value="generic">GÃÂÃÂ©nÃÂÃÂ©rique</option>
          <option value="nda">NDA</option>
          <option value="saas">SaaS</option>
          <option value="purchase">Achat/Vente</option>
          <option value="employment">RH</option>
          <option value="partnership">Partenariat</option>
        </select>
      </div>
    </div>

    <button class="btn-main" id="btn-analyze">ÃÂ¢ÃÂÃÂ¡ Analyser le contrat</button>
    <div id="usage-counter" style="text-align:center;font-size:12px;color:#6b7280;margin-top:10px"></div>
    <div id="access-code-section" style="display:none;margin-top:16px;background:rgba(91,124,250,0.06);border:1px solid rgba(91,124,250,0.2);border-radius:10px;padding:16px">
      <div style="font-size:13px;font-weight:600;color:#e2e5f0;margin-bottom:12px">ÃÂ°ÃÂÃÂÃÂ Limite de 3 analyses atteinte</div>
      <a href="https://westfieldavocats.com/produit/abonnement-omniscient/" target="_blank" style="display:block;text-align:center;padding:12px;background:linear-gradient(135deg,#5b7cfa,#8b5cf6);border-radius:8px;color:#fff;font-size:14px;font-weight:700;text-decoration:none;margin-bottom:14px">
        ÃÂ°ÃÂÃÂÃÂ³ Souscrire ÃÂÃÂ  l'accÃÂÃÂ¨s illimitÃÂÃÂ© ÃÂ¢ÃÂÃÂ
      </a>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <div style="flex:1;height:1px;background:#1f2537"></div>
        <div style="font-size:11px;color:#6b7280">ou entrez votre code d'accÃÂÃÂ¨s</div>
        <div style="flex:1;height:1px;background:#1f2537"></div>
      </div>
      <div style="display:flex;gap:8px">
        <input type="text" id="access-code-input" placeholder="Code WF-XXXXX..." style="flex:1;background:#181c2a;border:1px solid #1f2537;border-radius:8px;padding:9px 12px;color:#e2e5f0;font-size:13px"/>
        <button onclick="applyAccessCode()" style="padding:9px 18px;background:#5b7cfa;border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:600;cursor:pointer">Activer</button>
      </div>
      <div id="access-code-error" style="display:none;color:#ef4444;font-size:12px;margin-top:6px"></div>
      <div style="margin-top:12px;font-size:11px;color:#6b7280;text-align:center">
        ÃÂ°ÃÂÃÂÃÂ§ <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0c6f6362786d6f784c7b697f786a656960686d7a636f6d787f226f6361">[email&#160;protected]</a> ÃÂÃÂ· ÃÂ°ÃÂÃÂÃÂ +212 6 34 39 44 90
      </div>
    </div>
    <div id="form-error" style="display:none" class="error"></div>
  </div>

  <!-- STEP 3: Loading -->
  <div id="step-loading" style="display:none" class="loading">
    <div class="spinner"></div>
    <div class="steps">
      <div class="step" id="s0">ÃÂ¢ÃÂÃÂ Lecture du documentÃÂ¢ÃÂÃÂ¦</div>
      <div class="step" id="s1">ÃÂ¢ÃÂÃÂ Identification des partiesÃÂ¢ÃÂÃÂ¦</div>
      <div class="step" id="s2">ÃÂ¢ÃÂÃÂ Analyse des risquesÃÂ¢ÃÂÃÂ¦</div>
      <div class="step" id="s3">ÃÂ¢ÃÂÃÂ RÃÂÃÂ©daction des modificationsÃÂ¢ÃÂÃÂ¦</div>
    </div>
  </div>

  <!-- STEP 4: Choose partie -->
  <div id="step-parties" style="display:none" class="fadein">
    <h2 style="font-size:20px;font-weight:800;margin-bottom:8px">Quelle partie reprÃÂÃÂ©sentez-vous ?</h2>
    <p style="color:#6b7280;font-size:14px;margin-bottom:24px">L'IA adaptera ses modifications pour protÃÂÃÂ©ger vos intÃÂÃÂ©rÃÂÃÂªts.</p>
    <div id="parties-list"></div>
    <button id="btn-back" style="display:block;margin:16px auto 0;padding:9px 20px;background:none;border:1px solid #1f2537;border-radius:9px;color:#6b7280;font-size:13px;cursor:pointer">ÃÂ¢ÃÂÃÂ© Retour</button>
  </div>

  <!-- STEP 5: Review modifications -->
  <div id="step-review" style="display:none" class="fadein">
    <div class="review-header">
      <div style="font-size:20px;font-weight:800">RÃÂÃÂ©vision du contrat</div>
      <div class="review-stats" id="review-stats"></div>
    </div>
    <div id="mods-list"></div>
    <div class="export-section">
      <div style="font-size:16px;font-weight:700;margin-bottom:8px">GÃÂÃÂ©nÃÂÃÂ©rer le document final</div>
      <div id="export-desc" style="color:#6b7280;font-size:13px;margin-bottom:20px;line-height:1.6"></div>
      <button class="btn-export" id="btn-export">ÃÂ¢ÃÂ¬ÃÂ TÃÂÃÂ©lÃÂÃÂ©charger avec Track Changes</button>
      <button class="btn-new" id="btn-new">ÃÂ¢ÃÂÃÂ© Analyser un autre contrat</button>
    </div>
  </div>
</div>

<script>