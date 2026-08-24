'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
const [loyer, setLoyer] = useState<number>(1500);
const [ratio, setRatio] = useState<number>(3);
const [fileName, setFileName] = useState<string | null>('fiche_paie_test.pdf');
const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
const [analysisResult, setAnalysisResult] = useState<{
revenuBrut: number;
nomCandidat: string;
estSolvable: boolean;
} | null>(null);

const revenuExige = loyer * ratio;

const handleAnalyse = () => {
if (!fileName) return;

setIsAnalyzing(true);
setAnalysisResult(null);

setTimeout(() => {
setIsAnalyzing(false);
setAnalysisResult({
revenuBrut: 5200,
nomCandidat: 'Mamadou Sow',
estSolvable: 5200 >= revenuExige,
});
}, 2000);
};

return (
<main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 md:p-12">

{/* Header */}
<div className="w-full max-w-5xl bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between mb-8 backdrop-blur-md">
<div className="flex items-center gap-4 mb-4 md:mb-0">
<div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl">
<span className="text-2xl">🏢</span>
</div>
<div>
<h1 className="text-2xl font-bold tracking-tight text-white">ProprietyAI</h1>
<p className="text-xs text-slate-400">Plateforme intelligente d'aide à la décision locative</p>
</div>
</div>
<span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full">
B2B Québec
</span>
</div>

{/* Grille Principale */}
<div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

{/* Colonne Gauche : Paramètres & Dossier */}
<div className="flex flex-col gap-6">

{/* Paramètres du Bail */}
<div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-md">
<div className="flex items-center gap-2 mb-4">
<span className="text-lg">📊</span>
<h2 className="text-lg font-semibold text-white">Paramètres du Bail</h2>
</div>

<div className="mb-4">
<label className="block text-xs font-medium text-slate-400 mb-1.5">
Montant du loyer mensuel ($)
</label>
<input
type="number"
value={loyer}
onChange={(e) => setLoyer(Number(e.target.value))}
className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-blue-500 transition"
/>
</div>

<div className="mb-4">
<div className="flex justify-between items-center mb-1.5">
<label className="text-xs font-medium text-slate-400">
Ratio de solvabilité minimum
</label>
<span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
{ratio}x le loyer
</span>
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

<div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
<span className="text-xs text-slate-400 font-medium">Revenu brut exigé :</span>
<span className="text-base font-bold text-blue-400">
{revenuExige.toLocaleString('fr-CA')} $ / mois
</span>
</div>
</div>

{/* Dossier Candidat */}
<div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-md">
<div className="flex items-center gap-2 mb-4">
<span className="text-lg">📁</span>
<h2 className="text-lg font-semibold text-white">Dossier Candidat</h2>
</div>

<div className="border border-dashed border-slate-700 hover:border-blue-500 transition rounded-xl p-5 text-center bg-slate-950/50 mb-4 cursor-pointer">
<p className="text-sm font-medium text-slate-200">{fileName || "Glissez la fiche de paie ici"}</p>
<p className="text-xs text-slate-500 mt-1">PDF, PNG ou JPG pris en charge</p>
</div>

<button
onClick={handleAnalyse}
disabled={isAnalyzing}
className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
>
{isAnalyzing ? "Analyse en cours..." : "Lancer l'analyse experte ➔"}
</button>
</div>

</div>

{/* Colonne Droite : Rapport d'Évaluation Financière */}
<div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between min-h-[420px]">
<div>
<div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold text-white">Rapport Financier</h2>
<span className="text-[11px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
Gemini AI
</span>
</div>

{!analysisResult && !isAnalyzing && (
<div className="border border-slate-800 bg-slate-950/50 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 my-12">
<span className="text-2xl">📄</span>
<p className="text-sm font-medium text-slate-300">En attente de document</p>
<p className="text-xs text-slate-500">Téléversez un fichier et lancez l'analyse.</p>
</div>
)}

{isAnalyzing && (
<div className="border border-blue-500/20 bg-blue-500/5 rounded-xl p-8 text-center my-12">
<p className="text-sm text-blue-400 font-medium animate-pulse">Extraction automatique en cours...</p>
</div>
)}

{analysisResult && !isAnalyzing && (
<div className="space-y-4">
<div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
<p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Candidat</p>
<p className="text-base font-bold text-white mt-0.5">{analysisResult.nomCandidat}</p>
</div>

<div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
<p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Revenu mensuel brut</p>
<p className="text-base font-bold text-white mt-0.5">{analysisResult.revenuBrut.toLocaleString('fr-CA')} $ / mois</p>
</div>

<div className={`p-4 rounded-xl border ${analysisResult.estSolvable ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'}`}>
<p className="font-bold text-sm">
{analysisResult.estSolvable ? '✅ Dossier Recommandé (Solvable)' : '❌ Dossier Non Conforme (Risque)'}
</p>
<p className="text-xs opacity-90 mt-1">
{analysisResult.estSolvable
? `Le revenu dépasse le seuil exigé de ${revenuExige.toLocaleString('fr-CA')} $.`
: `Le revenu est inférieur au seuil exigé de ${revenuExige.toLocaleString('fr-CA')} $.`}
</p>
</div>
</div>
)}
</div>

<div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
<p className="text-[11px] text-slate-500">
ProprietyAI — Propulsé par Gemini AI
</p>
</div>
</div>

</div>
</main>
);
}