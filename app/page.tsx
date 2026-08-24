'use client';

import React, { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loyer, setLoyer] = useState<number>(1200);
  const [ratio, setRatio] = useState<number>(1.5);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('loyer', loyer.toString());
    formData.append('ratio', ratio.toString());

    try {
      const res = await fetch('/api/analyser', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'analyse");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const revenuExige = Math.round(loyer * ratio);

  return (
    <main className="min-h-screen bg-[#0d1527] text-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl bg-[#131c31] border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Solvimo
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">ANALYSE INTELLIGENTE DE SOLVABILITÉ</p>
          </div>
          <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1.5 rounded-full">
            B2B Québec
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Colonne Gauche : Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Paramètres du bail */}
              <div className="bg-[#1a2540] border border-slate-800 p-5 rounded-xl space-y-4">
                <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                  <span>📊</span> Paramètres du bail
                </h2>
                
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    LOYER MENSUEL ($)
                  </label>
                  <input
                    type="number"
                    value={loyer}
                    onChange={(e) => setLoyer(Number(e.target.value))}
                    className="w-full bg-[#111827] border border-slate-700 rounded-lg px-4 py-2.5 text-white font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-400 mb-1">
                    <span>RATIO DE SOLVABILITÉ</span>
                    <span className="text-blue-400">{ratio}x le loyer</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={ratio}
                    onChange={(e) => setRatio(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="bg-[#111827] border border-slate-800 p-3.5 rounded-lg flex justify-between items-center">
                  <span className="text-xs text-slate-400">Revenu brut exigé :</span>
                  <span className="text-lg font-bold text-blue-400">{revenuExige.toLocaleString()} $ / mois</span>
                </div>
              </div>

              {/* Dossier Candidat */}
              <div className="bg-[#1a2540] border border-slate-800 p-5 rounded-xl space-y-3">
                <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                  <span>📁</span> Dossier Candidat
                </h2>
                
                <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 transition rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-[#111827]/50 block">
                  <span className="text-sm font-medium text-slate-300 text-center">
                    {file ? `Fichier : ${file.name}` : "Déposer la fiche de paie ici"}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">PDF, PNG ou JPG supportés</span>
                  <input type="file" onChange={handleFileChange} accept=".pdf,image/*" className="hidden" />
                </label>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 transition text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Analyse experte en cours..." : "Lancer l'analyse experte ➔"}
            </button>
          </form>

          {/* Colonne Droite : Rapport Financier */}
          <div className="bg-[#1a2540] border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
                  Rapport Financier
                </h2>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              {!result && !loading && !error && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500">
                  <p className="text-sm">En attente d'un document candidat pour générer le rapport financier certifié.</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-sm">Extraction des données et calcul du ratio...</p>
                </div>
              )}

              {result && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">CANDIDAT</span>
                    <div className="bg-[#111827] border border-slate-800 px-4 py-3 rounded-lg text-white font-semibold">
                      {result.nomCandidat || "Non spécifié"}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block mb-1">REVENU MENSUEL EXTRAIT</span>
                    <div className="bg-[#111827] border border-slate-800 px-4 py-3 rounded-lg text-white font-semibold">
                      {result.revenuBrut ? `${result.revenuBrut.toLocaleString()} $ / mois` : "Non spécifié"}
                    </div>
                  </div>

                  <div className="bg-[#111827] border border-slate-800 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <span>{result.revenuBrut >= revenuExige ? "✅ Dossier Solvable" : "❌ Dossier Non Conforme"}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {result.conclusion}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center pt-6 border-t border-slate-800/60 mt-6">
              <p className="text-xs text-slate-500">Solvimo — Solution d'aide à la décision locative</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}