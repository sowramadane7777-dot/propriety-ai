'use client';

import { useState } from 'react';

export default function Home() {
const [loyer, setLoyer] = useState<number>(1500);
const [ratio, setRatio] = useState<number>(3);
const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
const [analysisResult, setAnalysisResult] = useState<{
revenuBrut: number;
nomCandidat: string;
estSolvable: boolean;
} | null>(null);

const revenuExige = loyer * ratio;

const handleAnalyse = () => {
setIsAnalyzing(true);
setAnalysisResult(null);

setTimeout(() => {
setIsAnalyzing(false);
setAnalysisResult({
revenuBrut: 5200,
nomCandidat: 'Mamadou Sow',
estSolvable: 5200 >= revenuExige,
});
}, 1500);
};

return (
<main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">

<div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

<div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
<div>
<h1 className="text-2xl font-bold text-white flex items-center gap-2">
<span>🏢</span> ProprietyAI
</h1>
<p className="text-xs text-slate-400 mt-1">Plateforme intelligente d'aide à la décision locative</p>
</div>
<span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full">
B2B Québec
</span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="flex flex-col gap-6">

<div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl">
<h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
<span>📊</span> Paramètres du Bail
</h2>

<div className="mb-4">
<label className="block text-xs text-slate-400 mb-1">Loyer mensuel ($)</label>
<input
type="number"
value={loyer}
onChange={(e) => setLoyer(Number(e.target.value))}
className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold text-sm focus:outline-none focus:border-blue-500"
/>
</div>

<div className="mb-4">
<div className="flex justify-between text-xs text-slate-400 mb-1">
<span>Ratio de solvabilité</span>
<span className="text-blue-400 font-bold">{ratio}x le loyer</span>
</div>
<input
type="range"
min="1"
max="4"
step="0.5"
value={ratio}
onChange={(e) => setRatio(Number(e.target.value))}
className="w-full accent-blue-500 cursor-pointer"
/>
</div>

<div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex justify-between items-center text-xs">
<span className="text-slate-400">Revenu brut exigé :</span>
<span className="font-bold text-blue-400 text-sm">{revenuExige.toLocaleString('fr-CA')} $ / mois</span>
</div>
</div>

<div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl">
<h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
<span>📁</span> Dossier Candidat
</h2>

<div className="border border-dashed border-slate-700 rounded-xl p-4 text-center bg-slate-900/50 mb-4">
<p className="text-xs font-medium text-slate-300">fiche_paie_test.pdf</p>
<p className="text-[10px] text-slate-500 mt-0.5">PDF, PNG ou JPG supportés</p>
</div>

<button
onClick={handleAnalyse}
disabled={isAnalyzing}
className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs transition shadow-lg shadow-blue-600/20 disabled:opacity-50 cursor-pointer"
>
{isAnalyzing ? "Analyse par Gemini..." : "Lancer l'analyse experte ➔"}
</button>
</div>

</div>

<div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<h2 className="text-sm font-semibold text-slate-300">Rapport Financier</h2>
<span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
Gemini AI
</span>
</div>

{!analysisResult && !isAnalyzing && (
<div className="border border-slate-800 bg-slate-900/30 rounded-xl p-8 text-center my-6">
<p className="text-xs text-slate-400">Cliquez sur "Lancer l'analyse experte" pour évaluer la fiche de paie.</p>
</div>
)}

{isAnalyzing && (
<div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-8 text-center my-6">
<p className="text-xs text-blue-400 font-medium animate-pulse">Extraction des données financières...</p>
</div>
)}

{analysisResult && !isAnalyzing && (
<div className="space-y-3 mt-2">
<div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
<p className="text-[10px] text-slate-400 uppercase font-semibold">Candidat</p>
<p className="text-sm font-bold text-white">{analysisResult.nomCandidat}</p>
</div>

<div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
<p className="text-[10px] text-slate-400 uppercase font-semibold">Revenu mensuel brut</p>
<p className="text-sm font-bold text-white">{analysisResult.revenuBrut.toLocaleString('fr-CA')} $ / mois</p>
</div>

<div className={`p-3 rounded-xl border text-xs ${analysisResult.estSolvable ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
<p className="font-bold">
{analysisResult.estSolvable ? '✅ Dossier Recommandé (Solvable)' : '❌ Dossier Non Conforme'}
</p>
<p className="text-[11px] opacity-90 mt-1">
{analysisResult.estSolvable
? `Dépasse le seuil requis (${revenuExige.toLocaleString('fr-CA')} $).`
: `Inférieur au seuil requis (${revenuExige.toLocaleString('fr-CA')} $).`}
</p>
</div>
</div>
)}
</div>

<div className="mt-4 pt-3 border-t border-slate-900 text-center">
<p className="text-[10px] text-slate-500">ProprietyAI — Propulsé par Gemini AI</p>
</div>
</div>

</div>

</div>
</main>
);
}
