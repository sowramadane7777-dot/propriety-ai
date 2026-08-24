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

// Fonction simulée d'analyse par l'IA (Vision / Gemini)
const handleAnalyse = () => {
if (!fileName) return;

setIsAnalyzing(true);
setAnalysisResult(null);

setTimeout(() => {
setIsAnalyzing(false);
// Exemple de résultat extrait de la fiche de paie
setAnalysisResult({
revenuBrut: 5200,
nomCandidat: 'Mamadou Sow',
estSolvable: 5200 >= revenuExige,
});
}, 2000); // Fait semblant de réfléchir pendant 2 secondes comme une vraie IA
};

return (
<main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 bg-slate-950 relative before:content-[''] before:absolute before:inset-0 before:opacity-10 before:z-0 before:bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">

{/* Header / Titre de l'application */}
<div className="z-10 w-full max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 mb-8">
<div className="flex items-center gap-3">
<div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 shadow-inner">
<Image src="/logo.png" alt="ProprietyAI" width={32} height={32} />
</div>
<div>
<h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">ProprietyAI</h1>
<p className="text-xs text-slate-500">Plateforme intelligente d'aide à la décision locative</p>
</div>
</div>
<div className="mt-4 md:mt-0">
<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
B2B Québec
</span>
</div>
</div>

{/* Contenu Principal (Grille de l'application) */}
<div className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

{/* --- Bloc 1 : Paramètres du Bail & Dossier Candidat --- */}
<div className="flex flex-col gap-8">

{/* Paramètres du Bail */}
<div className="p-8 rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-inset ring-black/5">
<div className="flex items-center gap-2 mb-6">
<span className="text-xl">📊</span>
<h2 className="text-xl font-bold text-slate-900">Paramètres du Bail</h2>
</div>

<div className="mb-6">
<label className="block text-sm font-medium text-slate-700 mb-2">
Montant du loyer mensuel ($)
</label>
<input
type="number"
value={loyer}
onChange={(e) => setLoyer(Number(e.target.value))}
className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
/>
</div>

<div className="mb-6">
<div className="flex justify-between items-center mb-2">
<label className="text-sm font-medium text-slate-700">
Ratio de solvabilité minimum
</label>
<span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
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
className="w-full accent-blue-600 cursor-pointer"
/>
</div>

<div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
<span className="text-sm font-medium text-slate-600">Revenu brut exigé :</span>
<span className="text-lg font-extrabold text-blue-600">
{revenuExige.toLocaleString('fr-CA')} $ / mois
</span>
</div>
</div>

{/* Dossier Candidat */}
<div className="p-8 rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-inset ring-black/5">
<div className="flex items-center gap-2 mb-6">
<span className="text-xl">📁</span>
<h2 className="text-xl font-bold text-slate-900">Dossier Candidat</h2>
</div>

<div className="border-2 border-dashed border-slate-300 hover:border-blue-500 transition rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 flex flex-col items-center justify-center gap-2 mb-6">
<div className="p-3 bg-blue-50 text-blue-600 rounded-full shadow-inner">
📄
</div>
<div>
<p className="text-sm font-semibold text-slate-800">{fileName || "Glissez la fiche de paie ici"}</p>
<p className="text-xs text-slate-400">PDF, PNG ou JPG supportés</p>
</div>
</div>

<button
onClick={handleAnalyse}
disabled={isAnalyzing}
className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
>
{isAnalyzing ? (
<>
<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
<span>Analyse en cours...</span>
</>
) : (
<span>Lancer l'analyse experte ➔</span>
)}
</button>
</div>

</div>

{/* --- Bloc 2 : Rapport d'Évaluation Financière --- */}
<div className="p-8 rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-lg ring-1 ring-inset ring-black/5 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-6">
<h2 className="text-xl font-bold text-slate-900">Rapport d'Évaluation Financière</h2>
<span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
Propulsé par Gemini AI
</span>
</div>

{!analysisResult && !isAnalyzing && (
<div className="border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 bg-slate-50/50 mt-12">
<div className="p-4 bg-slate-100 text-slate-400 rounded-full">
📄
</div>
<div>
<p className="text-sm font-semibold text-slate-700">En attente de document</p>
<p className="text-xs text-slate-400 mt-1">Téléversez un fichier et lancez l'analyse pour afficher les données financières.</p>
</div>
</div>
)}

{isAnalyzing && (
<div className="border border-blue-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 bg-blue-50/20 mt-12">
<div className="animate-pulse text-blue-600 text-3xl">✨</div>
<p className="text-sm font-medium text-blue-900">Extraction automatique des données par vision intelligente...</p>
</div>
)}

{analysisResult && !isAnalyzing && (
<div className="space-y-6 mt-4 animate-fadeIn">
<div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
<p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Candidat identifié</p>
<p className="text-lg font-bold text-slate-900 mt-1">{analysisResult.nomCandidat}</p>
</div>

<div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
<p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Revenu mensuel brut extrait</p>
<p className="text-lg font-bold text-slate-900 mt-1">{analysisResult.revenuBrut.toLocaleString('fr-CA')} $ / mois</p>
</div>

<div className={`p-5 rounded-2xl border ${analysisResult.estSolvable ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
<div className="flex items-center gap-3">
<span className="text-2xl">{analysisResult.estSolvable ? '✅' : '❌'}</span>
<div>
<p className="font-bold text-base">
{analysisResult.estSolvable ? 'Dossier Recommandé (Solvable)' : 'Dossier Non Conforme (Risque)'}
</p>
<p className="text-xs opacity-90 mt-0.5">
{analysisResult.estSolvable
? `Le revenu dépasse le seuil exigé de ${revenuExige.toLocaleString('fr-CA')} $.`
: `Le revenu est inférieur au seuil exigé de ${revenuExige.toLocaleString('fr-CA')} $.`}
</p>
</div>
</div>
</div>
</div>
)}
</div>

<div className="mt-8 pt-4 border-t border-slate-100 text-center">
<p className="text-xs text-slate-400">
Outil d'analyse automatisée par vision intelligente.
</p>
</div>
</div>

</div>

{/* Footer */}
<div className="z-10 text-slate-400 mt-12 text-xs font-medium">
ProprietyAI — Propulsé par Gemini AI
</div>

</main>
);
}