'main'
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
}, 1000);
};

return (
<main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">
<div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

{/* En-tête simple et compact */}
<div className="border-b border-slate-800 pb-4 mb-6 flex items-center justify-between">
<div>
<h1 className="text-xl font-bold text-white flex items-center gap-2">
<span>🏢</span> ProprietyAI
</h1>
<p className="text-xs text-slate-400 mt-0.5">Plateforme d'aide à la décision locative</p>
</div>
<span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
B2B Québec
</span>
</div>

{/* Grille */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{/* Colonne de gauche */}
<div className="space-y-4">
<div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
<h2 className="text-sm font-semibold text-slate-300 mb-3">📊 Paramètres du Bail</h2>

<div className="mb-3">
<label className="block text-xs text-slate-400 mb-1">Loyer mensuel ($)</label>
<input
type="number"
value={loyer}
onChange={(e) => setLoyer(Number(e.target.value))}
className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
/>
</div>

<div className="mb-3">
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

<div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex justify-between items-center text-xs">
<span className="text-slate-400">Revenu exigé :</span>
<span className="font-bold text-blue-400">{revenuExige.toLocaleString('fr-CA')} $ / mois</span>
</div>
</div>

<div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
<h2 className="text-sm font-semibold text-slate-300 mb-2">📁 Dossier Candidat</h2>
<div className="border border-dashed border-slate-700 rounded-xl p-3 text-center bg-slate-900/50 mb-3">
<p className="text-xs text-slate-300 font-medium">fiche_paie_test.pdf</p>
</div>
<button
onClick={handleAnalyse}
disabled={isAnalyzing}
className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
>
{isAnalyzing ? "Analyse en cours..." : "Lancer l'analyse experte ➔"}
</button>
</div>
</div>

{/* Colonne de droite */}
<div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
<div>
<h2 className="text-sm font-semibold text-slate-300 mb-3">Rapport Financier</h2>

{!analysisResult && !isAnalyzing && (
<div className="border border-slate-800 bg-slate-900/30 rounded-xl p-6 text-center my-4">
<p className="text-xs text-slate-400">Cliquez sur le bouton pour lancer l'analyse.</p>
</div>
)}

{isAnalyzing && (
<div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 text-center my-4">
<p className="text-xs text-blue-400 animate-pulse">Extraction en cours...</p>
</div>
)}

{analysisResult && !isAnalyzing && (
<div className="space-y-3 mt-4">
<div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
<p className="text-[10px] text-slate-400 uppercase font-semibold">Candidat</p>
<p className="text-sm font-bold text-white">{analysisResult.nomCandidat}</p>
</div>
<div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
<p className="text-[10px] text-slate-400 uppercase font-semibold">Revenu brut</p>
<p className="text-sm font-bold text-white">{analysisResult.revenuBrut.toLocaleString('fr-CA')} $ / mois</p>
</div>
<div className={`p-3 rounded-xl border text-xs ${analysisResult.estSolvable ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
<p className="font-bold">
{analysisResult.estSolvable ? '✅ Dossier Recommandé' : '❌ Dossier Non Conforme'}
</p>
</div>
</div>
)}
</div>

<div className="mt-4 pt-2 border-t border-slate-900 text-center">
<p className="text-[10px] text-slate-500">ProprietyAI</p>
</div>
</div>

</div>
</div>
</main>
);
}