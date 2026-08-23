"use client";

import { useState } from "react";
import { Building2, UploadCloud, FileText, CheckCircle2, XCircle, Sliders, ArrowRight } from "lucide-react";

export default function Home() {
  const [loyer, setLoyer] = useState<number>(1500);
  const [ratio, setRatio] = useState<number>(3.0);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const revenuMin = loyer * ratio;

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("loyer", loyer.toString());
    formData.append("ratio", ratio.toString());

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      // On essaie de parser proprement le texte brut de l'IA si possible, ou on le stocke tel quel
      setResult(data.result);
    } catch (err) {
      setResult("Erreur de communication avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">ProprietyAI</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">B2B Québec</span>
            </div>
          </div>
          <div className="text-sm font-medium text-slate-500">Plateforme d'aide à la décision locative</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Sliders className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-slate-900 text-lg">Paramètres du Bail</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Montant du loyer mensuel ($)</label>
                  <input
                    type="number"
                    value={loyer}
                    onChange={(e) => setLoyer(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-700">Ratio de solvabilité minimum</label>
                    <span className="text-sm font-bold text-blue-600">{ratio}x le loyer</span>
                  </div>
                  <input
                    type="range"
                    min="2.0"
                    max="4.0"
                    step="0.5"
                    value={ratio}
                    onChange={(e) => setRatio(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Revenu brut exigé :</span>
                  <span className="font-bold text-blue-700">{revenuMin.toLocaleString()} $ / mois</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-slate-900 text-lg">Dossier Candidat</h2>
              </div>
              <label className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-slate-700 mb-1">{file ? file.name : "Glissez la fiche de paie ici"}</span>
                <span className="text-xs text-slate-400">PDF, PNG ou JPG</span>
                <input type="file" className="hidden" accept=".pdf, .png, .jpg, .jpeg" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
              </label>

              {file && (
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  {loading ? <span>Analyse par Gemini en cours...</span> : <><span>Lancer l'analyse experte</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm min-h-[600px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <h2 className="font-semibold text-slate-900 text-lg">Rapport d'Évaluation Financière</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">Propulsé par Gemini AI</span>
                </div>

                {!result ? (
                  <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-slate-800 font-semibold mb-1">En attente de document</h3>
                    <p className="text-sm text-slate-400 max-w-sm">Téléversez un fichier pour lancer l'extraction automatique des données financières.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center space-x-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-blue-900">Analyse terminée</h4>
                        <p className="text-xs text-blue-700">Voici les résultats extraits par l'intelligence artificielle :</p>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {result}
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-6 border-t border-slate-100 text-xs text-slate-400">⚖️ Outil d'analyse automatisée par vision intelligente.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}